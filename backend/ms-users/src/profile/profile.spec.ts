import { ProfileService } from "./profile.service";
import prisma from "../prisma/prisma.service";
import { NotFoundException, BadRequestException } from "@nestjs/common";

jest.mock("../prisma/prisma.service", () => ({
    __esModule: true,
    default: {
        user: {
            findUnique: jest.fn(),
            update: jest.fn(),
        },
        vipSubscription: {
            findFirst: jest.fn(),
            findMany: jest.fn(),
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

describe("ProfileService", () => {
    let profileService: ProfileService;

    beforeEach(() => {
        profileService = new ProfileService();
        jest.clearAllMocks();
    });

    describe("getProfile", () => {
        it("should throw if user not found", async () => {
            (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
            await expect(profileService.getProfile(1)).rejects.toThrow(
                NotFoundException
            );
        });

        it("should return full profile with vip info and most played game", async () => {
            const now = new Date();

            (prisma.user.findUnique as jest.Mock).mockResolvedValue({
                id: 1,
                pseudo: "User",
                email: "test@test.com",
                createdAt: now,
                role: "user",
                avatar: {
                    id: 1,
                    url: "avatar.png",
                    shape: "round",
                    eyes: "happy",
                    mouth: "smile",
                    pattern: "stripes",
                    colorShape: "blue",
                    colorPattern: "lightblue",
                },
                userStats: {
                    id: 1,
                    level: 5,
                    xp: 200,
                    streak: 3,
                    lastPlayedAt: now,
                },
                userEvents: [
                    {
                        id: 10,
                        createdAt: now,
                        type: "game_completed",
                        levelUp: 3,
                        attempts: 2,
                        avatarAsset: {
                            id: 1,
                            name: "Funny Hat",
                            url: "hat.png",
                        },
                        friend: {
                            id: 99,
                            user: {
                                id: 2,
                                pseudo: "Friend",
                                avatar: { url: "url2" },
                            },
                            friend: {
                                id: 1,
                                pseudo: "User",
                                avatar: { url: "url1" },
                            },
                            status: "accepted",
                        },
                        gameResult: {
                            id: 1,
                            gameId: 42,
                            score: 100,
                            xpGained: 100,
                            status: "passed",
                            date: now,
                            game: {
                                id: 42,
                                name: "GeoGame",
                                path: "/geo",
                                imgUrl: "geo.png",
                            },
                        },
                    },
                ],
            });

            (prisma.vipSubscription.findFirst as jest.Mock).mockResolvedValue({
                status: "active",
                endDate: new Date(Date.now() + 100000),
                plan: "monthly",
                cancelledAt: null,
            });

            (prisma.vipSubscription.findMany as jest.Mock).mockResolvedValue([
                {
                    startDate: now,
                    endDate: now,
                    status: "active",
                    plan: "monthly",
                },
            ]);

            (prisma.gameResult.count as jest.Mock).mockResolvedValue(12);
            (prisma.gameResult.groupBy as jest.Mock).mockResolvedValue([
                { gameId: 42, _count: { gameId: 5 } },
            ]);
            (prisma.game.findUnique as jest.Mock).mockResolvedValue({
                id: 42,
                name: "GeoGame",
                path: "/geo",
                gameCategory: { color: "#00f" },
            });

            const result = await profileService.getProfile(1);

            expect(result).toHaveProperty("id", 1);
            expect(result.vip.status).toBe("active");
            expect(result.userEvents.length).toBe(1);
            expect(result.vipHistory.length).toBe(1);
            expect(result.gamesPlayed).toBe(12);
            expect(result.mostPlayedGame!.name).toBe("GeoGame");
        });

        it("should return inactive vip if no active subscription", async () => {
            (prisma.user.findUnique as jest.Mock).mockResolvedValue({
                id: 1,
                pseudo: "Test",
                email: "test@test.com",
                createdAt: new Date(),
                role: "user",
                avatar: null,
                userStats: null,
                userEvents: [],
            });

            (prisma.vipSubscription.findFirst as jest.Mock).mockResolvedValue(
                null
            );
            (prisma.vipSubscription.findMany as jest.Mock).mockResolvedValue(
                []
            );
            (prisma.gameResult.count as jest.Mock).mockResolvedValue(0);
            (prisma.gameResult.groupBy as jest.Mock).mockResolvedValue([]);

            const result = await profileService.getProfile(1);
            expect(result.vip.status).toBe("inactive");
            expect(result.mostPlayedGame).toBeNull();
        });
    });

    describe("updatePseudo", () => {
        it("should throw if pseudo is already taken", async () => {
            (prisma.user.findUnique as jest.Mock).mockResolvedValue({ id: 99 });
            await expect(profileService.updatePseudo(1, "new")).rejects.toThrow(
                BadRequestException
            );
        });

        it("should update pseudo if available", async () => {
            (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
            (prisma.user.update as jest.Mock).mockResolvedValue({
                id: 1,
                pseudo: "new",
                password: "hidden",
            });

            const result = await profileService.updatePseudo(1, "new");
            expect(result).toHaveProperty("pseudo", "new");
            expect(result).not.toHaveProperty("password");
        });
    });
});
