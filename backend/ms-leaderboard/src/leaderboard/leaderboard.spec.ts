import { Test, TestingModule } from "@nestjs/testing";
import { LeaderboardService } from "./leaderboard.service";
jest.mock("../prisma/prisma.service", () => ({
    __esModule: true,
    default: {
        friend: {
            findMany: jest.fn(),
        },
        gameResult: {
            groupBy: jest.fn(),
            aggregate: jest.fn(),
            count: jest.fn(),
        },
        user: {
            findMany: jest.fn(),
            findUnique: jest.fn(),
        },
        gameCategory: {
            findMany: jest.fn(),
        },
    },
}));

import prisma from "../prisma/prisma.service";

describe("LeaderboardService", () => {
    let service: LeaderboardService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [LeaderboardService],
        }).compile();

        service = module.get<LeaderboardService>(LeaderboardService);
        jest.clearAllMocks();
    });

    it("should return global leaderboard with players", async () => {
        (prisma.gameResult.groupBy as jest.Mock).mockResolvedValue([
            { userId: 1, _sum: { score: 100, xpGained: 50 } },
        ]);
        (prisma.user.findMany as jest.Mock).mockResolvedValue([
            {
                id: 1,
                pseudo: "Player1",
                avatar: { url: "avatar1.png" },
                userStats: { level: 2, streak: 5 },
            },
        ]);
        (prisma.gameResult.count as jest.Mock).mockResolvedValue(5);
        (prisma.gameResult.aggregate as jest.Mock).mockResolvedValue({
            _sum: { score: 100, xpGained: 50 },
        });
        (prisma.user.findUnique as jest.Mock).mockResolvedValue({
            id: 1,
            pseudo: "Player1",
            avatar: { url: "avatar1.png" },
            userStats: { level: 2, streak: 5 },
        });

        const result = await service.getGlobalLeaderboard(1, 10, 0);
        expect(result.numberOfPlayers).toBe(1);
        expect(result.players).toHaveLength(1);
        expect(result.player).not.toBeNull();
        expect(result.player?.user.pseudo).toBe("Player1");
    });

    it("should return category leaderboard", async () => {
        (prisma.gameResult.groupBy as jest.Mock).mockResolvedValue([
            { userId: 2, _sum: { score: 120, xpGained: 30 } },
        ]);
        (prisma.user.findMany as jest.Mock).mockResolvedValue([
            {
                id: 2,
                pseudo: "Player2",
                avatar: { url: "avatar2.png" },
                userStats: { level: 3, streak: 1 },
            },
        ]);
        (prisma.gameResult.count as jest.Mock).mockResolvedValue(3);
        (prisma.gameResult.aggregate as jest.Mock).mockResolvedValue({
            _sum: { score: 120, xpGained: 30 },
        });
        (prisma.user.findUnique as jest.Mock).mockResolvedValue({
            id: 1,
            pseudo: "Player1",
            avatar: { url: "avatar1.png" },
            userStats: { level: 2, streak: 5 },
        });

        const result = await service.getCategoryLeaderboard(1, 99, 10, 0);
        expect(result.players[0].user.pseudo).toBe("Player2");
    });

    it("should return friends leaderboard", async () => {
        (prisma.friend.findMany as jest.Mock).mockResolvedValue([
            { userId: 1, friendId: 3, status: "accepted" },
        ]);
        (prisma.gameResult.groupBy as jest.Mock).mockResolvedValue([
            { userId: 3, _sum: { score: 80, xpGained: 20 } },
        ]);
        (prisma.user.findMany as jest.Mock).mockResolvedValue([
            {
                id: 3,
                pseudo: "Friend",
                avatar: { url: null },
                userStats: { level: 1, streak: 0 },
            },
        ]);
        (prisma.gameResult.count as jest.Mock).mockResolvedValue(2);
        (prisma.gameResult.aggregate as jest.Mock).mockResolvedValue({
            _sum: { score: 80, xpGained: 20 },
        });
        (prisma.user.findUnique as jest.Mock).mockResolvedValue({
            id: 1,
            pseudo: "Me",
            avatar: { url: null },
            userStats: { level: 2, streak: 3 },
        });

        const result = await service.getFriendsLeaderboard(1, 10, 0);
        expect(result.players[0].user.pseudo).toBe("Friend");
    });

    it("should return categories with games", async () => {
        (prisma.gameCategory.findMany as jest.Mock).mockResolvedValue([
            {
                id: 1,
                name: "Cinema",
                color: "red",
                games: [
                    {
                        id: 1,
                        name: "FilmQuiz",
                        description: "Guess the film",
                        imgUrl: "img.jpg",
                        path: "/filmquiz",
                        status: "active",
                        gameCategoryId: 1,
                    },
                ],
            },
        ]);

        const result = await service.getCategoriesWithGames();
        expect(result).toHaveLength(1);
        expect(result[0].games[0].name).toBe("FilmQuiz");
    });
});
