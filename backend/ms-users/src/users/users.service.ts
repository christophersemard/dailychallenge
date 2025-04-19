import prisma from "../prisma/prisma.service";
import { BadRequestException, NotFoundException } from "@nestjs/common";

export class UsersService {
    async getUserById(userId: number, friendId: number) {
        console.log("userId", userId, "friendId", friendId);
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
                        details: true,
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
                isFriend = "requested";
            } else if (
                friendRequest.userId === friendId &&
                friendRequest.status === "pending"
            ) {
                isFriend = "received";
            }
        }

        // Garder les 10 derniers événements de l'utilisateur et les trier par date de création décroissante
        const userEvents = user.userEvents
            ? user.userEvents
                  .slice()
                  .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
                  .slice(0, 10)
            : [];

        return {
            id: user.id,
            pseudo: user.pseudo,
            createdAt: user.createdAt,
            avatarUrl: user.avatar?.url || null,
            level: user.userStats?.level || 0,
            xp: user.userStats?.xp || 0,
            streak: user.userStats?.streak || 0,
            isFriend: isFriend,
            userEvents: userEvents.map((event) => ({
                id: event.id,
                createdAt: event.createdAt,
                type: event.type,
                details: event.details,
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
