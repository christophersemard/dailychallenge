import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import { GameData, GuessResponse, GameResult } from "./game.types";

@Injectable()
export class GameCinema2Service {
    constructor(
        @Inject("GAME_CINEMA_2_SERVICE") private gameCinemaClient: ClientProxy
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
        guess: number,
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

    async getUserResultsByMonth(
        userId: number,
        month: string
    ): Promise<GameResult[]> {
        return lastValueFrom(
            this.gameCinemaClient.send<GameResult[]>(
                "get_user_results_by_month",
                {
                    userId,
                    month,
                }
            )
        );
    }
}
