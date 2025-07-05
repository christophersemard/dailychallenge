import {
    BadRequestException,
    ConflictException,
    Inject,
    Injectable,
    NotFoundException,
} from "@nestjs/common";
import prisma from "../prisma/prisma.service";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";

const GAME_ID = 5; // ID du jeu music 1
const BASE_MAX_ATTEMPTS = 10;

@Injectable()
export class GameService {
    constructor(@Inject("USERS_SERVICE") private usersClient: ClientProxy) {}

    async getTodayGame(userId: number) {
        const today = new Date().toISOString().split("T")[0];
        return this.getGameByDate(userId, today);
    }

    async getGameByDate(userId: number, date: string) {
        const game = await prisma.gameMusic1Days.findUnique({
            where: { date: new Date(date) },
            include: { artist: { include: { songs: true } } },
        });
        if (!game)
            throw new NotFoundException("Aucun jeu trouvé pour cette date.");

        const now = new Date();
        const dateOnly = new Date(date);
        dateOnly.setHours(0, 0, 0, 0);
        const todayOnly = new Date();
        todayOnly.setHours(0, 0, 0, 0);
        const vipProfile = await this.getUserVipProfile(userId);

        if (dateOnly.getTime() !== todayOnly.getTime()) {
            if (!vipProfile.isVip) {
                throw new BadRequestException(
                    "Tu dois être VIP pour jouer aux jours précédents."
                );
            }
        }
        const gameResult = await prisma.gameResult.findFirst({
            where: { userId, gameId: GAME_ID, date: game.date },
        });

        const attempts = await prisma.gameMusic1Tries.findMany({
            where: { userId, dayId: game.id },
        });

        const maxAttempts = BASE_MAX_ATTEMPTS + (vipProfile?.extraAttempt ?? 0);

        const hints = await this.getHints(userId, game.id, attempts.length);

        return {
            guessed: !!gameResult,
            date: game.date,
            hints: hints.hints,
            lastHintUnlocked: hints.lastHintUnlocked,
            attempts: attempts.length,
            maxAttempts,
            data: gameResult ? game.artist : null,
            gameResult: gameResult || null,
            tries: attempts,
        };
    }

    async submitGuess(userId: number, guess: string, date?: string) {
        const gameDate = date ? new Date(date) : new Date();

        const game = await prisma.gameMusic1Days.findFirst({
            where: {
                date: {
                    gte: new Date(gameDate.toDateString()),
                    lt: new Date(
                        gameDate.getFullYear(),
                        gameDate.getMonth(),
                        gameDate.getDate() + 1
                    ),
                },
            },
            include: {
                artist: {
                    include: {
                        songs: true,
                    },
                },
            },
        });

        if (!game)
            throw new NotFoundException("Aucun jeu trouvé pour cette date.");

        const now = new Date();
        const dateOnly = new Date(game.date);
        dateOnly.setHours(0, 0, 0, 0);
        const todayOnly = new Date();
        todayOnly.setHours(0, 0, 0, 0);

        if (dateOnly.getTime() !== todayOnly.getTime()) {
            const vipProfile = await this.getUserVipProfile(userId);

            if (!vipProfile.isVip) {
                throw new BadRequestException(
                    "Tu dois être VIP pour jouer aux jours précédents."
                );
            }
        }

        const gameResult = await prisma.gameResult.findFirst({
            where: {
                userId,
                gameId: GAME_ID,
                date: {
                    gte: new Date(gameDate.toDateString()),
                    lt: new Date(
                        gameDate.getFullYear(),
                        gameDate.getMonth(),
                        gameDate.getDate() + 1
                    ),
                },
            },
        });

        if (gameResult)
            throw new ConflictException("Vous avez déjà trouvé pour ce jour.");

        const existingTries = await prisma.gameMusic1Tries.count({
            where: { userId, dayId: game.id },
        });

        const vipProfile = await this.getUserVipProfile(userId);
        const maxAttempts = BASE_MAX_ATTEMPTS + (vipProfile?.extraAttempt ?? 0);

        if (existingTries >= maxAttempts) {
            throw new NotFoundException("Nombre maximal d'essais atteint.");
        }

        const correct = game.artist.id === guess;

        const artistGuessed = await prisma.dataArtist.findUnique({
            where: { id: guess },
        });

        await prisma.gameMusic1Tries.create({
            data: {
                userId,
                dayId: game.id,
                guess: artistGuessed?.name || "",
                correct,
            },
        });

        const currentAttempts = existingTries + 1;

        if (correct || currentAttempts >= maxAttempts) {
            const status = correct ? "passed" : "failed";

            const result = await lastValueFrom(
                this.usersClient.send("record_game_result", {
                    userId,
                    gameId: GAME_ID,
                    attempts: currentAttempts,
                    maxAttempts,
                    status,
                    gameDate: game.date,
                })
            );

            return {
                lastGuessed: correct,
                hints: (await this.getHints(userId, game.id, currentAttempts))
                    .hints,
                newHint: null,
                attempts: currentAttempts,
                maxAttempts,
                data: game.artist,
                result,
            };
        }

        const hints = await this.getHints(userId, game.id, currentAttempts);
        return {
            lastGuessed: false,
            hints: hints.hints,
            newHint: hints.lastHintUnlocked,
            attempts: currentAttempts,
            maxAttempts,
            data: null,
        };
    }

    private async getUserVipProfile(
        userId: number
    ): Promise<{ isVip: boolean; extraAttempt: number }> {
        try {
            const data = await lastValueFrom(
                this.usersClient.send("get_user_profile", userId)
            );

            if (!data) return { isVip: false, extraAttempt: 0 };
            if (
                data.vip?.status === "active" ||
                data.vip?.status === "cancelled"
            ) {
                return { isVip: true, extraAttempt: 1 };
            }
            return { isVip: false, extraAttempt: 0 };
        } catch {
            return { isVip: false, extraAttempt: 0 };
        }
    }

    private async getHints(userId: number, dayId: number, attempts: number) {
        const game = await prisma.gameMusic1Days.findUnique({
            where: { id: dayId },
            include: { artist: { include: { songs: true } } },
        });

        if (!game)
            throw new NotFoundException("Aucun jeu trouvé pour cette date.");

        const a = game.artist;
        const hintsData = {
            type: a.type, // "Person" ou "Group"
            country: attempts > 0 ? a.country || null : null,
            membersOrGenre:
                attempts > 1
                    ? a.type === "Group"
                        ? a.members.length.toString() + " membres"
                        : a.mainGenres[0] || null
                    : null,
            ageOrDeath:
                attempts > 2
                    ? a.isDead
                        ? a.startDate
                            ? `Mort (${a.startDate.getFullYear()})`
                            : "Mort"
                        : a.startDate
                        ? `${
                              new Date().getFullYear() -
                              a.startDate.getFullYear()
                          } ans`
                        : null
                    : null,
            firstAlbum:
                attempts > 3 && a.firstAlbumDate
                    ? `${a.firstAlbumDate.getFullYear()}`
                    : null,
            genres: attempts > 4 ? a.mainGenres.join(", ") || null : null,
            fans:
                attempts > 5 ? `${a.deezerFans?.toLocaleString()} fans` : null,
            albumsCount:
                attempts > 6
                    ? `${(a.albumsJson as any[])?.length || 0} albums`
                    : null,
            song1: attempts > 7 ? a.songs?.[0]?.title || null : null,
            song2and3:
                attempts > 8
                    ? [a.songs?.[1]?.title, a.songs?.[2]?.title]
                          .filter(Boolean)
                          .join(" / ") || null
                    : null,
        };

        const hintsKeys = Object.keys(hintsData);

        return {
            hints: hintsData,
            lastHintUnlocked:
                attempts < hintsKeys.length ? hintsKeys[attempts] : null,
        };
    }

    private getMaskedTitle(title: string): string {
        return title
            .split("")
            .map((char) => (char.match(/[a-zA-ZÀ-ÿ0-9]/i) ? "*" : char))
            .join("");
    }

    async searchArtist(query: string) {
        const artists = await prisma.dataArtist.findMany({
            where: {
                OR: [
                    { name: { contains: query, mode: "insensitive" } },
                    { aliases: { hasSome: [query] } },
                ],
            },
            select: {
                id: true,
                name: true,
            },
            orderBy: {
                name: "asc",
            },
        });

        return artists.map((artist) => ({
            id: artist.id,
            name: artist.name,
        }));
    }

    async getGameResult(userId: number, date?: string) {
        const gameDate = date ? new Date(date) : new Date(); // ✅ Si pas de date, on prend aujourd'hui

        // ✅ Vérifier si un jeu existe pour cette date
        const game = await prisma.gameMusic1Days.findFirst({
            where: {
                date: {
                    gte: new Date(
                        gameDate.getFullYear(),
                        gameDate.getMonth(),
                        gameDate.getDate()
                    ),
                    lt: new Date(
                        gameDate.getFullYear(),
                        gameDate.getMonth(),
                        gameDate.getDate() + 1
                    ),
                },
            },
        });

        if (!game) {
            throw new NotFoundException("Aucun jeu trouvé pour cette date.");
        }

        // ✅ Vérifier si le joueur a un résultat pour ce jour-là
        const gameResult = await prisma.gameResult.findFirst({
            where: { userId: Number(userId), gameId: game.id, date: gameDate },
        });

        if (!gameResult) {
            throw new NotFoundException("Aucun résultat trouvé pour ce jour.");
        }

        return gameResult;
    }

    async getUserResultsByMonth(userId: number, month: string) {
        const date = new Date(`${month}-01`);
        const startDate = new Date(date.getFullYear(), date.getMonth(), 1);
        const endDate = new Date(date.getFullYear(), date.getMonth() + 1, 0);

        // On récupère tous les résultats de l'utilisateur sur le jeu cinéma 1 pour le mois donné
        const results = await prisma.gameResult.findMany({
            where: {
                userId,
                gameId: GAME_ID,
                date: {
                    gte: startDate,
                    lte: endDate,
                },
            },
            orderBy: { date: "asc" },
        });

        // On récupère tous les jeux du mois donné
        const gamesInMonth = await prisma.gameMusic1Days.findMany({
            where: {
                date: {
                    gte: startDate,
                    lte: endDate,
                },
            },
            include: { artist: true },
        });

        // On crée un tableau avec chaque jour du mois et on y associe son résultat ou null
        const daysInMonth = new Date(
            date.getFullYear(),
            date.getMonth() + 1,
            0
        ).getDate();

        const resultsByDay = Array.from({ length: daysInMonth }, (_, i) => {
            const day = new Date(date.getFullYear(), date.getMonth(), i + 1);

            const result = results.find(
                (res) =>
                    res.date.getDate() === day.getDate() &&
                    res.date.getMonth() === day.getMonth() &&
                    res.date.getFullYear() === day.getFullYear()
            );

            const artist = result
                ? gamesInMonth.find(
                      (game) =>
                          game.date.getDate() === day.getDate() &&
                          game.date.getMonth() === day.getMonth() &&
                          game.date.getFullYear() === day.getFullYear()
                  )
                : null;

            return {
                date: day,
                result: result || null,
                gameDay: gamesInMonth.find(
                    (game) =>
                        game.date.getDate() === day.getDate() &&
                        game.date.getMonth() === day.getMonth() &&
                        game.date.getFullYear() === day.getFullYear()
                )
                    ? true
                    : false,
                guess: artist ? artist.artist.name : null,
            };
        });

        return resultsByDay;
    }
}
