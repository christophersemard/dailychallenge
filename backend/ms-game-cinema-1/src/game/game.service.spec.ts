import { Test, TestingModule } from "@nestjs/testing";
import { GameService } from "./game.service";
import { ClientProxy } from "@nestjs/microservices";
import { NotFoundException, ConflictException } from "@nestjs/common";
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

        it("should return guessed=true if gameResult found", async () => {
            jest.spyOn(prisma.gameCinema1Days, "findUnique").mockResolvedValue({
                id: 1,
                date: new Date("2024-03-24"),
                movie: {
                    title: "Titanic",
                    genres: "Drama",
                    runtime: 120,
                    keywords: "ocean, iceberg",
                },
            } as any);

            jest.spyOn(prisma.gameResult, "findFirst").mockResolvedValue({
                id: 10,
            } as any);
            jest.spyOn(prisma.gameCinema1Tries, "findMany").mockResolvedValue([
                { guess: "Titanic" },
            ] as any);
            jest.spyOn(service as any, "getHints").mockResolvedValue({
                hints: {},
                lastHintUnlocked: null,
            } as any);

            const result = await service.getGameByDate(1, "2024-03-24");
            expect(result.guessed).toBe(true);
            expect(result.attempts).toBe(1);
        });
    });

    describe("submitGuess", () => {
        it("should throw ConflictException if already guessed", async () => {
            jest.spyOn(prisma.gameCinema1Days, "findFirst").mockResolvedValue({
                id: 1,
                date: new Date(),
                movie: { id: 1, title: "Titanic" },
            } as any);
            jest.spyOn(prisma.gameResult, "findFirst").mockResolvedValue({
                id: 99,
            } as any);

            await expect(service.submitGuess(1, "1")).rejects.toThrow(
                ConflictException
            );
        });

        it("should return result with correct guess", async () => {
            jest.spyOn(prisma.gameCinema1Days, "findFirst").mockResolvedValue({
                id: 1,
                date: new Date(),
                movie: {
                    id: 5,
                    title: "Matrix",
                    keywords: "sci-fi, neo, hacker, fight, future",
                },
            } as any);
            jest.spyOn(prisma.gameResult, "findFirst").mockResolvedValue(null);
            jest.spyOn(prisma.gameCinema1Tries, "count").mockResolvedValue(0);
            jest.spyOn(prisma.dataMovie, "findUnique").mockResolvedValue({
                title: "Matrix",
            } as any);
            jest.spyOn(prisma.gameCinema1Tries, "create").mockResolvedValue(
                {} as any
            );
            jest.spyOn(mockClient, "send").mockReturnValue(of({ id: 1 }));

            const result = await service.submitGuess(1, "5");
            expect(result.lastGuessed).toBe(true);
            expect(result.attempts).toBe(1);
        });

        it("should return result with failed guess and max attempts", async () => {
            jest.spyOn(prisma.gameCinema1Days, "findFirst").mockResolvedValue({
                id: 1,
                date: new Date(),
                movie: {
                    id: 2,
                    title: "Inception",
                    keywords: "dream, mind, time, heist, subconscious",
                },
            } as any);
            jest.spyOn(prisma.gameResult, "findFirst").mockResolvedValue(null);
            jest.spyOn(prisma.gameCinema1Tries, "count").mockResolvedValue(9);
            jest.spyOn(prisma.dataMovie, "findUnique").mockResolvedValue({
                title: "Wrong Movie",
            } as any);
            jest.spyOn(prisma.gameCinema1Tries, "create").mockResolvedValue(
                {} as any
            );
            jest.spyOn(mockClient, "send").mockReturnValue(of({ id: 2 }));

            const result = await service.submitGuess(1, "10");
            expect(result.lastGuessed).toBe(false);
            expect(result.attempts).toBe(10);
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
