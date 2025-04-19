// leaderboard.service.ts
import { Injectable } from "@nestjs/common";
import prisma from "../prisma/prisma.service";
import { LeaderboardEntry } from "./leaderboard.types";

@Injectable()
export class LeaderboardService {
    private async getFriendIds(userId: number): Promise<number[]> {
        const friends = await prisma.friend.findMany({
            where: {
                OR: [{ userId }, { friendId: userId }],
                status: "accepted",
            },
            select: { userId: true, friendId: true },
        });

        return friends.map((f) =>
            f.userId === userId ? f.friendId : f.userId
        );
    }

    async getGlobalLeaderboard(
        userId: number,
        limit: number,
        offset: number,
        dateStart?: Date,
        dateEnd?: Date
    ) {
        return this.buildLeaderboardResponse({
            userId,
            limit,
            offset,
            dateStart,
            dateEnd,
        });
    }

    async getCategoryLeaderboard(
        userId: number,
        category: number,
        limit: number,
        offset: number,
        dateStart?: Date,
        dateEnd?: Date
    ) {
        return this.buildLeaderboardResponse({
            userId,
            limit,
            offset,
            dateStart,
            dateEnd,
            where: {
                game: { gameCategoryId: category },
            },
        });
    }

    async getGameLeaderboard(
        userId: number,
        gameId: number,
        limit: number,
        offset: number,
        dateStart?: Date,
        dateEnd?: Date
    ) {
        return this.buildLeaderboardResponse({
            userId,
            limit,
            offset,
            dateStart,
            dateEnd,
            where: {
                gameId,
            },
        });
    }

    async getFriendsLeaderboard(
        userId: number,
        limit: number,
        offset: number,
        dateStart?: Date,
        dateEnd?: Date
    ) {
        const friendIds = await this.getFriendIds(userId);
        return this.buildLeaderboardResponse({
            userId,
            limit,
            offset,
            dateStart,
            dateEnd,
            where: {
                userId: { in: [...friendIds, userId] },
            },
        });
    }

    async getFriendsCategoryLeaderboard(
        userId: number,
        category: number,
        limit: number,
        offset: number,
        dateStart?: Date,
        dateEnd?: Date
    ) {
        const friendIds = await this.getFriendIds(userId);
        return this.buildLeaderboardResponse({
            userId,
            limit,
            offset,
            dateStart,
            dateEnd,
            where: {
                userId: { in: [...friendIds, userId] },
                game: { gameCategoryId: category },
            },
        });
    }

    async getFriendsGameLeaderboard(
        userId: number,
        gameId: number,
        limit: number,
        offset: number,
        dateStart?: Date,
        dateEnd?: Date
    ) {
        const friendIds = await this.getFriendIds(userId);
        return this.buildLeaderboardResponse({
            userId,
            limit,
            offset,
            dateStart,
            dateEnd,
            where: {
                userId: { in: [...friendIds, userId] },
                gameId,
            },
        });
    }

    private async buildLeaderboardResponse({
        userId,
        limit,
        offset,
        dateStart,
        dateEnd,
        where = {},
    }: {
        userId: number;
        limit: number;
        offset: number;
        dateStart?: Date;
        dateEnd?: Date;
        where?: Record<string, any>;
    }) {
        const whereWithDate = {
            ...where,
            date: {
                ...(dateStart && { gte: dateStart }),
                ...(dateEnd && { lte: dateEnd }),
            },
        };

        // 1️⃣ Nombre total de joueurs distincts
        const distinctUsers = await prisma.gameResult.groupBy({
            by: ["userId"],
            where: whereWithDate,
        });
        const numberOfPlayers = distinctUsers.length;

        // 2️⃣ Classement top N
        const groupedResults = await prisma.gameResult.groupBy({
            by: ["userId"],
            _sum: {
                score: true,
                xpGained: true,
            },
            where: whereWithDate,
            orderBy: { _sum: { score: "desc" } },
            take: Number(limit),
            skip: !Number.isNaN(offset) ? Number(offset) : undefined,
        });

        const userIds = groupedResults.map((r) => r.userId);

        const users = await prisma.user.findMany({
            where: { id: { in: userIds } },
            select: {
                id: true,
                pseudo: true,
                avatar: true,
                userStats: {
                    select: {
                        level: true,
                        streak: true,
                    },
                },
            },
        });

        // 3️⃣ Pour chaque joueur, compter ses parties (dans le contexte)
        const players: LeaderboardEntry[] = await Promise.all(
            groupedResults.map(async (res) => {
                const user = users.find((u) => u.id === res.userId);
                const gamesPlayed = await prisma.gameResult.count({
                    where: {
                        userId: res.userId,
                        ...whereWithDate,
                    },
                });

                return {
                    user: {
                        id: user?.id || res.userId,
                        pseudo: user?.pseudo || "Inconnu",
                        avatar: user?.avatar?.url || null, // ✅ Corrigé ici
                        level: user?.userStats?.level ?? 0,
                        streak: user?.userStats?.streak ?? 0,
                        gamesPlayed,
                    },
                    score: res._sum.score ?? 0,
                    xpGained: res._sum.xpGained ?? 0,
                };
            })
        );

        // 4️⃣ Joueur connecté s'il n'est pas dans la page
        const currentUserScore = await prisma.gameResult.aggregate({
            _sum: { score: true, xpGained: true },
            where: { userId, ...whereWithDate },
        });

        const currentUserInfo = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                id: true,
                pseudo: true,
                avatar: true,
                userStats: {
                    select: {
                        level: true,
                        streak: true,
                    },
                },
            },
        });

        const gamesPlayed = await prisma.gameResult.count({
            where: { userId, ...whereWithDate },
        });

        const player =
            (currentUserScore._sum.score ?? 0) > 0 ||
            (currentUserScore._sum.xpGained ?? 0) > 0
                ? {
                      user: {
                          id: currentUserInfo?.id || userId,
                          pseudo: currentUserInfo?.pseudo || "Moi",
                          avatar: currentUserInfo?.avatar?.url || null, // ✅ Corrigé ici aussi
                          level: currentUserInfo?.userStats?.level ?? 0,
                          streak: currentUserInfo?.userStats?.streak ?? 0,
                          gamesPlayed,
                      },
                      score: currentUserScore._sum.score ?? 0,
                      xpGained: currentUserScore._sum.xpGained ?? 0,
                  }
                : null;

        return {
            numberOfPlayers,
            players,
            player,
        };
    }

    async getCategoriesWithGames() {
        const categories = await prisma.gameCategory.findMany({
            where: {
                deletedAt: null,
            },
            select: {
                id: true,
                name: true,
                color: true,
                games: {
                    where: {
                        deletedAt: null,
                    },
                    select: {
                        id: true,
                        name: true,
                        description: true,
                        imgUrl: true,
                        path: true,
                        status: true,
                        gameCategoryId: true,
                    },
                },
            },
            orderBy: {
                createdAt: "asc",
            },
        });

        return categories;
    }
}
