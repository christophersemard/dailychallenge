import { Injectable } from "@nestjs/common";
import { Cron, CronExpression } from "@nestjs/schedule";
import prisma from "../prisma/prisma.service";

@Injectable()
export class StreakResetJob {
    @Cron(CronExpression.EVERY_DAY_AT_MIDNIGHT)
    async resetExpiredStreaks() {
        console.log("⏳ Réinitialisation des streaks expirés...");

        const today = new Date();
        const usersToReset = await prisma.userStats.findMany({
            where: {
                lastPlayedAt: {
                    lt: new Date(today.setDate(today.getDate() - 1)),
                },
                streak: { gt: 0 }, // Seulement ceux qui ont un streak actif
            },
        });

        if (usersToReset.length > 0) {
            await prisma.userStats.updateMany({
                where: {
                    userId: { in: usersToReset.map((u) => u.userId) },
                },
                data: { streak: 0 },
            });

            console.log(`✅ ${usersToReset.length} streaks réinitialisés.`);
        } else {
            console.log("✅ Aucun streak expiré à réinitialiser.");
        }
    }
}
