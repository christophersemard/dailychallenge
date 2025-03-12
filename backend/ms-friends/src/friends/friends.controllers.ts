import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import prisma from "../prisma/prisma.service";
import { handleRpcError } from "../utils/error.utils";

@Controller()
export class FriendsController {
    @MessagePattern("add_friend")
    async addFriend(@Payload() data) {
        const { userId, friendId } = data;
        if (!userId || !friendId || userId === friendId) {
            handleRpcError("Requête invalide.", 400);
        }

        // Vérifier que les deux utilisateurs existent
        const user = await prisma.user.findUnique({ where: { id: userId } });
        const friend = await prisma.user.findUnique({
            where: { id: friendId },
        });

        if (!user || !friend) {
            handleRpcError("Utilisateur introuvable.", 404);
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
            handleRpcError(
                "Vous êtes déjà amis ou une demande est en attente.",
                409
            );
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
            handleRpcError("Requête invalide.", 400);
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
            handleRpcError("Aucune relation d'amitié trouvée.", 404);
        }

        return { statusCode: 200, message: "Ami supprimé avec succès" };
    }

    @MessagePattern("respond_friend_request")
    async respondFriendRequest(@Payload() data) {
        const { userId, friendId, accept } = data;
        if (!userId || !friendId) {
            handleRpcError("Requête invalide.", 400);
        }

        const friendRequest = await prisma.friend.findFirst({
            where: { userId: friendId, friendId: userId, status: "pending" },
        });

        if (!friendRequest) {
            handleRpcError("Aucune demande en attente.", 404);
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
            handleRpcError("Utilisateur non authentifié.", 401);
        }

        const friends = await prisma.friend.findMany({
            where: {
                OR: [
                    { userId, status: "accepted" },
                    { friendId: userId, status: "accepted" },
                ],
            },
            include: {
                user: true,
                friend: true,
            },
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
