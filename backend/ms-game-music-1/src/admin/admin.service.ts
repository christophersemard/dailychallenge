import { Injectable } from "@nestjs/common";
import prisma from "../prisma/prisma.service";

const GAME_ID = 5; // Identifiant du jeu GameCinema1

@Injectable()
export class AdminService {
    // ✅ Génère un GameMusic1Day pour chaque jour entre `startDate` et `endDate`
    async generateGameDays(startDate: string, endDate: string) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        const current = new Date(start);

        while (current <= end) {
            await this.regenerateGameDay(current.toISOString().split("T")[0]);
            current.setDate(current.getDate() + 1);
        }

        return { message: `Jeux générés entre ${startDate} et ${endDate}` };
    }

    // ✅ Retourne les jours avec et sans film
    async getGameDaysStatus(month: string) {
        const start = new Date(`${month}-01`);
        const end = new Date(start);
        end.setMonth(start.getMonth() + 1, 0); // Dernier jour du mois

        const existingDays = await prisma.gameMusic1Days.findMany({
            where: {
                date: {
                    gte: start,
                    lte: end,
                },
            },
            select: { date: true },
        });

        const existingDates = existingDays.map(
            (d) => d.date.toISOString().split("T")[0]
        );
        const allDates = Array.from(
            { length: end.getDate() },
            (_, i) =>
                new Date(start.getFullYear(), start.getMonth(), i + 1)
                    .toISOString()
                    .split("T")[0]
        );

        return {
            upcoming: existingDates,
            missingDays: allDates.filter((d) => !existingDates.includes(d)),
        };
    }

    // ✅ Régénérer un jour spécifique
    async regenerateGameDay(date: string) {
        // Vérifier si un jeu existe déjà ce jour-là
        await prisma.gameMusic1Days.deleteMany({
            where: { date: new Date(date) },
        });

        // Sélectionner un film aléatoire qui n'a pas été utilisé récemment
        const recentArtists = await prisma.gameMusic1Days.findMany({
            orderBy: { date: "desc" },
            take: 90, // 3 mois d'historique
            select: { artistId: true },
        });

        const usedArtistIds = recentArtists.map((m) => m.artistId);

        // On doit exclure les artistes qui ont une propriété keywords à "" en plus de ceux qui ont été utilisés récemment
        const availableArtists = await prisma.dataArtist.findMany({
            where: {
                AND: [
                    { songs: { some: {} } },
                    { id: { notIn: usedArtistIds } },
                ],
            },
        });

        if (availableArtists.length === 0) {
            throw new Error("Pas assez d'artistes disponibles !");
        }

        const randomArtist =
            availableArtists[
                Math.floor(Math.random() * availableArtists.length)
            ];

        await prisma.gameMusic1Days.create({
            data: {
                date: new Date(date),
                artistId: randomArtist.id,
            },
        });

        return { message: `Artiste ${randomArtist.name} assigné au ${date}` };
    }

    async updateGameStatus(status: string) {
        await prisma.game.update({
            where: { id: GAME_ID },
            data: { status },
        });

        return { message: `Statut du jeu mis à jour : ${status}` };
    }
}
