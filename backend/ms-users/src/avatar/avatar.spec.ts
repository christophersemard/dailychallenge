import { AvatarService } from "./avatar.service";
import prisma from "../prisma/prisma.service";
import { SupabaseService } from "../supabase/supabase.service";
import * as fs from "fs";
import * as sharp from "sharp";
import { RpcException } from "@nestjs/microservices";

jest.mock("../prisma/prisma.service", () => ({
    __esModule: true,
    default: {
        avatarAsset: {
            findMany: jest.fn(),
            findUnique: jest.fn(),
        },
        color: {
            findMany: jest.fn(),
            findUnique: jest.fn(),
        },
        user: {
            findUnique: jest.fn(),
        },
        avatar: {
            update: jest.fn(),
            create: jest.fn(),
        },
        vipSubscription: {
            findFirst: jest.fn(),
        },
    },
}));

jest.mock("fs");
jest.mock("sharp");

const sharpMock = {
    png: jest.fn().mockReturnThis(),
    resize: jest.fn().mockReturnThis(),
    composite: jest.fn().mockReturnThis(),
    ensureAlpha: jest.fn().mockReturnThis(),
    toBuffer: jest.fn().mockResolvedValue(Buffer.from("mocked")),
};

((sharp as unknown) as jest.Mock).mockImplementation(() => sharpMock);

describe("AvatarService", () => {
    let avatarService: AvatarService;
    const mockSupabase = {
        getClient: jest.fn().mockReturnValue({
            storage: {
                from: jest.fn().mockReturnThis(),
                upload: jest.fn().mockResolvedValue({ data: {}, error: null }),
            },
        }),
    };

    beforeEach(() => {
        avatarService = new AvatarService(mockSupabase as any);
        jest.clearAllMocks();
    });

    describe("getAvatarAssets", () => {
        it("should return sorted avatar assets", async () => {
            const assets = [
                { id: 1, type: "shape", vipOnly: false },
                { id: 2, type: "shape", vipOnly: true },
                { id: 3, type: "eyes", vipOnly: true },
                { id: 4, type: "eyes", vipOnly: false },
            ];
            const colors = [
                { id: 1, name: "blue", vip: false },
                { id: 2, name: "gold", vip: true },
            ];
            (prisma.avatarAsset.findMany as jest.Mock).mockResolvedValue(
                assets
            );
            (prisma.color.findMany as jest.Mock).mockResolvedValue(colors);

            const result = await avatarService.getAvatarAssets();
            expect(result.shapes[0].vipOnly).toBe(false);
            expect(result.shapes[1].vipOnly).toBe(true);
            expect(result.colors[0].vip).toBe(false);
            expect(result.colors[1].vip).toBe(true);
        });
    });

    describe("validateAvatarAccess", () => {
        it("should throw if asset level too high", async () => {
            (prisma.user.findUnique as jest.Mock).mockResolvedValue({
                userStats: { level: 1 },
            });
            (prisma.vipSubscription.findFirst as jest.Mock).mockResolvedValue(
                null
            );
            (prisma.avatarAsset.findMany as jest.Mock).mockResolvedValue([
                { id: 1, name: "ProShape", level: 5, vipOnly: false },
            ]);
            (prisma.color.findMany as jest.Mock).mockResolvedValue([]);

            await expect(
                avatarService["validateAvatarAccess"](1, {
                    shapeId: 1,
                    eyesId: 1,
                    mouthId: 1,
                    colorShapeId: 1,
                })
            ).rejects.toThrow(RpcException);
        });

        it("should throw if VIP asset and not VIP", async () => {
            (prisma.user.findUnique as jest.Mock).mockResolvedValue({
                userStats: { level: 99 },
            });
            (prisma.vipSubscription.findFirst as jest.Mock).mockResolvedValue(
                null
            );
            (prisma.avatarAsset.findMany as jest.Mock).mockResolvedValue([
                { id: 1, name: "VIPShape", level: 1, vipOnly: true },
            ]);
            (prisma.color.findMany as jest.Mock).mockResolvedValue([]);

            await expect(
                avatarService["validateAvatarAccess"](1, {
                    shapeId: 1,
                    eyesId: 1,
                    mouthId: 1,
                    colorShapeId: 1,
                })
            ).rejects.toThrow(RpcException);
        });
    });

    describe("generateFillSvg", () => {
        it("should return solid color SVG", () => {
            const svg = avatarService["generateFillSvg"]("#ff0000");
            expect(svg).toContain('fill="#ff0000"');
        });

        it("should return gradient SVG", () => {
            const svg = avatarService["generateFillSvg"]("#ff0000,#00ff00");
            expect(svg).toContain("<linearGradient");
            expect(svg).toContain("stop-color");
        });
    });

    describe("loadAssetBuffer", () => {
        it("should return file buffer if found", () => {
            (fs.readFileSync as jest.Mock).mockReturnValue(Buffer.from("file"));
            const result = avatarService["loadAssetBuffer"]("some/path.png");
            expect(result).toBeInstanceOf(Buffer);
        });

        it("should throw if file not found and not optional", () => {
            (fs.readFileSync as jest.Mock).mockImplementation(() => {
                throw new Error("File not found");
            });
            expect(() => {
                avatarService["loadAssetBuffer"]("missing.png");
            }).toThrow("Fichier manquant");
        });

        it("should return undefined if optional and file not found", () => {
            (fs.readFileSync as jest.Mock).mockImplementation(() => {
                throw new Error("File not found");
            });
            const result = avatarService["loadAssetBuffer"](
                "missing.png",
                true
            );
            expect(result).toBeUndefined();
        });
    });

    describe("getRandomAvatarDto", () => {
        it("should return a complete dto", async () => {
            const mockAssets = [{ id: 1 }, { id: 2 }];
            const mockColors = [{ id: 3 }, { id: 4 }];
            (prisma.avatarAsset.findMany as jest.Mock).mockResolvedValue(
                mockAssets
            );
            (prisma.color.findMany as jest.Mock).mockResolvedValue(mockColors);

            const dto = await avatarService["getRandomAvatarDto"]();
            expect(dto).toHaveProperty("shapeId");
            expect(dto).toHaveProperty("eyesId");
            expect(dto).toHaveProperty("mouthId");
            expect(dto).toHaveProperty("patternId");
            expect(dto).toHaveProperty("colorShapeId");
            expect(dto).toHaveProperty("colorPatternId");
        });
    });

    describe("createOrUpdateAvatar", () => {
        it("should create avatar if none exists", async () => {
            const dto = {
                shapeId: 1,
                eyesId: 2,
                mouthId: 3,
                patternId: undefined,
                colorShapeId: 4,
                colorPatternId: undefined,
            };
            const mockImageUrl = "https://cdn/avatar.png";

            jest.spyOn<any, any>(
                avatarService,
                "validateAvatarAccess"
            ).mockResolvedValue(undefined);
            jest.spyOn<any, any>(
                avatarService,
                "generateAvatarImage"
            ).mockResolvedValue(mockImageUrl);
            (prisma.user.findUnique as jest.Mock).mockResolvedValue({
                avatar: null,
            });
            (prisma.avatar.create as jest.Mock).mockResolvedValue({
                id: 1,
                url: mockImageUrl,
            });

            const result = await avatarService.createOrUpdateAvatar(1, dto);
            expect(result.url).toBe(mockImageUrl);
            expect(prisma.avatar.create).toHaveBeenCalled();
        });

        it("should update avatar if one exists", async () => {
            const dto = {
                shapeId: 1,
                eyesId: 2,
                mouthId: 3,
                patternId: undefined,
                colorShapeId: 4,
                colorPatternId: undefined,
            };
            const mockImageUrl = "https://cdn/avatar.png";

            jest.spyOn<any, any>(
                avatarService,
                "validateAvatarAccess"
            ).mockResolvedValue(undefined);
            jest.spyOn<any, any>(
                avatarService,
                "generateAvatarImage"
            ).mockResolvedValue(mockImageUrl);
            (prisma.user.findUnique as jest.Mock).mockResolvedValue({
                avatar: { id: 999 },
            });
            (prisma.avatar.update as jest.Mock).mockResolvedValue({
                id: 999,
                url: mockImageUrl,
            });

            const result = await avatarService.createOrUpdateAvatar(1, dto);
            expect(result.url).toBe(mockImageUrl);
            expect(prisma.avatar.update).toHaveBeenCalled();
        });
    });

    describe("buildEyesLayer / buildMouthLayer", () => {
        it("should return buffer from eyes svg", async () => {
            const buffer = Buffer.from("image");
            const result = await avatarService.buildEyesLayer(buffer);
            expect(result).toBeInstanceOf(Buffer);
        });

        it("should return buffer from mouth svg", async () => {
            const buffer = Buffer.from("image");
            const result = await avatarService.buildMouthLayer(buffer);
            expect(result).toBeInstanceOf(Buffer);
        });
    });
});
