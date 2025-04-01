import { Injectable } from "@nestjs/common";
import prisma from "../prisma/prisma.service";
import { UserEventsService } from "../user-events/user-events.service"; // Pour gérer les événements
import { RpcException } from "@nestjs/microservices";

@Injectable()
export class UserGameService {
    constructor(private userEventsService: UserEventsService) {}

    // Processus principal pour enregistrer le résultat du jeu
    async processGameResult(
        userId: number,
        gameId: number,
        attempts: number,
        maxAttempts: number,
        status: "passed" | "failed",
        gameDate: Date
    ) {
        // Vérifier que le jeu existe
        if (!gameId) throw new RpcException("Jeu non trouvé");
        const game = await prisma.game.findUnique({ where: { id: gameId } });
        if (!game) throw new RpcException("Jeu non trouvé");

        const { score, scoreIfToday, isSameDay } = await this.calculateScore(
            attempts,
            maxAttempts,
            status,
            new Date(gameDate)
        );
        const { finalXP, newStreak } = await this.calculateXPAndStreak(
            userId,
            isSameDay ? score : scoreIfToday,
            gameId,
            new Date(gameDate),
            status
        );
        // Enregistrer le résultat du jeu
        const gameResult = await this.saveGameResult(
            userId,
            gameId,
            score,
            finalXP,
            status,
            new Date(gameDate)
        );
        // Mise à jour des statistiques de l'utilisateur
        await this.updateUserStats(userId, finalXP, newStreak, gameDate);

        // Gérer l'événement de niveau si nécessaire
        await this.handleLevelUpEvent(userId, gameId, gameResult);

        // Gérer les événements supplémentaires
        await this.handleGameEvents(
            userId,
            gameId,
            score,
            attempts,
            maxAttempts,
            status,
            new Date(gameDate)
        );

        return gameResult;
    }

    // Calcul du score basé sur les essais
    public async calculateScore(
        attempts: number,
        maxAttempts: number,
        status: "passed" | "failed",
        gameDate: Date
    ) {
        let score = 0;
        let scoreIfToday = 0;
        const today = new Date(
            new Date().getTime() - new Date().getTimezoneOffset() * 60000
        );
        const gameDateObj = new Date(gameDate);
        const isSameDay =
            today.getDate() === gameDateObj.getDate() &&
            today.getMonth() === gameDateObj.getMonth() &&
            today.getFullYear() === gameDateObj.getFullYear();

        if (status === "passed" && isSameDay) {
            if (attempts === 1) {
                score = 100;
            } else {
                score = Math.max(
                    100 - Math.floor((attempts / maxAttempts) * 100),
                    30 // Minimum de 30 points si plusieurs essais
                );
            }
        }
        if (status === "passed" && !isSameDay) {
            if (attempts === 1) {
                scoreIfToday = 100;
            } else {
                scoreIfToday = Math.max(
                    100 - Math.floor((attempts / maxAttempts) * 100),
                    30 // Minimum de 30 points si plusieurs essais
                );
            }
        }

        return { score, scoreIfToday, isSameDay };
    }

    // Calcul de l'XP et du streak
    public async calculateXPAndStreak(
        userId: number,
        score: number,
        gameId: number,
        gameDate: Date,
        status: "passed" | "failed"
    ) {
        const userStats = await prisma.userStats.findUnique({
            where: { userId },
        });
        if (!userStats) throw new RpcException("Utilisateur non trouvé");

        const today = new Date(
            new Date().getTime() - new Date().getTimezoneOffset() * 60000
        );
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

            if (diffDays === 1 && status === "passed" && score > 0) {
                newStreak++;
            } else if (diffDays > 1) {
                if (
                    gameDate.toLocaleDateString() ===
                        today.toLocaleDateString() &&
                    status === "passed" &&
                    score > 0
                ) {
                    newStreak = 1; // Réinitialiser si ce n'est pas le jeu du jour
                } else {
                    newStreak = 0; // Réinitialiser complètement si plus d'un jour
                }
            }
        } else {
            newStreak = 1; // Premier jour
        }

        const streakMultiplier = Math.min(1 + newStreak * 0.1, 2); // Limiter à x2
        const baseXP = 20;
        let finalXP = Math.max(score * streakMultiplier, baseXP);

        // Si ce n'est pas le même jour, l'xp gagnée est réduite de moitié
        if (gameDate.toLocaleDateString() != today.toLocaleDateString()) {
            finalXP = Math.floor(finalXP / 2);
        }

        return { finalXP, newStreak };
    }

    // Enregistrer un résultat de jeu dans la base de données
    public async saveGameResult(
        userId: number,
        gameId: number,
        score: number,
        finalXP: number,
        status: "passed" | "failed",
        gameDate: Date
    ) {
        return prisma.gameResult.create({
            data: {
                userId,
                gameId,
                score,
                xpGained: finalXP,
                status,
                date: gameDate,
            },
        });
    }

    // Mise à jour des statistiques de l'utilisateur
    public async updateUserStats(
        userId: number,
        finalXP: number,
        newStreak: number,
        gameDate: Date
    ) {
        return prisma.userStats.update({
            where: { userId },
            data: {
                xp: { increment: finalXP },
                streak: newStreak,
                lastPlayedAt: gameDate,
            },
        });
    }

    // Gérer l'événement de niveau si nécessaire
    public async handleLevelUpEvent(
        userId: number,
        gameId: number,
        gameResult: any
    ) {
        const { level } = this.calculateLevel(gameResult.xpGained);
        const userStats = await prisma.userStats.findUnique({
            where: { userId },
        });

        if (level > userStats!.level) {
            await this.userEventsService.addEvent(
                userId,
                "level_up",
                `Nouveau niveau ${level} atteint !`
            );

            await prisma.userStats.update({
                where: { userId },
                data: { level },
            });
        }
    }

    // Gérer les autres événements
    public async handleGameEvents(
        userId: number,
        gameId: number,
        score: number,
        attempts: number,
        maxAttempts: number,
        status: "passed" | "failed",
        gameDate: Date
    ) {
        if (status === "passed") {
            await this.userEventsService.addEvent(
                userId,
                "game_completed",
                `Jeu ${gameId} du ${gameDate.toLocaleDateString()} terminé avec succès en ${attempts} essais (${score} points)`
            );
        } else if (status === "failed") {
            await this.userEventsService.addEvent(
                userId,
                "game_failed",
                `Jeu ${gameId} échoué`
            );
        }
    }

    // Calcul du niveau du joueur
    public calculateLevel(xpTotal: number): {
        level: number;
        xpToNextLevel: number;
    } {
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
}
