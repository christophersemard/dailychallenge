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
        gameCinema1Days: {
            findUnique: jest.fn(),
            findFirst: jest.fn(),
            findMany: jest.fn(),
        },
        gameResult: {
            findFirst: jest.fn(),
            findMany: jest.fn(),
        },
        gameCinema1Tries: {
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

describe("GameService", () => {
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

        // Mock VIP par défaut
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
            jest.spyOn(prisma.gameCinema1Days, "findUnique").mockResolvedValue(
                null
            );
            await expect(
                service.getGameByDate(1, "2024-03-24")
            ).rejects.toThrow(NotFoundException);
        });

        it("should throw BadRequestException for past date if not VIP", async () => {
            const pastDate = new Date();
            pastDate.setDate(pastDate.getDate() - 1);
            const iso = pastDate.toISOString().split("T")[0];

            jest.spyOn(service as any, "getUserVipProfile").mockResolvedValue({
                isVip: false,
                extraAttempt: 0,
            });

            jest.spyOn(prisma.gameCinema1Days, "findUnique").mockResolvedValue({
                id: 1,
                date: new Date(iso),
                movie: {
                    title: "Test",
                    genres: "",
                    runtime: 100,
                    keywords: "",
                },
            } as any);

            await expect(service.getGameByDate(1, iso)).rejects.toThrow(
                BadRequestException
            );
        });

        it("should return guessed=true if result exists", async () => {
            jest.spyOn(prisma.gameCinema1Days, "findUnique").mockResolvedValue({
                id: 1,
                date: new Date(),
                movie: {
                    title: "Test",
                    genres: "",
                    runtime: 100,
                    keywords: "",
                },
            } as any);
            jest.spyOn(prisma.gameResult, "findFirst").mockResolvedValue({
                id: 1,
            } as any);
            jest.spyOn(prisma.gameCinema1Tries, "findMany").mockResolvedValue([
                {},
            ] as any);
            jest.spyOn(service as any, "getHints").mockResolvedValue({
                hints: {},
                lastHintUnlocked: null,
            });

            const result = await service.getGameByDate(
                1,
                new Date().toISOString().split("T")[0]
            );
            expect(result.guessed).toBe(true);
            expect(result.maxAttempts).toBe(11); // 10 de base + 1 VIP
        });
    });

    describe("submitGuess", () => {
        it("should block past date if not VIP", async () => {
            const past = new Date();
            past.setDate(past.getDate() - 1);

            jest.spyOn(prisma.gameCinema1Days, "findFirst").mockResolvedValue({
                id: 1,
                date: past,
                movie: { id: 1, title: "Test", keywords: "test" },
            } as any);

            jest.spyOn(service as any, "getUserVipProfile").mockResolvedValue({
                isVip: false,
                extraAttempt: 0,
            });

            await expect(
                service.submitGuess(1, "1", past.toISOString().split("T")[0])
            ).rejects.toThrow(BadRequestException);
        });

        it("should throw ConflictException if already played", async () => {
            const now = new Date();
            jest.spyOn(prisma.gameCinema1Days, "findFirst").mockResolvedValue({
                id: 1,
                date: now,
                movie: { id: 5, title: "Test", keywords: "a,b" },
            } as any);
            jest.spyOn(prisma.gameResult, "findFirst").mockResolvedValue({
                id: 99,
            } as any);

            await expect(service.submitGuess(1, "5")).rejects.toThrow(
                ConflictException
            );
        });

        it("should allow correct guess", async () => {
            const now = new Date();
            jest.spyOn(prisma.gameCinema1Days, "findFirst").mockResolvedValue({
                id: 1,
                date: now,
                movie: { id: 7, title: "Yes", keywords: "a,b" },
            } as any);
            jest.spyOn(prisma.gameResult, "findFirst").mockResolvedValue(null);
            jest.spyOn(prisma.gameCinema1Tries, "count").mockResolvedValue(0);
            jest.spyOn(prisma.dataMovie, "findUnique").mockResolvedValue({
                title: "Yes",
            } as any);
            jest.spyOn(prisma.gameCinema1Tries, "create").mockResolvedValue(
                {} as any
            );
            jest.spyOn(mockClient, "send").mockReturnValue(of({ id: 1 }));

            const result = await service.submitGuess(1, "7");
            expect(result.lastGuessed).toBe(true);
            expect(result.maxAttempts).toBe(11);
        });
    });

    describe("searchMovie", () => {
        it("should return correctly formatted results", async () => {
            const now = new Date();
            const year = now.getFullYear();
            jest.spyOn(prisma.dataMovie, "findMany").mockResolvedValue([
                {
                    id: 1,
                    title: "Alpha",
                    originalTitle: "Alpha Original",
                    releaseDate: now,
                },
                {
                    id: 2,
                    title: "Beta",
                    originalTitle: "Beta Original",
                    releaseDate: now,
                },
                {
                    id: 3,
                    title: "Beta",
                    originalTitle: "Beta Original 2",
                    releaseDate: now,
                },
            ] as any);

            const result = await service.searchMovie("a");
            expect(result).toEqual([
                {
                    id: 1,
                    name: "Alpha",
                    originalName: "Alpha Original",
                    otherInfo: null,
                },
                {
                    id: 2,
                    name: "Beta",
                    originalName: "Beta Original",
                    otherInfo: year.toString(),
                },
                {
                    id: 3,
                    name: "Beta",
                    originalName: "Beta Original 2",
                    otherInfo: year.toString(),
                },
            ]);
        });
    });

    describe("getGameResult", () => {
        it("should throw NotFoundException if no game found", async () => {
            jest.spyOn(prisma.gameCinema1Days, "findFirst").mockResolvedValue(
                null
            );
            await expect(
                service.getGameResult(1, "2024-01-01")
            ).rejects.toThrow(NotFoundException);
        });

        it("should throw NotFoundException if no result found", async () => {
            jest.spyOn(prisma.gameCinema1Days, "findFirst").mockResolvedValue({
                id: 2,
                date: new Date(),
            } as any);
            jest.spyOn(prisma.gameResult, "findFirst").mockResolvedValue(null);
            await expect(
                service.getGameResult(1, "2024-01-01")
            ).rejects.toThrow(NotFoundException);
        });

        it("should return result if found", async () => {
            jest.spyOn(prisma.gameCinema1Days, "findFirst").mockResolvedValue({
                id: 2,
                date: new Date(),
            } as any);
            jest.spyOn(prisma.gameResult, "findFirst").mockResolvedValue({
                status: "passed",
            } as any);
            const result = await service.getGameResult(1, "2024-01-01");
            expect(result.status).toBe("passed");
        });
    });
});
