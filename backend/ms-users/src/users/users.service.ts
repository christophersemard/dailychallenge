import prisma from "../prisma/prisma.service";
import { BadRequestException, NotFoundException } from "@nestjs/common";

export class UsersService {
    async getUserById(userId: number, friendId: number) {
        if (!userId || !friendId) {
            throw new BadRequestException("ID utilisateur requis.");
        }

        const user = await prisma.user.findUnique({
            where: { id: userId, deletedAt: null },
            select: {
                id: true,
                pseudo: true,
                createdAt: true,
                avatar: { select: { url: true } },
                userStats: {
                    select: {
                        level: true,
                        xp: true,
                        streak: true,
                    },
                },
                userEvents: {
                    select: {
                        id: true,
                        createdAt: true,
                        type: true,
                        levelUp: true,
                        attempts: true,
                        avatarAsset: {
                            select: {
                                id: true,
                                name: true,
                                url: true,
                            },
                        },
                        friend: {
                            select: {
                                id: true,
                                user: {
                                    select: {
                                        id: true,
                                        pseudo: true,
                                        avatar: { select: { url: true } },
                                    },
                                },
                                friend: {
                                    select: {
                                        id: true,
                                        pseudo: true,
                                        avatar: { select: { url: true } },
                                    },
                                },
                                status: true,
                            },
                        },
                        gameResult: {
                            select: {
                                id: true,
                                gameId: true,
                                score: true,
                                xpGained: true,
                                status: true,
                                date: true,
                                game: {
                                    select: {
                                        id: true,
                                        name: true,
                                        path: true,
                                        imgUrl: true,
                                    },
                                },
                            },
                        },
                    },
                },
            },
        });

        if (!user) {
            throw new NotFoundException("Utilisateur introuvable.");
        }

        // Vérifier si les deux utilisateurs sont amis ou si l'un d'eux a envoyé une demande d'ami à l'autre
        const friendRequest = await prisma.friend.findFirst({
            where: {
                OR: [
                    { userId: userId, friendId: friendId },
                    { userId: friendId, friendId: userId },
                ],
            },
        });

        let isFriend: string | boolean = false;
        if (friendRequest) {
            if (friendRequest.status === "accepted") {
                isFriend = "accepted";
            } else if (
                friendRequest.userId === userId &&
                friendRequest.status === "pending"
            ) {
                isFriend = "received";
            } else if (
                friendRequest.userId === friendId &&
                friendRequest.status === "pending"
            ) {
                isFriend = "requested";
            }
        }

        // Garder les 10 derniers événements de l'utilisateur et les trier par date de création décroissante
        const userEvents = user.userEvents
            ? user.userEvents
                  .slice()
                  .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
                  .slice(0, 10)
            : [];

        const numberOfGamesPlayed = await prisma.gameResult.count({
            where: { userId: userId, deletedAt: null },
        });

        // Récupérer le jeu le plus joué de l'utilisateur (gameId sur gameResult)
        const mostPlayedGameCount = await prisma.gameResult.groupBy({
            by: ["gameId"],
            where: { userId: userId, deletedAt: null },
            _count: { gameId: true },
            orderBy: { _count: { gameId: "desc" } },
            take: 1,
        });

        let mostPlayedGame: {
            id: number;
            path: string;
            name: string;
        } | null = null;
        if (mostPlayedGameCount.length > 0) {
            mostPlayedGame = await prisma.game.findUnique({
                where: { id: mostPlayedGameCount[0].gameId },
                select: {
                    id: true,
                    path: true,
                    name: true,
                    gameCategory: {
                        select: { color: true },
                    },
                },
            });
        }

        return {
            id: user.id,
            pseudo: user.pseudo,
            createdAt: user.createdAt,
            avatarUrl: user.avatar?.url || null,
            level: user.userStats?.level || 0,
            xp: user.userStats?.xp || 0,
            streak: user.userStats?.streak || 0,
            isFriend: isFriend,
            gamesPlayed: numberOfGamesPlayed,
            mostPlayedGame: mostPlayedGame || null,
            userEvents: userEvents.map((event) => ({
                id: event.id,
                createdAt: event.createdAt,
                type: event.type,
                levelUp: event.levelUp || null,
                attempts: event.attempts || null,
                gameResult: event.gameResult,
                friend: event.friend
                    ? {
                          id: event.friend.id,
                          user: {
                              id: event.friend.user.id,
                              pseudo: event.friend.user.pseudo,
                              avatarUrl: event.friend.user.avatar?.url || null,
                          },
                          friend: {
                              id: event.friend.friend.id,
                              pseudo: event.friend.friend.pseudo,
                              avatarUrl:
                                  event.friend.friend.avatar?.url || null,
                          },
                          status: event.friend.status,
                      }
                    : null,
                avatarAsset: event.avatarAsset
                    ? {
                          id: event.avatarAsset.id,
                          name: event.avatarAsset.name,
                          url: event.avatarAsset.url,
                      }
                    : null,
            })),
        };
    }

    async getUserList() {
        return prisma.user.findMany({
            where: { deletedAt: null },
            orderBy: { createdAt: "desc" },
            select: {
                id: true,
                pseudo: true,
                createdAt: true,
                avatar: { select: { url: true } },
            },
        });
    }

    async searchUsers(query: string) {
        if (!query) {
            throw new BadRequestException("Requête de recherche requise.");
        }

        let users = await prisma.user.findMany({
            where: {
                deletedAt: null,
                OR: [{ pseudo: { contains: query, mode: "insensitive" } }],
            },
            select: {
                id: true,
                pseudo: true,
                createdAt: true,
                avatar: { select: { url: true } },
                userStats: {
                    select: {
                        level: true,
                        xp: true,
                        streak: true,
                    },
                },
            },
        });

        return users.length > 0
            ? users.map((user) => ({
                  id: user.id,
                  pseudo: user.pseudo,
                  avatarUrl: user.avatar?.url || null,
                  level: user.userStats?.level || 0,
              }))
            : [];
    }
}
