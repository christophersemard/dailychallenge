import {
    Injectable,
    ConflictException,
    NotFoundException,
    BadRequestException,
} from "@nestjs/common";
import prisma from "../prisma/prisma.service";
import { UpdateProfileDto } from "./dto/update-profile.dto";

@Injectable()
export class ProfileService {
    async getProfile(userId: number) {
        const user = await prisma.user.findUnique({
            where: { id: userId, deletedAt: null },
            select: {
                id: true,
                pseudo: true,
                email: true,
                isVip: true,
                createdAt: true,
                avatar: {
                    select: {
                        id: true,
                        url: true,
                        shape: true,
                        eyes: true,
                        mouth: true,
                        pattern: true,
                        colorShape: true,
                        colorPattern: true,
                    },
                },
                userStats: {
                    select: {
                        level: true,
                        xp: true,
                        streak: true,
                        lastPlayedAt: true,
                        id: true,
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
            email: user.email,
            createdAt: user.createdAt,
            isVip: user.isVip,
            avatar:
                (user.avatar && {
                    id: user.avatar.id,
                    url: user.avatar.url,
                    shape: user.avatar.shape,
                    eyes: user.avatar.eyes,
                    mouth: user.avatar.mouth,
                    pattern: user.avatar.pattern,
                    colorShape: user.avatar.colorShape,
                    colorPattern: user.avatar.colorPattern,
                }) ||
                null,
            userStats:
                (user.userStats && {
                    id: user.userStats.id,
                    xp: user.userStats.xp,
                    level: user.userStats.level,
                    streak: user.userStats.streak,
                    lastPlayedAt: user.userStats.lastPlayedAt,
                }) ||
                null,
            avatarUrl: user.avatar?.url || null,
            level: user.userStats?.level || 0,
            xp: user.userStats?.xp || 0,
            streak: user.userStats?.streak || 0,
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

    async updatePseudo(userId: number, newPseudo: string) {
        const existing = await prisma.user.findUnique({
            where: { pseudo: newPseudo },
        });

        if (existing && existing.id !== userId) {
            throw new BadRequestException("Ce pseudo est déjà utilisé.");
        }

        const user = await prisma.user.update({
            where: { id: userId },
            data: { pseudo: newPseudo },
        });

        const { password, ...userWithoutPassword } = user;
        return userWithoutPassword;
    }
}
