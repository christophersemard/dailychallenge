import { Injectable } from "@nestjs/common";
import prisma from "../prisma/prisma.service";

@Injectable()
export class UserEventsService {
    constructor() {}

    async addEvent(
        userId: number,
        type: string,
        avatarAssetId?: number,
        friendId?: number,
        gameResult?: any,
        levelUp?: number,
        attempts?: number
    ) {
        if (!userId || !type) {
            throw new Error("userId and type are required.");
        }

        // Vérification de l'existence de l'utilisateur
        const user = await prisma.user.findUnique({
            where: { id: userId, deletedAt: null },
        });

        if (!user) {
            throw new Error("User not found.");
        }

        // Construction de l'événement
        const eventData: any = {
            userId,
            type,
        };
        if (avatarAssetId) eventData.avatarAssetId = avatarAssetId;
        if (friendId) eventData.friendId = friendId;
        if (levelUp) eventData.levelUp = levelUp;
        if (attempts) eventData.attempts = attempts;
        if (gameResult) {
            eventData.gameResultId = gameResult.id;
        }

        console.log("Event data to be created:", eventData);

        // Enregistrement de l'événement
        const event = await prisma.userEvent.create({
            data: eventData,
        });

        if (!event) {
            throw new Error("Failed to create event.");
        }
        return event;
    }

    async getUserEvents(userId: number) {
        return prisma.userEvent.findMany({
            where: { userId },
            orderBy: { createdAt: "desc" },
            select: {
                id: true,
                createdAt: true,
                type: true,
                levelUp: true,
                attempts: true,
                gameResult: true,
            },
        });
    }
}
