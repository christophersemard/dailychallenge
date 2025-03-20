import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";

export interface GameData {
    guessed: boolean;
    date: string;
    hints: string[];
    maskedTitle: string;
    attempts: number;
    maxAttempts: number;
}

export interface GuessResponse {
    lastGuessed: boolean;
    oldHints: string[];
    newHint?: string;
    attempts: number;
    maxAttempts: number;
    data?: {
        title: string;
        originalTitle: string;
        year: number;
    };
}

export interface GameResult {
    userId: number;
    gameId: number;
    score: number;
    xpGained: number;
    status: "passed" | "failed";
    date: string;
}

@Injectable()
export class GameCinema1Service {
    constructor(
        @Inject("GAME_CINEMA_1_SERVICE") private gameCinemaClient: ClientProxy
    ) {}

    async getTodayGame(userId: number): Promise<GameData> {
        return lastValueFrom(
            this.gameCinemaClient.send<GameData>("get_today_game", { userId })
        );
    }

    async getGameByDate(userId: number, date: string): Promise<GameData> {
        return lastValueFrom(
            this.gameCinemaClient.send<GameData>("get_game_by_date", {
                userId,
                date,
            })
        );
    }

    async submitGuess(
        userId: number,
        guess: string,
        date?: string
    ): Promise<GuessResponse> {
        return lastValueFrom(
            this.gameCinemaClient.send<GuessResponse>("submit_guess", {
                userId,
                guess,
                date, // ✅ Ajout du paramètre date facultatif
            })
        );
    }

    async searchMovie(
        query: string
    ): Promise<{ id: number; title: string; originalTitle: string }[]> {
        return lastValueFrom(
            this.gameCinemaClient.send<
                { id: number; title: string; originalTitle: string }[]
            >("search_movie", { query })
        );
    }

    async getGameResult(
        userId: number,
        date?: string
    ): Promise<GameResult | null> {
        return lastValueFrom(
            this.gameCinemaClient.send<GameResult | null>("get_game_result", {
                userId,
                date,
            })
        );
    }
}
