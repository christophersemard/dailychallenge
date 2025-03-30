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
            select: { id: true, pseudo: true, userStats: true },
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
            select: { id: true, pseudo: true, userStats: true },
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
        console.log(
            "getGameLeaderboard",
            gameId,
            limit,
            offset,
            dateStart,
            dateEnd
        );
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
            select: { id: true, pseudo: true, userStats: true }, // Sélectionner les infos utiles
        });

        // 3️⃣ Associer les utilisateurs aux scores
        return groupedResults.map((result) => ({
            user: users.find((u) => u.id === result.userId), // Associer chaque user
            score: result._sum.score,
            xpGained: result._sum.xpGained,
        }));
    }

    async getFriendsLeaderboard(
        userId: number, // ID de l'utilisateur pour récupérer ses amis
        limit: number,
        offset: number,
        dateStart?: Date,
        dateEnd?: Date
    ) {
        // 1️⃣ Récupérer les amis de l'utilisateur
        const friends = await prisma.friend.findMany({
            where: {
                OR: [
                    { userId: Number(userId) }, // Amis de l'utilisateur
                    { friendId: Number(userId) }, // L'utilisateur dans la relation inverse
                ],
                status: "accepted", // Amis acceptés seulement
            },
            select: {
                userId: true,
                friendId: true,
            },
        });

        // 2️⃣ Extraire les ids des amis
        const friendIds = friends.map((friend) =>
            friend.userId === Number(userId) ? friend.friendId : friend.userId
        );

        // Ajouter l'utilisateur lui-même à la liste des amis
        friendIds.push(Number(userId));

        // 3️⃣ Regrouper les scores par joueur parmi les amis
        const groupedResults = await prisma.gameResult.groupBy({
            by: ["userId"],
            _sum: { score: true, xpGained: true },
            where: {
                userId: { in: friendIds },
                date: {
                    gte: dateStart || undefined,
                    lte: dateEnd || undefined,
                },
            },
            orderBy: { _sum: { score: "desc" } },
            take: Number(limit),
            skip: Number(offset),
        });

        // 4️⃣ Récupérer les utilisateurs correspondants
        const userIds = groupedResults.map((result) => result.userId);
        const users = await prisma.user.findMany({
            where: { id: { in: userIds } },
            select: { id: true, pseudo: true, userStats: true }, // Sélectionner les infos utiles
        });

        // 5️⃣ Associer les utilisateurs à leur score et XP total
        return groupedResults.map((result) => ({
            user: users.find((u) => u.id === result.userId),
            score: result._sum.score,
            xpGained: result._sum.xpGained,
        }));
    }

    async getCategoryFriendsLeaderboard(
        userId: number, // ID de l'utilisateur pour récupérer ses amis
        categoryId: number, // ID de la catégorie du jeu
        limit: number,
        offset: number,
        dateStart?: Date,
        dateEnd?: Date
    ) {
        // 1️⃣ Récupérer les amis de l'utilisateur
        const friends = await prisma.friend.findMany({
            where: {
                OR: [
                    { userId: Number(userId) }, // Amis de l'utilisateur
                    { friendId: Number(userId) }, // L'utilisateur dans la relation inverse
                ],
                status: "accepted", // Amis acceptés seulement
            },
            select: {
                userId: true,
                friendId: true,
            },
        });

        // 2️⃣ Extraire les ids des amis
        const friendIds = friends.map((friend) =>
            friend.userId === Number(userId) ? friend.friendId : friend.userId
        );

        // Ajouter l'utilisateur lui-même à la liste des amis
        friendIds.push(Number(userId));

        // 3️⃣ Regrouper les scores par joueur dans la catégorie spécifique
        const groupedResults = await prisma.gameResult.groupBy({
            by: ["userId"],
            _sum: { score: true, xpGained: true },
            where: {
                userId: { in: friendIds },
                game: { gameCategoryId: Number(categoryId) }, // Filtrer par catégorie de jeu
                date: {
                    gte: dateStart || undefined,
                    lte: dateEnd || undefined,
                },
            },
            orderBy: { _sum: { score: "desc" } },
            take: Number(limit),
            skip: Number(offset),
        });

        // 4️⃣ Récupérer les utilisateurs correspondants
        const userIds = groupedResults.map((result) => result.userId);
        const users = await prisma.user.findMany({
            where: { id: { in: userIds } },
            select: { id: true, pseudo: true, userStats: true },
        });

        // 5️⃣ Associer les utilisateurs à leur score et XP total
        return groupedResults.map((result) => ({
            user: users.find((u) => u.id === result.userId),
            score: result._sum.score,
            xpGained: result._sum.xpGained,
        }));
    }

    async getGameFriendsLeaderboard(
        userId: number, // ID de l'utilisateur pour récupérer ses amis
        gameId: number, // ID du jeu spécifique
        limit: number,
        offset: number,
        dateStart?: Date,
        dateEnd?: Date
    ) {
        // 1️⃣ Récupérer les amis de l'utilisateur
        const friends = await prisma.friend.findMany({
            where: {
                OR: [
                    { userId: Number(userId) }, // Amis de l'utilisateur
                    { friendId: Number(userId) }, // L'utilisateur dans la relation inverse
                ],
                status: "accepted", // Amis acceptés seulement
            },
            select: {
                userId: true,
                friendId: true,
            },
        });

        // 2️⃣ Extraire les ids des amis
        const friendIds = friends.map((friend) =>
            friend.userId === Number(userId) ? friend.friendId : friend.userId
        );

        // Ajouter l'utilisateur lui-même à la liste des amis
        friendIds.push(Number(userId));

        // 3️⃣ Regrouper les scores par joueur pour ce jeu spécifique
        const groupedResults = await prisma.gameResult.groupBy({
            by: ["userId"],
            _sum: { score: true, xpGained: true },
            where: {
                userId: { in: friendIds },
                gameId: Number(gameId), // Filtrer par jeu spécifique
                date: {
                    gte: dateStart || undefined,
                    lte: dateEnd || undefined,
                },
            },
            orderBy: { _sum: { score: "desc" } },
            take: Number(limit),
            skip: Number(offset),
        });

        // 4️⃣ Récupérer les utilisateurs correspondants
        const userIds = groupedResults.map((result) => result.userId);
        const users = await prisma.user.findMany({
            where: { id: { in: userIds } },
            select: { id: true, pseudo: true, userStats: true },
        });

        // 5️⃣ Associer les utilisateurs à leur score et XP total
        return groupedResults.map((result) => ({
            user: users.find((u) => u.id === result.userId),
            score: result._sum.score,
            xpGained: result._sum.xpGained,
        }));
    }
}
