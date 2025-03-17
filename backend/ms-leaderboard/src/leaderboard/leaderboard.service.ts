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
        return prisma.gameResult.groupBy({
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
    }

    async getCategoryLeaderboard(
        category: number,
        limit: number,
        offset: number,
        dateStart?: Date,
        dateEnd?: Date
    ) {
        return prisma.gameResult.groupBy({
            by: ["userId"],
            where: {
                game: { gameCategoryId: category },
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
    }

    async getGameLeaderboard(
        gameId: number,
        limit: number,
        offset: number,
        dateStart?: Date,
        dateEnd?: Date
    ) {
        return prisma.gameResult.findMany({
            where: {
                gameId,
                date: {
                    gte: dateStart || undefined,
                    lte: dateEnd || undefined,
                },
            },
            orderBy: { score: "desc" },
            take: Number(limit),
            skip: Number(offset),
            include: { user: true },
        });
    }
}
