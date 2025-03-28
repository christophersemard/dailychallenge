// backend/ms-friends/src/friends/friends.service.ts
import { Injectable } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import prisma from "../prisma/prisma.service";

@Injectable()
export class FriendsService {
    async addFriend(userId: number, friendId: number) {
        console.log("userId", userId);
        console.log("friendId", friendId);

        if (!userId || !friendId || userId === friendId) {
            throw new RpcException({
                statusCode: 400,
                error: "BAD_REQUEST",
                message: "Requête invalide.",
            });
        }

        const user = await prisma.user.findUnique({ where: { id: userId } });
        const friend = await prisma.user.findUnique({
            where: { id: friendId },
        });

        if (!user || !friend) {
            throw new RpcException({
                statusCode: 404,
                error: "NOT_FOUND",
                message: "Utilisateur introuvable.",
            });
        }

        const existing = await prisma.friend.findFirst({
            where: {
                OR: [
                    { userId, friendId },
                    { userId: friendId, friendId: userId },
                ],
            },
        });

        if (existing) {
            throw new RpcException({
                statusCode: 409,
                error: "CONFLICT",
                message: "Vous êtes déjà amis ou une demande est en attente.",
            });
        }

        const friendRequest = await prisma.friend.create({
            data: { userId, friendId },
        });

        return {
            message: "Demande envoyée",
            friendRequest,
        };
    }

    async removeFriend(userId: number, friendId: number) {
        const deleted = await prisma.friend.deleteMany({
            where: {
                OR: [
                    { userId, friendId, status: "accepted" },
                    { userId: friendId, friendId: userId, status: "accepted" },
                ],
            },
        });

        if (deleted.count === 0) {
            throw new RpcException({
                statusCode: 404,
                error: "NOT_FOUND",
                message: "Aucune relation d'amitié trouvée.",
            });
        }

        return { message: "Ami supprimé avec succès" };
    }

    async respondFriendRequest(
        userId: number,
        friendId: number,
        accept: boolean
    ) {
        console.log("userId", userId);
        console.log("friendId", friendId);
        console.log("accept", accept);
        const friendRequest = await prisma.friend.findFirst({
            where: { userId: friendId, friendId: userId, status: "pending" },
        });

        console.log("friendRequest", friendRequest);

        if (!friendRequest) {
            throw new RpcException({
                statusCode: 404,
                error: "NOT_FOUND",
                message: "Aucune demande en attente.",
            });
        }

        if (friendRequest.status !== "pending") {
            throw new RpcException({
                statusCode: 400,
                error: "BAD_REQUEST",
                message: "La demande n'est pas en attente.",
            });
        }

        if (friendRequest.userId === userId) {
            throw new RpcException({
                statusCode: 400,
                error: "BAD_REQUEST",
                message: "Vous ne pouvez pas répondre à votre propre demande.",
            });
        }

        if (accept) {
            let updated = await prisma.friend.update({
                where: { id: friendRequest.id },
                data: { status: "accepted" },
            });

            return {
                message: accept ? "Ami accepté !" : "Demande refusée.",
                friendRequest: updated,
            };
        } else {
            // Refuser la demande d'ami
            let updated = await prisma.friend.update({
                where: { id: friendRequest.id },
                data: { status: "rejected" },
            });
            // Supprimer la demande d'ami
            await prisma.friend.delete({
                where: { id: friendRequest.id },
            });
            return {
                message: "Demande refusée.",
                friendRequest: updated,
            };
        }
    }

    async getFriendsList(userId: number) {
        const friends = await prisma.friend.findMany({
            where: {
                OR: [
                    { userId, status: "accepted" },
                    { friendId: userId, status: "accepted" },
                ],
            },
            include: {
                user: {
                    include: { userStats: true, avatar: true },
                },
                friend: {
                    include: { userStats: true, avatar: true },
                },
            },
        });

        return friends.map((friendship) => ({
            id:
                friendship.userId === userId
                    ? friendship.friend.id
                    : friendship.user.id,
            pseudo:
                friendship.userId === userId
                    ? friendship.friend.pseudo
                    : friendship.user.pseudo,
            level:
                friendship.userId === userId
                    ? friendship.friend.userStats!.level
                    : friendship.user.userStats!.level,
            avatarUrl:
                friendship.userId === userId
                    ? friendship.friend.avatar?.url || null
                    : friendship.user.avatar?.url || null,
        }));
    }

    async getPendingRequests(userId: number) {
        const requestsReceived = await prisma.friend.findMany({
            where: {
                friendId: userId,
                status: "pending",
            },
            select: {
                id: true,
                userId: true,
                friendId: true,
                status: true,
                createdAt: true,
                user: {
                    select: {
                        email: true,
                        pseudo: true,
                        avatar: {
                            select: {
                                url: true,
                            },
                        },
                        userStats: {
                            select: {
                                level: true,
                            },
                        },
                    },
                },
            },
        });

        const requestsSent = await prisma.friend.findMany({
            where: {
                userId,
                status: "pending",
            },
            select: {
                id: true,
                userId: true,
                friendId: true,
                status: true,
                createdAt: true,
                friend: {
                    select: {
                        email: true,
                        pseudo: true,
                        avatar: {
                            select: {
                                url: true,
                            },
                        },
                        userStats: {
                            select: {
                                level: true,
                            },
                        },
                    },
                },
            },
        });

        return {
            sent: requestsSent.map((req) => ({
                id: req.id,
                userId: req.userId,
                friendId: req.friendId,
                status: req.status,
                createdAt: req.createdAt,
                user: {
                    id: req.friendId,
                    pseudo: req.friend.pseudo,
                    level: req.friend.userStats!.level,
                    avatarUrl: req.friend.avatar ? req.friend.avatar.url : null,
                },
            })),

            received: requestsReceived.map((req) => ({
                id: req.id,
                userId: req.userId,
                friendId: req.friendId,
                status: req.status,
                createdAt: req.createdAt,
                user: {
                    id: req.userId,
                    pseudo: req.user.pseudo,
                    level: req.user.userStats!.level,
                    avatarUrl: req.user.avatar ? req.user.avatar.url : null,
                },
            })),
        };
    }
}
