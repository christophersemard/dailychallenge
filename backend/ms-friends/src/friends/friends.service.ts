// backend/ms-friends/src/friends/friends.service.ts
import { Injectable } from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import prisma from "../prisma/prisma.service";

@Injectable()
export class FriendsService {
    async addFriend(userId: number, friendId: number) {
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
        const friendRequest = await prisma.friend.findFirst({
            where: { userId: friendId, friendId: userId, status: "pending" },
        });

        if (!friendRequest) {
            throw new RpcException({
                statusCode: 404,
                error: "NOT_FOUND",
                message: "Aucune demande en attente.",
            });
        }

        const updated = await prisma.friend.update({
            where: { id: friendRequest.id },
            data: { status: accept ? "accepted" : "rejected" },
        });

        return {
            message: accept ? "Ami accepté !" : "Demande refusée.",
            friendRequest: updated,
        };
    }

    async getFriendsList(userId: number) {
        const friends = await prisma.friend.findMany({
            where: {
                OR: [
                    { userId, status: "accepted" },
                    { friendId: userId, status: "accepted" },
                ],
            },
            include: { user: true, friend: true },
        });

        return {
            friends: friends.map((friendship) => ({
                id:
                    friendship.userId === userId
                        ? friendship.friend.id
                        : friendship.user.id,
                email:
                    friendship.userId === userId
                        ? friendship.friend.email
                        : friendship.user.email,
            })),
        };
    }

    async getPendingRequests(userId: number) {
        const requests = await prisma.friend.findMany({
            where: {
                friendId: userId,
                status: "pending",
            },
            include: { user: true },
        });

        return {
            requests: requests.map((req) => ({
                id: req.id,
                userId: req.userId,
                friendId: req.friendId,
                status: req.status,
                createdAt: req.createdAt,
                requesterEmail: req.user.email,
            })),
        };
    }
}
