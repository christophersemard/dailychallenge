import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import prisma from "../prisma/prisma.service"; // Utilisation de Prisma directement

@Injectable()
export class EventCleanupJob {
    @Cron(CronExpression.EVERY_DAY_AT_1AM) // Tous les jours à 1h du matin
    async removeExpiredEvents() {
        console.log("⏳ Suppression des événements expirés...");

        const expirationDate = new Date();
        expirationDate.setDate(expirationDate.getDate() - 7); // Événements plus vieux de 3 jours

        // Supprimer les événements "game_completed" expirés
        await prisma.userEvent.deleteMany({
            where: {
                type: "game_completed",
                createdAt: { lte: expirationDate }, // Plus de 3 jours
            },
        });

        // Supprimer les événements "game_failed" expirés
        await prisma.userEvent.deleteMany({
            where: {
                type: "game_failed",
                createdAt: { lte: expirationDate },
            },
        });

        // Supprimer les événements "game_completed_old" expirés
        await prisma.userEvent.deleteMany({
            where: {
                type: "game_completed_old",
                createdAt: { lte: expirationDate },
            },
        });

        console.log("✅ Événements expirés supprimés.");
    }
}
