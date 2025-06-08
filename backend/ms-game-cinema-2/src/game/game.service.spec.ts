import { Test, TestingModule } from "@nestjs/testing";
import { GameService } from "./game.service";
import { ClientProxy } from "@nestjs/microservices";
import {
    NotFoundException,
    ConflictException,
    BadRequestException,
} from "@nestjs/common";
import prisma from "../prisma/prisma.service";
import { of } from "rxjs";

jest.mock("../prisma/prisma.service", () => ({
    __esModule: true,
    default: {
        gameCinema2Days: {
            findUnique: jest.fn(),
            findFirst: jest.fn(),
            findMany: jest.fn(),
        },
        gameResult: {
            findFirst: jest.fn(),
            findMany: jest.fn(),
        },
        gameCinema2Tries: {
            count: jest.fn(),
            create: jest.fn(),
            findMany: jest.fn(),
        },
        dataMovie: {
            findUnique: jest.fn(),
            findMany: jest.fn(),
        },
    },
}));

describe("GameService - Cinéma 2", () => {
    let service: GameService;
    let mockClient: ClientProxy;

    beforeEach(async () => {
        mockClient = { send: jest.fn() } as any;

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GameService,
                { provide: "USERS_SERVICE", useValue: mockClient },
            ],
        }).compile();

        service = module.get<GameService>(GameService);

        // Par défaut, VIP actif
        jest.spyOn(service as any, "getUserVipProfile").mockResolvedValue({
            isVip: true,
            extraAttempt: 1,
        });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("getGameByDate", () => {
        it("should throw NotFoundException if no game found", async () => {
            jest.spyOn(prisma.gameCinema2Days, "findUnique").mockResolvedValue(
                null
            );
            await expect(
                service.getGameByDate(1, "2024-03-24")
            ).rejects.toThrow(NotFoundException);
        });

        it("should block past games if not VIP", async () => {
            const pastDate = new Date();
            pastDate.setDate(pastDate.getDate() - 1);
            const dateIso = pastDate.toISOString().split("T")[0];

            jest.spyOn(service as any, "getUserVipProfile").mockResolvedValue({
                isVip: false,
                extraAttempt: 0,
            });

            jest.spyOn(prisma.gameCinema2Days, "findUnique").mockResolvedValue({
                id: 1,
                date: new Date(dateIso),
                movie: { title: "Test", image1: "", keywords: "" },
            } as any);

            await expect(service.getGameByDate(1, dateIso)).rejects.toThrow(
                BadRequestException
            );
        });

        it("should return guessed=true if result found", async () => {
            jest.spyOn(prisma.gameCinema2Days, "findUnique").mockResolvedValue({
                id: 1,
                date: new Date("2024-03-24"),
                movie: {
                    title: "Titanic",
                    image1: "img1.jpg",
                    keywords: "a,b,c,d,e",
                },
            } as any);

            jest.spyOn(prisma.gameResult, "findFirst").mockResolvedValue({
                id: 1,
            } as any);
            jest.spyOn(prisma.gameCinema2Tries, "findMany").mockResolvedValue([
                { id: 1 },
            ] as any);
            jest.spyOn(service as any, "getHints").mockResolvedValue({
                hints: {},
                lastHintUnlocked: null,
            });

            const result = await service.getGameByDate(1, "2024-03-24");
            expect(result.guessed).toBe(true);
            expect(result.attempts).toBe(1);
            expect(result.maxAttempts).toBe(11); // 10 + 1 VIP
        });
    });

    describe("submitGuess", () => {
        it("should throw ConflictException if already answered", async () => {
            jest.spyOn(prisma.gameCinema2Days, "findFirst").mockResolvedValue({
                id: 1,
                date: new Date(),
                movie: { id: 10, title: "Titanic" },
            } as any);
            jest.spyOn(prisma.gameResult, "findFirst").mockResolvedValue({
                id: 1,
            } as any);

            await expect(service.submitGuess(1, "10")).rejects.toThrow(
                ConflictException
            );
        });

        it("should throw BadRequestException if trying past game without VIP", async () => {
            const yesterday = new Date();
            yesterday.setDate(yesterday.getDate() - 1);
            const dateIso = yesterday.toISOString().split("T")[0];

            jest.spyOn(service as any, "getUserVipProfile").mockResolvedValue({
                isVip: false,
                extraAttempt: 0,
            });

            jest.spyOn(prisma.gameCinema2Days, "findFirst").mockResolvedValue({
                id: 1,
                date: new Date(dateIso),
                movie: { id: 9, title: "OldMovie", image1: "", keywords: "" },
            } as any);
            jest.spyOn(prisma.gameResult, "findFirst").mockResolvedValue(null);

            await expect(service.submitGuess(1, "9", dateIso)).rejects.toThrow(
                BadRequestException
            );
        });

        it("should register a correct guess", async () => {
            jest.spyOn(prisma.gameCinema2Days, "findFirst").mockResolvedValue({
                id: 1,
                date: new Date(),
                movie: {
                    id: 5,
                    title: "Matrix",
                    image1: "img1.jpg",
                    keywords: "a,b,c,d,e",
                },
            } as any);
            jest.spyOn(prisma.gameResult, "findFirst").mockResolvedValue(null);
            jest.spyOn(prisma.gameCinema2Tries, "count").mockResolvedValue(0);
            jest.spyOn(prisma.dataMovie, "findUnique").mockResolvedValue({
                title: "Matrix",
            } as any);
            jest.spyOn(prisma.gameCinema2Tries, "create").mockResolvedValue(
                {} as any
            );
            jest.spyOn(mockClient, "send").mockReturnValue(
                of({ success: true })
            );

            const result = await service.submitGuess(1, "5");
            expect(result.lastGuessed).toBe(true);
            expect(result.attempts).toBe(1);
            expect(result.maxAttempts).toBe(11);
        });

        it("should register failed guess at max attempts", async () => {
            jest.spyOn(prisma.gameCinema2Days, "findFirst").mockResolvedValue({
                id: 1,
                date: new Date(),
                movie: {
                    id: 3,
                    title: "Avatar",
                    image1: "img1.jpg",
                    keywords: "x,y,z",
                },
            } as any);
            jest.spyOn(prisma.gameResult, "findFirst").mockResolvedValue(null);
            jest.spyOn(prisma.gameCinema2Tries, "count").mockResolvedValue(10); // VIP max atteint
            jest.spyOn(prisma.dataMovie, "findUnique").mockResolvedValue({
                title: "Wrong",
            } as any);
            jest.spyOn(prisma.gameCinema2Tries, "create").mockResolvedValue(
                {} as any
            );
            jest.spyOn(mockClient, "send").mockReturnValue(
                of({ success: true })
            );

            const result = await service.submitGuess(1, "999");
            expect(result.lastGuessed).toBe(false);
            expect(result.attempts).toBe(11); // 10 + 1
        });
    });

    describe("searchMovie", () => {
        it("should format duplicates with year", async () => {
            const now = new Date();
            jest.spyOn(prisma.dataMovie, "findMany").mockResolvedValue([
                { id: 1, title: "A", originalTitle: "A1", releaseDate: now },
                { id: 2, title: "B", originalTitle: "B1", releaseDate: now },
                { id: 3, title: "B", originalTitle: "B2", releaseDate: now },
            ] as any);

            const res = await service.searchMovie("a");
            expect(res[1].otherInfo).toBe(now.getFullYear().toString());
        });
    });

    describe("getGameResult", () => {
        it("should throw if no game for date", async () => {
            jest.spyOn(prisma.gameCinema2Days, "findFirst").mockResolvedValue(
                null
            );
            await expect(
                service.getGameResult(1, "2024-01-01")
            ).rejects.toThrow(NotFoundException);
        });

        it("should throw if no result", async () => {
            jest.spyOn(prisma.gameCinema2Days, "findFirst").mockResolvedValue({
                id: 1,
                date: new Date(),
            } as any);
            jest.spyOn(prisma.gameResult, "findFirst").mockResolvedValue(null);
            await expect(
                service.getGameResult(1, "2024-01-01")
            ).rejects.toThrow(NotFoundException);
        });

        it("should return result", async () => {
            jest.spyOn(prisma.gameCinema2Days, "findFirst").mockResolvedValue({
                id: 1,
                date: new Date(),
            } as any);
            jest.spyOn(prisma.gameResult, "findFirst").mockResolvedValue({
                id: 1,
                status: "passed",
            } as any);

            const result = await service.getGameResult(1, "2024-01-01");
            expect(result.status).toBe("passed");
        });
    });
});
