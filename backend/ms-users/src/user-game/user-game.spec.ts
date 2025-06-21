import { Test, TestingModule } from "@nestjs/testing";
import { UserGameService } from "./user-game.service";
import { UserEventsService } from "../user-events/user-events.service";
import { RpcException } from "@nestjs/microservices";
import prisma from "../prisma/prisma.service";

jest.mock("../prisma/prisma.service", () => ({
    __esModule: true,
    default: {
        userStats: {
            findUnique: jest.fn(),
            update: jest.fn(),
            findMany: jest.fn(),
            updateMany: jest.fn(),
        },
        gameResult: {
            create: jest.fn(),
            groupBy: jest.fn(),
            aggregate: jest.fn(),
            count: jest.fn(),
        },
        user: {
            findMany: jest.fn(),
            findUnique: jest.fn(),
        },
        game: {
            findUnique: jest.fn(),
        },
        friend: {
            findMany: jest.fn(),
        },
        userEvent: {
            create: jest.fn(),
            findMany: jest.fn(),
            deleteMany: jest.fn(),
        },
    },
}));

describe("UserGameService", () => {
    let userGameService: UserGameService;
    let userEventsService: UserEventsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UserGameService,
                {
                    provide: UserEventsService,
                    useValue: {
                        addEvent: jest.fn(),
                    },
                },
            ],
        }).compile();

        userGameService = module.get<UserGameService>(UserGameService);
        userEventsService = module.get<UserEventsService>(UserEventsService);
    });

    describe("calculateScore", () => {
        it("should return correct score for passed game on the same day", async () => {
            const today = new Date();
            const result = await userGameService.calculateScore(
                1,
                5,
                "passed",
                today
            );
            expect(result.score).toBe(100);
            expect(result.isSameDay).toBe(true);
        });

        it("should return 0 score for failed game", async () => {
            const today = new Date();
            const result = await userGameService.calculateScore(
                1,
                5,
                "failed",
                today
            );
            expect(result.score).toBe(0);
        });
    });

    describe("calculateXPAndStreak", () => {
        beforeEach(() => {
            (prisma.userStats.findUnique as jest.Mock).mockResolvedValue({
                userId: 1,
                xp: 100,
                streak: 2,
                level: 1,
                lastPlayedAt: new Date(Date.now() - 86400000), // hier
            });
        });

        it("should increment streak if played consecutively", async () => {
            const result = await userGameService.calculateXPAndStreak(
                1,
                50,
                1,
                new Date(),
                "passed"
            );
            expect(result.newStreak).toBe(3);
            expect(result.finalXP).toBeGreaterThan(50);
        });
    });

    describe("saveGameResult", () => {
        it("should call prisma.gameResult.create with proper data", async () => {
            const mockResult = {
                id: 1,
                score: 80,
                xpGained: 100,
                userId: 1,
                gameId: 1,
                status: "passed",
                date: new Date(),
            };
            (prisma.gameResult.create as jest.Mock).mockResolvedValue(
                mockResult
            );

            const result = await userGameService.saveGameResult(
                1,
                1,
                80,
                100,
                "passed",
                new Date()
            );
            expect(result).toEqual(mockResult);
        });
    });

    describe("updateUserStats", () => {
        it("should call prisma.userStats.update with incremented XP and streak", async () => {
            const updated = { userId: 1, xp: 200, streak: 3 };
            (prisma.userStats.update as jest.Mock).mockResolvedValue(updated);

            const result = await userGameService.updateUserStats(
                1,
                100,
                3,
                new Date()
            );
            expect(result.streak).toBe(3);
            expect(result.xp).toBe(200);
        });
    });

    describe("handleLevelUpEvent", () => {
        it("should call addEvent if user levels up", async () => {
            (prisma.userStats.findUnique as jest.Mock).mockResolvedValue({
                userId: 1,
                level: 1,
            });

            const mockResult = { xpGained: 9999 }; // force le niveau up
            await userGameService.handleLevelUpEvent(1, 1, mockResult);

            expect(userEventsService.addEvent).toHaveBeenCalled();
        });
    });

    describe("processGameResult", () => {
        it("should throw if game not found", async () => {
            (prisma.game.findUnique as jest.Mock).mockResolvedValue(null);

            await expect(
                userGameService.processGameResult(
                    1,
                    9999,
                    1,
                    5,
                    "passed",
                    new Date()
                )
            ).rejects.toThrow("Jeu non trouvé");
        });

        it("should process a passed game correctly", async () => {
            (prisma.game.findUnique as jest.Mock).mockResolvedValue({ id: 1 });
            (prisma.userStats.findUnique as jest.Mock).mockResolvedValue({
                userId: 1,
                xp: 0,
                streak: 0,
                level: 1,
                lastPlayedAt: null,
            });
            (prisma.gameResult.create as jest.Mock).mockResolvedValue({
                id: 1,
                score: 100,
                xpGained: 100,
                status: "passed",
                userId: 1,
                gameId: 1,
                date: new Date(),
            });
            (prisma.userStats.update as jest.Mock).mockResolvedValue({});

            const result = await userGameService.processGameResult(
                1,
                1,
                1,
                5,
                "passed",
                new Date()
            );
            expect(result).toHaveProperty("score", 100);
        });
    });
});
