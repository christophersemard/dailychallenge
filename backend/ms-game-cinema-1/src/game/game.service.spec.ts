import { Test, TestingModule } from "@nestjs/testing";
import { GameService } from "./game.service";
import { ClientProxy } from "@nestjs/microservices";
import { NotFoundException, ConflictException } from "@nestjs/common";
import prisma from "../prisma/prisma.service";
import { of } from "rxjs";

describe("GameService", () => {
    let service: GameService;
    let mockClient: ClientProxy;

    beforeEach(async () => {
        mockClient = {
            send: jest.fn(),
        } as any;

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                GameService,
                {
                    provide: "USERS_SERVICE",
                    useValue: mockClient,
                },
            ],
        }).compile();

        service = module.get<GameService>(GameService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("getTodayGame", () => {
        it("should call getGameByDate with today's date", async () => {
            const spy = jest
                .spyOn(service, "getGameByDate")
                .mockResolvedValue("test" as any);
            const userId = 1;
            await service.getTodayGame(userId);
            expect(spy).toHaveBeenCalledWith(userId, expect.any(String));
        });
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
                movie: { title: "Titanic", genres: "Drama", runtime: 195 },
            } as any);

            jest.spyOn(prisma.gameResult, "findFirst").mockResolvedValue({
                id: 1,
                status: "passed",
            } as any);

            jest.spyOn(prisma.gameCinema1Tries, "count").mockResolvedValue(3);

            const result = await service.getGameByDate(1, "2024-03-24");
            expect(result.guessed).toBe(true);
            expect(result.maskedTitle).toContain("*");
        });
    });

    describe("submitGuess", () => {
        it("should throw ConflictException if already answered", async () => {
            jest.spyOn(prisma.gameCinema1Days, "findFirst").mockResolvedValue({
                id: 1,
                date: new Date(),
                movie: { id: 10, title: "Titanic" },
            } as any);

            jest.spyOn(prisma.gameResult, "findFirst").mockResolvedValue({
                id: 1,
            } as any);

            await expect(
                service.submitGuess(1, "10", "2024-03-24")
            ).rejects.toThrow(ConflictException);
        });

        it("should register a correct answer and return result", async () => {
            jest.spyOn(prisma.gameCinema1Days, "findFirst").mockResolvedValue({
                id: 1,
                date: new Date(),
                movie: { id: 5, title: "Matrix" },
            } as any);

            jest.spyOn(prisma.gameResult, "findFirst").mockResolvedValue(null);
            jest.spyOn(prisma.gameCinema1Tries, "count").mockResolvedValue(0);
            jest.spyOn(prisma.dataMovie, "findUnique").mockResolvedValue({
                title: "Matrix",
            } as any);
            jest.spyOn(prisma.gameCinema1Tries, "create").mockResolvedValue(
                {} as any
            );

            jest.spyOn(mockClient, "send").mockReturnValue(
                of({ success: true })
            );

            const result = await service.submitGuess(1, "5", "2024-03-24");
            console.log("RESULT SUBMIT GUESS");
            console.log(result);
            expect(result.lastGuessed).toBe(true);
            expect(result.attempts).toBe(1);
        });

        it("should register a failed guess and create game result if max reached", async () => {
            jest.spyOn(prisma.gameCinema1Days, "findFirst").mockResolvedValue({
                id: 1,
                date: new Date(),
                movie: { id: 3, title: "Avatar" },
            } as any);

            jest.spyOn(prisma.gameResult, "findFirst").mockResolvedValue(null);
            jest.spyOn(prisma.gameCinema1Tries, "count").mockResolvedValue(9);
            jest.spyOn(prisma.dataMovie, "findUnique").mockResolvedValue({
                title: "Titanic",
            } as any);
            jest.spyOn(prisma.gameCinema1Tries, "create").mockResolvedValue(
                {} as any
            );

            jest.spyOn(mockClient, "send").mockReturnValue(
                of({ success: true })
            );

            const result = await service.submitGuess(1, "10", "2024-03-24");
            expect(result.lastGuessed).toBe(false);
            expect(result.attempts).toBe(10);
        });
    });

    describe("searchMovie", () => {
        it("should call findMany with correct query", async () => {
            const spy = jest
                .spyOn(prisma.dataMovie, "findMany")
                .mockResolvedValue([{ title: "Test" }] as any);

            const result = await service.searchMovie("test");
            expect(spy).toHaveBeenCalled();
            expect(result).toEqual([{ title: "Test" }]);
        });
    });

    describe("getGameResult", () => {
        it("should throw NotFoundException if no game found", async () => {
            jest.spyOn(prisma.gameCinema1Days, "findFirst").mockResolvedValue(
                null
            );

            await expect(
                service.getGameResult(1, "2024-03-24")
            ).rejects.toThrow(NotFoundException);
        });

        it("should throw NotFoundException if no result found", async () => {
            jest.spyOn(prisma.gameCinema1Days, "findFirst").mockResolvedValue({
                id: 1,
                date: new Date(),
            } as any);

            jest.spyOn(prisma.gameResult, "findFirst").mockResolvedValue(null);

            await expect(
                service.getGameResult(1, "2024-03-24")
            ).rejects.toThrow(NotFoundException);
        });

        it("should return game result if found", async () => {
            jest.spyOn(prisma.gameCinema1Days, "findFirst").mockResolvedValue({
                id: 1,
                date: new Date(),
            } as any);

            jest.spyOn(prisma.gameResult, "findFirst").mockResolvedValue({
                userId: 1,
                gameId: 1,
                status: "passed",
            } as any);

            const result = await service.getGameResult(1, "2024-03-24");
            expect(result).toHaveProperty("status", "passed");
        });
    });
});
