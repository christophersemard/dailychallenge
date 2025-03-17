import { Injectable } from "@nestjs/common";
import prisma from "../prisma/prisma.service";

@Injectable()
export class LeaderboardService {
    async getGlobalLeaderboard(
        limit: number,
        offset: number,
        dateStart?: Date,
        dateEnd?: Date
    ) {
        // 1️⃣ Regrouper les scores par joueur
        const groupedResults = await prisma.gameResult.groupBy({
            by: ["userId"],
            _sum: { score: true, xpGained: true },
            where: {
                date: {
                    gte: dateStart || undefined,
                    lte: dateEnd || undefined,
                },
            },
            orderBy: { _sum: { score: "desc" } },
            take: Number(limit),
            skip: Number(offset),
        });

        // 2️⃣ Récupérer les utilisateurs correspondants
        const userIds = groupedResults.map((result) => result.userId);
        const users = await prisma.user.findMany({
            where: { id: { in: userIds } },
            select: { id: true, email: true, userStats: true },
        });

        // 3️⃣ Associer chaque utilisateur à son score total
        return groupedResults.map((result) => ({
            user: users.find((u) => u.id === result.userId),
            score: result._sum.score,
            xpGained: result._sum.xpGained,
        }));
    }

    async getCategoryLeaderboard(
        category: number,
        limit: number,
        offset: number,
        dateStart?: Date,
        dateEnd?: Date
    ) {
        // 1️⃣ Regrouper les scores par joueur dans la catégorie
        const groupedResults = await prisma.gameResult.groupBy({
            by: ["userId"],
            where: {
                game: { gameCategoryId: Number(category) },
                date: {
                    gte: dateStart || undefined,
                    lte: dateEnd || undefined,
                },
            },
            _sum: { score: true, xpGained: true },
            orderBy: { _sum: { score: "desc" } },
            take: Number(limit),
            skip: Number(offset),
        });

        // 2️⃣ Récupérer les utilisateurs correspondants
        const userIds = groupedResults.map((result) => result.userId);
        const users = await prisma.user.findMany({
            where: { id: { in: userIds } },
            select: { id: true, email: true, userStats: true },
        });

        // 3️⃣ Associer chaque utilisateur à son score total
        return groupedResults.map((result) => ({
            user: users.find((u) => u.id === result.userId),
            score: result._sum.score,
            xpGained: result._sum.xpGained,
        }));
    }

    async getGameLeaderboard(
        gameId: number,
        limit: number,
        offset: number,
        dateStart?: Date,
        dateEnd?: Date
    ) {
        // 1️⃣ Regrouper les scores par joueur
        const groupedResults = await prisma.gameResult.groupBy({
            by: ["userId"],
            _sum: { score: true, xpGained: true },
            where: {
                gameId: Number(gameId),
                date: {
                    gte: dateStart || undefined,
                    lte: dateEnd || undefined,
                },
            },
            orderBy: { _sum: { score: "desc" } },
            take: Number(limit),
            skip: Number(offset),
        });

        // 2️⃣ Récupérer les infos des utilisateurs correspondants
        const userIds = groupedResults.map((result) => result.userId);
        const users = await prisma.user.findMany({
            where: { id: { in: userIds } },
            select: { id: true, email: true, userStats: true }, // Sélectionner les infos utiles
        });

        // 3️⃣ Associer les utilisateurs aux scores
        return groupedResults.map((result) => ({
            user: users.find((u) => u.id === result.userId), // Associer chaque user
            score: result._sum.score,
            xpGained: result._sum.xpGained,
        }));
    }
}
