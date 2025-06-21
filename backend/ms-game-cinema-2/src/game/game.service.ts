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

const GAME_ID = 4; // ID du jeu cinéma 2
const BASE_MAX_ATTEMPTS = 10;

@Injectable()
export class GameService {
    constructor(@Inject("USERS_SERVICE") private usersClient: ClientProxy) {}

    async getTodayGame(userId: number) {
        const today = new Date().toISOString().split("T")[0];
        return this.getGameByDate(userId, today);
    }

    async getGameByDate(userId: number, date: string) {
        const game = await prisma.gameCinema2Days.findUnique({
            where: { date: new Date(date) },
            include: { movie: true },
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

        const attempts = await prisma.gameCinema2Tries.findMany({
            where: { userId, dayId: game.id },
        });

        const maxAttempts = BASE_MAX_ATTEMPTS + (vipProfile?.extraAttempt ?? 0);

        const hints = await this.getHints(userId, game.id, attempts.length);

        return {
            guessed: !!gameResult,
            date: game.date,
            hints: hints.hints,
            lastHintUnlocked: hints.lastHintUnlocked,
            maskedTitle: this.getMaskedTitle(game.movie.title),
            attempts: attempts.length,
            maxAttempts,
            data: gameResult ? game.movie : null,
            gameResult: gameResult || null,
            tries: attempts,
        };
    }

    async submitGuess(userId: number, guess: string, date?: string) {
        const gameDate = date ? new Date(date) : new Date();

        const game = await prisma.gameCinema2Days.findFirst({
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
            include: { movie: true },
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

        const existingTries = await prisma.gameCinema2Tries.count({
            where: { userId, dayId: game.id },
        });

        const vipProfile = await this.getUserVipProfile(userId);
        const maxAttempts = BASE_MAX_ATTEMPTS + (vipProfile?.extraAttempt ?? 0);

        if (existingTries >= maxAttempts) {
            throw new NotFoundException("Nombre maximal d'essais atteint.");
        }

        const formattedGuess = Number(guess);
        const correct = game.movie.id === formattedGuess;

        const movieGuessed = await prisma.dataMovie.findUnique({
            where: { id: formattedGuess },
        });

        await prisma.gameCinema2Tries.create({
            data: {
                userId,
                dayId: game.id,
                guess: movieGuessed?.title || "",
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
                data: game.movie,
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
        const game = await prisma.gameCinema2Days.findUnique({
            where: { id: dayId },
            include: { movie: true },
        });
        if (!game)
            throw new NotFoundException("Aucun jeu trouvé pour cette date.");

        const hintsData = {
            image1: game.movie.image1,
            image2: attempts > 0 ? game.movie.image2 : null,
            image3: attempts > 1 ? game.movie.image3 : null,
            image4: attempts > 2 ? game.movie.image4 : null,
            image5: attempts > 3 ? game.movie.image5 : null,
            image6: attempts > 4 ? game.movie.image6 : null,
            image7: attempts > 5 ? game.movie.image7 : null,
            image8: attempts > 6 ? game.movie.image8 : null,
            image9: attempts > 7 ? game.movie.image9 : null,
            image10: attempts > 8 ? game.movie.image10 : null,
            firstAndLastLetters:
                attempts > 9
                    ? `${game.movie.title[0]}${
                          game.movie.title[game.movie.title.length - 1]
                      }`
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

    async searchMovie(query: string) {
        const movies = await prisma.dataMovie.findMany({
            where: {
                OR: [
                    { title: { contains: query, mode: "insensitive" } },
                    { originalTitle: { contains: query, mode: "insensitive" } },
                ],
            },
            select: {
                id: true,
                title: true,
                originalTitle: true,
                releaseDate: true,
            },
            orderBy: {
                title: "asc",
            },
        });

        // On retourne la liste des films trouvés, mais on ajoute l'année de sortie uniquement si le film a le même nom qu'un autre film de la liste
        const movieTitles = movies.map((movie) => movie.title);
        const duplicateTitles = movieTitles.filter(
            (title, index) => movieTitles.indexOf(title) !== index
        );
        return movies.map((movie) => {
            if (duplicateTitles.includes(movie.title)) {
                return {
                    id: movie.id,
                    name: movie.title,
                    originalName: movie.originalTitle,
                    otherInfo: new Date(movie.releaseDate)
                        .getFullYear()
                        .toString(),
                };
            } else {
                return {
                    id: movie.id,
                    name: movie.title,
                    originalName: movie.originalTitle,
                    otherInfo: null, // Pas d'année de sortie pour les titres uniques
                };
            }
        });
    }

    async getGameResult(userId: number, date?: string) {
        const gameDate = date ? new Date(date) : new Date(); // ✅ Si pas de date, on prend aujourd'hui

        // ✅ Vérifier si un jeu existe pour cette date
        const game = await prisma.gameCinema2Days.findFirst({
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
        const gamesInMonth = await prisma.gameCinema2Days.findMany({
            where: {
                date: {
                    gte: startDate,
                    lte: endDate,
                },
            },
            include: { movie: true },
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

            const movie = result
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
                guess: movie ? movie.movie.title : null,
            };
        });

        return resultsByDay;
    }
}
