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

@Injectable()
export class GameService {
    constructor(@Inject("USERS_SERVICE") private usersClient: ClientProxy) {}

    async getTodayGame(userId: number) {
        const today = new Date().toISOString().split("T")[0];
        return this.getGameByDate(userId, today);
    }

    async getGameByDate(userId: number, date: string) {
        const game = await prisma.gameCinema1Days.findUnique({
            where: { date: new Date(date) },
            include: { movie: true },
        });

        if (!game) {
            throw new NotFoundException("Aucun jeu trouvé pour cette date.");
        }

        // ✅ Vérifier si le joueur a déjà trouvé en regardant GameResult
        const gameResult = await prisma.gameResult.findFirst({
            where: { userId, gameId: game.id, status: "passed" },
        });

        // ✅ Vérifier le nombre d'essais réalisés
        const attempts = await prisma.gameCinema1Tries.count({
            where: { userId, dayId: game.id },
        });

        const hints = await this.getHints(userId, game.id, attempts);

        return {
            guessed: !!gameResult, // ✅ Retourne true si GameResult existe avec status "passed"
            date: game.date,
            hints: hints.hints,
            lastHintUnlocked: hints.lastHintUnlocked,
            maskedTitle: this.getMaskedTitle(game.movie.title), // ✅ Spectre du nom du film
            attempts,
            maxAttempts: 10,
        };
    }

    async submitGuess(userId: number, guess: string, date?: string) {
        const gameDate = date ? new Date(date) : new Date(); // ✅ Si pas de date, on prend aujourd'hui

        // ✅ Vérifier si un jeu existe pour cette date
        const game = await prisma.gameCinema1Days.findFirst({
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
            include: { movie: true },
        });

        if (!game) {
            throw new NotFoundException("Aucun jeu trouvé pour cette date.");
        }

        // Vérifier si le joueur a déjà trouvé en regardant GameResult
        const gameResult = await prisma.gameResult.findFirst({
            where: {
                userId,
                gameId: 1,
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

        if (gameResult) {
            throw new ConflictException("Vous avez déjà trouvé pour ce jour.");
        }

        const existingTries = await prisma.gameCinema1Tries.count({
            where: { userId, dayId: game.id },
        });

        if (existingTries >= 10) {
            throw new NotFoundException("Nombre maximal d'essais atteint.");
        }

        // ✅ Vérifier si la réponse est correcte
        const formattedGuess = Number(guess);
        const correct = game.movie.id === formattedGuess;

        const movieGuessed = await prisma.dataMovie.findUnique({
            where: { id: formattedGuess },
        });

        // ✅ Enregistrer l'essai
        await prisma.gameCinema1Tries.create({
            data: {
                userId,
                dayId: game.id,
                guess: movieGuessed?.title || "",
                correct,
            },
        });

        // ✅ Enregistrer dans `GameResult` si le joueur trouve la réponse
        if (correct) {
            const result = await lastValueFrom(
                this.usersClient.send("record_game_result", {
                    userId,
                    gameId: 1,
                    attempts: existingTries + 1,
                    maxAttempts: 10,
                    status: "passed",
                    gameDate: new Date(game.date),
                })
            );

            return {
                lastGuessed: true,
                hints: await this.getHints(
                    userId,
                    game.id,
                    existingTries + 1
                ).then((h) => h.hints),
                newHint: null, // Pas utile ici car il a déjà trouvé
                attempts: existingTries + 1,
                maxAttempts: 10,
                data: game.movie,
                result, // On peut renvoyer le gameResult si tu veux l'afficher
            };
        } else {
            // Si le joueur a atteint le nombre maximal d'essais, retourner la réponse
            if (existingTries + 1 >= 10) {
                // ✅ Enregistrer dans `GameResult` si le joueur n'a pas trouvé la réponse

                const result = await lastValueFrom(
                    this.usersClient.send("record_game_result", {
                        userId,
                        gameId: 1,
                        attempts: existingTries + 1,
                        maxAttempts: 10,
                        status: "failed",
                        gameDate: new Date(game.date),
                    })
                );

                return {
                    lastGuessed: false,
                    hints: await this.getHints(
                        userId,
                        game.id,
                        existingTries + 1
                    ).then((h) => h.hints),
                    newHint: null, // Pas utile ici car il a déjà trouvé
                    attempts: existingTries + 1,
                    maxAttempts: 10,
                    data: game.movie,
                    result, // On peut renvoyer le gameResult si tu veux l'afficher
                };
            }

            let hints = await this.getHints(userId, game.id, existingTries + 1);
            return {
                lastGuessed: correct,
                hints: hints.hints,
                newHint: hints.lastHintUnlocked,
                attempts: existingTries + 1,
                maxAttempts: 10,
                data: correct ? game.movie : null,
            };
        }
    }

    async searchMovie(query: string) {
        return prisma.dataMovie.findMany({
            where: {
                OR: [
                    { title: { contains: query, mode: "insensitive" } },
                    { originalTitle: { contains: query, mode: "insensitive" } },
                ],
            },
            select: { id: true, title: true, originalTitle: true },
        });
    }

    async getGameResult(userId: number, date?: string) {
        const gameDate = date ? new Date(date) : new Date(); // ✅ Si pas de date, on prend aujourd'hui

        // ✅ Vérifier si un jeu existe pour cette date
        const game = await prisma.gameCinema1Days.findFirst({
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

    private async getHints(userId: number, dayId: number, attempts: number) {
        // ✅ Récupération du film lié à cette journée de jeu
        const game = await prisma.gameCinema1Days.findUnique({
            where: { id: dayId },
            include: { movie: true },
        });

        if (!game)
            throw new NotFoundException("Aucun jeu trouvé pour cette date.");

        // ✅ Liste des indices disponibles sous forme d'objet clé/valeur
        const hintsData = {
            genres: game.movie.genres,
            runtime: attempts > 0 ? game.movie.runtime : null,
            releaseDate: attempts > 1 ? game.movie.releaseDate : null,
            director: attempts > 2 ? game.movie.director : null,
            actors: attempts > 3 ? game.movie.actors : null,
            keywords: attempts > 4 ? game.movie.keywords : null,
            firstAndLastLetters:
                attempts > 5
                    ? `${game.movie.title[0]}...${
                          game.movie.title[game.movie.title.length - 1]
                      }`
                    : null,
        };

        // ✅ Liste ordonnée des indices à débloquer
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
            .map((char) => (char.match(/[a-zA-Z]/) ? "*" : char)) // ✅ Masquer seulement les lettres
            .join("");
    }
}
