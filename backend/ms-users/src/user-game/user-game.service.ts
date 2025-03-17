import { Injectable } from "@nestjs/common";
import prisma from "../prisma/prisma.service";
import { UserEventsService } from "../user-events/user-events.service"; // Pour gérer les événements
import { RpcException } from "@nestjs/microservices";

@Injectable()
export class UserGameService {
    constructor(private userEventsService: UserEventsService) {}

    // Enregistrer un score de jeu
    async processGameResult(
        userId: number,
        gameId: number,
        attempts: number,
        maxAttempts: number,
        status: "passed" | "failed",
        gameDate: Date
    ) {
        // Calcul du score basé sur les essais
        let score = 0;
        // Vérifier si le jeu a été joué le même jour que aujourd'hui, peu importe l'heure
        let isSameDay = false;
        const today = new Date();
        const gameDateObj = new Date(gameDate);
        if (
            today.getDate() === gameDateObj.getDate() &&
            today.getMonth() === gameDateObj.getMonth() &&
            today.getFullYear() === gameDateObj.getFullYear()
        ) {
            isSameDay = true;
        }

        if (status === "passed" && isSameDay) {
            score = Math.max(
                100 - Math.floor((attempts / maxAttempts) * 100),
                0
            ); // 100 points max, dégressif avec les essais
        } else {
            score = 0; // Si échoué, le score est 0
        }

        // Calcul de l'XP et du streak
        const { finalXP, newStreak } = await this.calculateXPAndStreak(
            userId,
            score,
            gameId
        );

        // Enregistrer le résultat du jeu
        const gameResult = await prisma.gameResult.create({
            data: {
                userId,
                gameId,
                score,
                xpGained: finalXP,
                status,
                date: gameDate,
            },
        });

        // Mise à jour des statistiques de l'utilisateur
        const userStats = await prisma.userStats.update({
            where: { userId },
            data: {
                xp: { increment: finalXP },
                streak: newStreak,
                lastPlayedAt: gameDate,
            },
        });

        // Gérer l'événement de niveau si nécessaire
        const { level } = this.calculateLevel(userStats.xp);
        if (level > userStats.level) {
            await this.userEventsService.addEvent(
                userId,
                "level_up",
                `Nouveau niveau ${level} atteint dans le jeu ${gameId}`
            );
        }

        // Ajouter un événement "game_completed" si le joueur termine un jeu
        if (status === "passed") {
            await this.userEventsService.addEvent(
                userId,
                "game_completed",
                `Jeu ${gameId} du ${new Date(
                    gameDate
                ).toLocaleDateString()}  terminé avec succès en ${attempts} essais (${score} points)`
            );
        } else if (status === "failed") {
            await this.userEventsService.addEvent(
                userId,
                "game_failed",
                `Jeu ${gameId} échoué`
            );
        } else {
            await this.userEventsService.addEvent(
                userId,
                "game_completed_old",
                `Jeu ${gameId} du ${new Date(
                    gameDate
                ).toLocaleDateString()} terminé avec succès en ${attempts} essais (aucun points)`
            );
        }

        // Gérer d'autres événements
        await this.handleGameEvents(userId, gameId, score);

        return gameResult;
    }

    async handleGameEvents(userId: number, gameId: number, score: number) {
        // 1️⃣ Premier jeu joué ?
        const existingGameResult = await prisma.gameResult.findFirst({
            where: { userId, gameId },
        });

        if (!existingGameResult) {
            await this.userEventsService.addEvent(
                userId,
                "first_time_game",
                `Première partie du jeu ${gameId} terminée`
            );
        }

        // 2️⃣ Nouveau record battu ?
        const bestScore = await prisma.gameResult.findFirst({
            where: { userId, gameId },
            orderBy: { score: "desc" },
        });

        if (!bestScore || score > bestScore.score) {
            await this.userEventsService.addEvent(
                userId,
                "high_score",
                `Nouveau record dans le jeu ${gameId}: ${score} points`
            );
        }
    }

    private calculateLevel(
        xpTotal: number
    ): { level: number; xpToNextLevel: number } {
        const baseXP = 50;
        const factor = 10;
        let level = 1;
        let xpRequired = baseXP * level ** 2 + factor * level;

        while (xpTotal >= xpRequired) {
            xpTotal -= xpRequired;
            level++;
            xpRequired = baseXP * level ** 2 + factor * level;
        }

        return { level, xpToNextLevel: xpRequired - xpTotal };
    }

    // Calcul de l'XP et des streaks
    async calculateXPAndStreak(userId: number, score: number, gameId: number) {
        const userStats = await prisma.userStats.findUnique({
            where: { userId },
        });
        if (!userStats) throw new RpcException("Utilisateur non trouvé");

        // Calcul du streak (réinitialisation si plus d'un jour)
        const today = new Date();
        const lastPlayed = userStats.lastPlayedAt
            ? new Date(userStats.lastPlayedAt)
            : null;

        let newStreak = userStats.streak;

        if (lastPlayed) {
            const lastPlayedDay = new Date(
                lastPlayed.getFullYear(),
                lastPlayed.getMonth(),
                lastPlayed.getDate()
            );
            const todayDay = new Date(
                today.getFullYear(),
                today.getMonth(),
                today.getDate()
            );

            const diffDays = Math.floor(
                (todayDay.getTime() - lastPlayedDay.getTime()) /
                    (1000 * 60 * 60 * 24)
            );

            if (diffDays === 1) newStreak++;
            // Joué consécutivement
            else if (diffDays > 1) newStreak = 1; // Reset si plus d'un jour d'écart
        } else {
            newStreak = 1; // Premier jour
        }

        // Calcul de l'XP (par exemple, multiplier par le streak)
        const streakMultiplier = Math.min(1 + newStreak * 0.1, 2); // Limiter à x2
        const finalXP = Math.floor(score * streakMultiplier);

        return { finalXP, newStreak };
    }
}
