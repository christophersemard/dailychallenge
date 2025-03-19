import { Test, TestingModule } from "@nestjs/testing";
import { LeaderboardService } from "./leaderboard.service";
import prisma from "../prisma/prisma.service";
import { Query } from "@nestjs/common";
import { LeaderboardController } from "./leaderboard.controller";

describe("LeaderboardController", () => {
    let leaderboardController: LeaderboardController;
    let leaderboardService: LeaderboardService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [LeaderboardController],
            providers: [
                {
                    provide: LeaderboardService,
                    useValue: {
                        getGlobalLeaderboard: jest.fn(),
                        getCategoryLeaderboard: jest.fn(),
                        getGameLeaderboard: jest.fn(),
                        getFriendsLeaderboard: jest.fn(),
                        getCategoryFriendsLeaderboard: jest.fn(),
                        getGameFriendsLeaderboard: jest.fn(),
                    },
                },
            ],
        }).compile();

        leaderboardController = module.get<LeaderboardController>(
            LeaderboardController
        );
        leaderboardService = module.get<LeaderboardService>(LeaderboardService);

        jest.clearAllMocks(); // ✅ Nettoie les mocks avant chaque test
    });

    describe("getGlobalLeaderboard", () => {
        it("should call leaderboardService.getGlobalLeaderboard with correct parameters", async () => {
            const payload = {
                limit: 10,
                offset: 0,
                dateStart: new Date(),
                dateEnd: new Date(),
            };
            (leaderboardService.getGlobalLeaderboard as jest.Mock).mockResolvedValue(
                []
            );

            const result = await leaderboardController.getGlobalLeaderboard(
                payload
            );

            expect(
                leaderboardService.getGlobalLeaderboard
            ).toHaveBeenCalledWith(
                payload.limit,
                payload.offset,
                payload.dateStart,
                payload.dateEnd
            );
            expect(result).toEqual([]);
        });
    });

    describe("getCategoryLeaderboard", () => {
        it("should call leaderboardService.getCategoryLeaderboard with correct parameters", async () => {
            const payload = {
                category: 1,
                limit: 10,
                offset: 0,
                dateStart: new Date(),
                dateEnd: new Date(),
            };
            (leaderboardService.getCategoryLeaderboard as jest.Mock).mockResolvedValue(
                []
            );

            const result = await leaderboardController.getCategoryLeaderboard(
                payload
            );

            expect(
                leaderboardService.getCategoryLeaderboard
            ).toHaveBeenCalledWith(
                payload.category,
                payload.limit,
                payload.offset,
                payload.dateStart,
                payload.dateEnd
            );
            expect(result).toEqual([]);
        });
    });

    describe("getGameLeaderboard", () => {
        it("should call leaderboardService.getGameLeaderboard with correct parameters", async () => {
            const payload = {
                gameId: 1,
                limit: 10,
                offset: 0,
                dateStart: new Date(),
                dateEnd: new Date(),
            };
            (leaderboardService.getGameLeaderboard as jest.Mock).mockResolvedValue(
                []
            );

            const result = await leaderboardController.getGameLeaderboard(
                payload
            );

            expect(leaderboardService.getGameLeaderboard).toHaveBeenCalledWith(
                payload.gameId,
                payload.limit,
                payload.offset,
                payload.dateStart,
                payload.dateEnd
            );
            expect(result).toEqual([]);
        });
    });

    describe("getFriendsLeaderboard", () => {
        it("should call leaderboardService.getFriendsLeaderboard with correct parameters", async () => {
            const payload = {
                userId: 1,
                limit: 10,
                offset: 0,
                dateStart: new Date(),
                dateEnd: new Date(),
            };
            (leaderboardService.getFriendsLeaderboard as jest.Mock).mockResolvedValue(
                []
            );

            const result = await leaderboardController.getFriendsLeaderboard(
                payload
            );

            expect(
                leaderboardService.getFriendsLeaderboard
            ).toHaveBeenCalledWith(
                payload.userId,
                payload.limit,
                payload.offset,
                payload.dateStart,
                payload.dateEnd
            );
            expect(result).toEqual([]);
        });
    });

    describe("getCategoryFriendsLeaderboard", () => {
        it("should call leaderboardService.getCategoryFriendsLeaderboard with correct parameters", async () => {
            const payload = {
                userId: 1,
                category: 2,
                limit: 10,
                offset: 0,
                dateStart: new Date(),
                dateEnd: new Date(),
            };
            (leaderboardService.getCategoryFriendsLeaderboard as jest.Mock).mockResolvedValue(
                []
            );

            const result = await leaderboardController.getCategoryFriendsLeaderboard(
                payload
            );

            expect(
                leaderboardService.getCategoryFriendsLeaderboard
            ).toHaveBeenCalledWith(
                payload.userId,
                payload.category,
                payload.limit,
                payload.offset,
                payload.dateStart,
                payload.dateEnd
            );
            expect(result).toEqual([]);
        });
    });

    describe("getGameFriendsLeaderboard", () => {
        it("should call leaderboardService.getGameFriendsLeaderboard with correct parameters", async () => {
            const payload = {
                userId: 1,
                gameId: 3,
                limit: 10,
                offset: 0,
                dateStart: new Date(),
                dateEnd: new Date(),
            };
            (leaderboardService.getGameFriendsLeaderboard as jest.Mock).mockResolvedValue(
                []
            );

            const result = await leaderboardController.getGameFriendsLeaderboard(
                payload
            );

            expect(
                leaderboardService.getGameFriendsLeaderboard
            ).toHaveBeenCalledWith(
                payload.userId,
                payload.gameId,
                payload.limit,
                payload.offset,
                payload.dateStart,
                payload.dateEnd
            );
            expect(result).toEqual([]);
        });
    });
});

describe("LeaderboardService", () => {
    let leaderboardService: LeaderboardService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [LeaderboardService],
        }).compile();

        leaderboardService = module.get<LeaderboardService>(LeaderboardService);
        jest.clearAllMocks(); // ✅ Nettoie les mocks avant chaque test
    });

    describe("getGlobalLeaderboard", () => {
        it("should return a sorted list of global scores", async () => {
            jest.spyOn(prisma.gameResult, "groupBy").mockResolvedValue([
                { userId: 1, _sum: { score: 200, xpGained: 50 } },
                { userId: 2, _sum: { score: 150, xpGained: 40 } },
            ] as any);

            jest.spyOn(prisma.user, "findMany").mockResolvedValue([
                { id: 1, email: "user1@example.com", userStats: {} },
                { id: 2, email: "user2@example.com", userStats: {} },
            ] as any);

            const result = await leaderboardService.getGlobalLeaderboard(10, 0);

            expect(prisma.gameResult.groupBy).toHaveBeenCalled();
            expect(prisma.user.findMany).toHaveBeenCalled();
            expect(result).toHaveLength(2);
            expect(result[0].score).toBe(200);
        });
    });

    describe("getCategoryLeaderboard", () => {
        it("should return a sorted list of scores for a category", async () => {
            jest.spyOn(prisma.gameResult, "groupBy").mockResolvedValue([
                { userId: 1, _sum: { score: 180, xpGained: 60 } },
            ] as any);

            jest.spyOn(prisma.user, "findMany").mockResolvedValue([
                { id: 1, email: "user1@example.com", userStats: {} },
            ] as any);

            const result = await leaderboardService.getCategoryLeaderboard(
                1,
                10,
                0
            );

            expect(prisma.gameResult.groupBy).toHaveBeenCalled();
            expect(prisma.user.findMany).toHaveBeenCalled();
            expect(result).toHaveLength(1);
            expect(result[0].score).toBe(180);
        });
    });

    describe("getGameLeaderboard", () => {
        it("should return a sorted list of scores for a game", async () => {
            jest.spyOn(prisma.gameResult, "groupBy").mockResolvedValue([
                { userId: 1, _sum: { score: 220, xpGained: 70 } },
            ] as any);

            jest.spyOn(prisma.user, "findMany").mockResolvedValue([
                { id: 1, email: "user1@example.com", userStats: {} },
            ] as any);

            const result = await leaderboardService.getGameLeaderboard(
                1,
                10,
                0
            );

            expect(prisma.gameResult.groupBy).toHaveBeenCalled();
            expect(prisma.user.findMany).toHaveBeenCalled();
            expect(result).toHaveLength(1);
            expect(result[0].score).toBe(220);
        });
    });

    describe("getFriendsLeaderboard", () => {
        it("should return a leaderboard of the user and their friends", async () => {
            jest.spyOn(prisma.friend, "findMany").mockResolvedValue([
                { userId: 1, friendId: 2, status: "accepted" },
            ] as any);

            jest.spyOn(prisma.gameResult, "groupBy").mockResolvedValue([
                { userId: 1, _sum: { score: 300, xpGained: 100 } },
                { userId: 2, _sum: { score: 250, xpGained: 90 } },
            ] as any);

            jest.spyOn(prisma.user, "findMany").mockResolvedValue([
                { id: 1, email: "user1@example.com", userStats: {} },
                { id: 2, email: "user2@example.com", userStats: {} },
            ] as any);

            const result = await leaderboardService.getFriendsLeaderboard(
                1,
                10,
                0
            );

            expect(prisma.friend.findMany).toHaveBeenCalled();
            expect(prisma.gameResult.groupBy).toHaveBeenCalled();
            expect(prisma.user.findMany).toHaveBeenCalled();
            expect(result).toHaveLength(2);
            expect(result[0].score).toBe(300);
        });
    });

    describe("getCategoryFriendsLeaderboard", () => {
        it("should return a category leaderboard of the user and their friends", async () => {
            jest.spyOn(prisma.friend, "findMany").mockResolvedValue([
                { userId: 1, friendId: 2, status: "accepted" },
            ] as any);

            jest.spyOn(prisma.gameResult, "groupBy").mockResolvedValue([
                { userId: 1, _sum: { score: 320, xpGained: 120 } },
            ] as any);

            jest.spyOn(prisma.user, "findMany").mockResolvedValue([
                { id: 1, email: "user1@example.com", userStats: {} },
            ] as any);

            const result = await leaderboardService.getCategoryFriendsLeaderboard(
                1,
                1,
                10,
                0
            );

            expect(prisma.friend.findMany).toHaveBeenCalled();
            expect(prisma.gameResult.groupBy).toHaveBeenCalled();
            expect(result).toHaveLength(1);
            expect(result[0].score).toBe(320);
        });
    });

    describe("getGameFriendsLeaderboard", () => {
        it("should return a game leaderboard of the user and their friends", async () => {
            jest.spyOn(prisma.friend, "findMany").mockResolvedValue([
                { userId: 1, friendId: 2, status: "accepted" },
                { userId: 1, friendId: 4, status: "accepted" },
                { userId: 1, friendId: 8, status: "accepted" },
            ] as any);

            jest.spyOn(prisma.gameResult, "groupBy").mockResolvedValue([
                { userId: 2, _sum: { score: 520, xpGained: 130 } },
                { userId: 1, _sum: { score: 220, xpGained: 130 } },
                { userId: 8, _sum: { score: 270, xpGained: 130 } },
            ] as any);

            jest.spyOn(prisma.user, "findMany").mockResolvedValue([
                { id: 2, email: "user2@example.com", userStats: {} },
            ] as any);

            const result = await leaderboardService.getGameFriendsLeaderboard(
                1,
                1,
                10,
                0
            );

            expect(prisma.friend.findMany).toHaveBeenCalled();
            expect(prisma.gameResult.groupBy).toHaveBeenCalled();
            expect(result).toHaveLength(3);
            expect(result[0].score).toBe(520);
        });
    });
});
