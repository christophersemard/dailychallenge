import { UsersService } from "./users.service";
import prisma from "../prisma/prisma.service";
import { BadRequestException, NotFoundException } from "@nestjs/common";

jest.mock("../prisma/prisma.service", () => ({
    __esModule: true,
    default: {
        user: {
            findUnique: jest.fn(),
            findMany: jest.fn(),
        },
        friend: {
            findFirst: jest.fn(),
        },
        gameResult: {
            count: jest.fn(),
            groupBy: jest.fn(),
        },
        game: {
            findUnique: jest.fn(),
        },
    },
}));

describe("UsersService", () => {
    let usersService: UsersService;

    beforeEach(() => {
        usersService = new UsersService();
        jest.clearAllMocks();
    });

    describe("getUserById", () => {
        it("should throw if userId or friendId is missing", async () => {
            await expect(usersService.getUserById(0, 0)).rejects.toThrow(
                BadRequestException
            );
        });

        it("should throw if user not found", async () => {
            (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
            await expect(usersService.getUserById(1, 2)).rejects.toThrow(
                NotFoundException
            );
        });

        it("should return full user profile with friend status and events", async () => {
            const user = {
                id: 1,
                pseudo: "PlayerOne",
                createdAt: new Date(),
                avatar: { url: "avatar.png" },
                userStats: { level: 2, xp: 100, streak: 3 },
                userEvents: [
                    {
                        id: 10,
                        createdAt: new Date(),
                        type: "game_completed",
                        levelUp: 5,
                        attempts: 2,
                        avatarAsset: { id: 1, name: "cool", url: "asset.png" },
                        friend: {
                            id: 99,
                            user: {
                                id: 2,
                                pseudo: "Friend",
                                avatar: { url: "avatar2.png" },
                            },
                            friend: {
                                id: 1,
                                pseudo: "PlayerOne",
                                avatar: { url: "avatar.png" },
                            },
                            status: "accepted",
                        },
                        gameResult: {
                            id: 1,
                            gameId: 42,
                            score: 100,
                            xpGained: 200,
                            status: "passed",
                            date: new Date(),
                            game: {
                                id: 42,
                                name: "GeoGuess",
                                path: "/geo",
                                imgUrl: "geo.png",
                            },
                        },
                    },
                ],
            };

            (prisma.user.findUnique as jest.Mock).mockResolvedValue(user);
            (prisma.friend.findFirst as jest.Mock).mockResolvedValue({
                userId: 1,
                friendId: 2,
                status: "accepted",
            });
            (prisma.gameResult.count as jest.Mock).mockResolvedValue(10);
            (prisma.gameResult.groupBy as jest.Mock).mockResolvedValue([
                { gameId: 42, _count: { gameId: 5 } },
            ]);
            (prisma.game.findUnique as jest.Mock).mockResolvedValue({
                id: 42,
                name: "GeoGuess",
                path: "/geo",
                gameCategory: { color: "#FF0000" },
            });

            const result = await usersService.getUserById(1, 2);

            expect(result).toHaveProperty("id", 1);
            expect(result).toHaveProperty("isFriend", "accepted");
            expect(result.gamesPlayed).toBe(10);
            expect(result.mostPlayedGame).toHaveProperty("name", "GeoGuess");
            expect(result.userEvents.length).toBe(1);
        });

        it("should return isFriend as received", async () => {
            (prisma.user.findUnique as jest.Mock).mockResolvedValue({
                id: 1,
                pseudo: "Test",
                createdAt: new Date(),
                avatar: null,
                userStats: null,
                userEvents: [],
            });
            (prisma.friend.findFirst as jest.Mock).mockResolvedValue({
                userId: 1,
                friendId: 2,
                status: "pending",
            });
            (prisma.gameResult.count as jest.Mock).mockResolvedValue(0);
            (prisma.gameResult.groupBy as jest.Mock).mockResolvedValue([]);
            const result = await usersService.getUserById(1, 2);
            expect(result.isFriend).toBe("received");
        });

        it("should return isFriend as requested", async () => {
            (prisma.user.findUnique as jest.Mock).mockResolvedValue({
                id: 1,
                pseudo: "Test",
                createdAt: new Date(),
                avatar: null,
                userStats: null,
                userEvents: [],
            });
            (prisma.friend.findFirst as jest.Mock).mockResolvedValue({
                userId: 2,
                friendId: 1,
                status: "pending",
            });
            (prisma.gameResult.count as jest.Mock).mockResolvedValue(0);
            (prisma.gameResult.groupBy as jest.Mock).mockResolvedValue([]);
            const result = await usersService.getUserById(1, 2);
            expect(result.isFriend).toBe("requested");
        });

        it("should return isFriend false if no relation", async () => {
            (prisma.user.findUnique as jest.Mock).mockResolvedValue({
                id: 1,
                pseudo: "Test",
                createdAt: new Date(),
                avatar: null,
                userStats: null,
                userEvents: [],
            });
            (prisma.friend.findFirst as jest.Mock).mockResolvedValue(null);
            (prisma.gameResult.count as jest.Mock).mockResolvedValue(0);
            (prisma.gameResult.groupBy as jest.Mock).mockResolvedValue([]);
            const result = await usersService.getUserById(1, 2);
            expect(result.isFriend).toBe(false);
        });
    });

    describe("getUserList", () => {
        it("should return all users", async () => {
            const users = [
                {
                    id: 1,
                    pseudo: "A",
                    createdAt: new Date(),
                    avatar: { url: "1.png" },
                },
                {
                    id: 2,
                    pseudo: "B",
                    createdAt: new Date(),
                    avatar: { url: "2.png" },
                },
            ];
            (prisma.user.findMany as jest.Mock).mockResolvedValue(users);
            const result = await usersService.getUserList();
            expect(result.length).toBe(2);
            expect(result[0]).toHaveProperty("pseudo", "A");
        });
    });

    describe("searchUsers", () => {
        it("should throw if query is empty", async () => {
            await expect(usersService.searchUsers("")).rejects.toThrow(
                BadRequestException
            );
        });

        it("should return matching users with level", async () => {
            (prisma.user.findMany as jest.Mock).mockResolvedValue([
                {
                    id: 1,
                    pseudo: "player",
                    createdAt: new Date(),
                    avatar: { url: "url" },
                    userStats: { level: 3, xp: 100, streak: 2 },
                },
            ]);
            const result = await usersService.searchUsers("pla");
            expect(result[0].level).toBe(3);
        });

        it("should return empty array if no match", async () => {
            (prisma.user.findMany as jest.Mock).mockResolvedValue([]);
            const result = await usersService.searchUsers("zzzz");
            expect(result).toEqual([]);
        });
    });
});
