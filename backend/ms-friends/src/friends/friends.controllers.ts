import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import prisma from "../prisma/prisma.service";
import { RpcException } from "@nestjs/microservices";

@Controller()
export class FriendsController {
    @MessagePattern("add_friend")
    async addFriend(@Payload() data) {
        const { userId, friendId } = data;
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

        const existingFriendship = await prisma.friend.findFirst({
            where: {
                OR: [
                    { userId, friendId },
                    { userId: friendId, friendId: userId },
                ],
            },
        });

        if (existingFriendship) {
            throw new RpcException({
                statusCode: 409,
                error: "CONFLICT",
                message: "Vous êtes déjà amis ou une demande est en attente.",
            });
        }

        const friendRequest = await prisma.friend.create({
            data: { userId, friendId },
        });

        return { statusCode: 201, message: "Demande envoyée", friendRequest };
    }

    @MessagePattern("remove_friend")
    async removeFriend(@Payload() data) {
        const { userId, friendId } = data;
        if (!userId || !friendId) {
            throw new RpcException({
                statusCode: 400,
                error: "BAD_REQUEST",
                message: "Requête invalide.",
            });
        }

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

        return { statusCode: 200, message: "Ami supprimé avec succès" };
    }

    @MessagePattern("respond_friend_request")
    async respondFriendRequest(@Payload() data) {
        const { userId, friendId, accept } = data;
        if (!userId || !friendId) {
            throw new RpcException({
                statusCode: 400,
                error: "BAD_REQUEST",
                message: "Requête invalide.",
            });
        }

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

        const updatedFriendship = await prisma.friend.update({
            where: { id: friendRequest!.id },
            data: { status: accept ? "accepted" : "rejected" },
        });

        return {
            statusCode: 200,
            message: accept ? "Ami accepté !" : "Demande refusée.",
            updatedFriendship,
        };
    }

    @MessagePattern("get_friends_list")
    async getFriendsList(@Payload() data) {
        const { userId } = data;
        if (!userId) {
            throw new RpcException({
                statusCode: 401,
                error: "UNAUTHORIZED",
                message: "Utilisateur non authentifié.",
            });
        }

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
            statusCode: 200,
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
}
