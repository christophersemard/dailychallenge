import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { RpcProxyService } from "../common/rpc-proxy.service";
import { GameData, GuessResponse, GameResult } from "./game.types";

@Injectable()
export class GameCinema1Service {
    constructor(
        @Inject("GAME_CINEMA_1_SERVICE") private gameCinemaClient: ClientProxy,
        private readonly rpc: RpcProxyService
    ) {}

    async getTodayGame(user: {
        id: number;
        username?: string;
    }): Promise<GameData> {
        return this.rpc.send<{ userId: number }, GameData>(
            this.gameCinemaClient,
            "get_today_game",
            { userId: user.id },
            {
                userId: user.id.toString(),
                username: user.username,
                origin: "GameCinema1Service.getTodayGame",
            }
        );
    }

    async getGameByDate(
        user: { id: number; username?: string },
        date: string
    ): Promise<GameData> {
        return this.rpc.send<{ userId: number; date: string }, GameData>(
            this.gameCinemaClient,
            "get_game_by_date",
            { userId: user.id, date },
            {
                userId: user.id.toString(),
                username: user.username,
                origin: "GameCinema1Service.getGameByDate",
            }
        );
    }

    async submitGuess(
        user: { id: number; username?: string },
        guess: number,
        date?: string
    ): Promise<GuessResponse> {
        return this.rpc.send<
            { userId: number; guess: number; date?: string },
            GuessResponse
        >(
            this.gameCinemaClient,
            "submit_guess",
            { userId: user.id, guess, date },
            {
                userId: user.id.toString(),
                username: user.username,
                origin: "GameCinema1Service.submitGuess",
            }
        );
    }

    async searchMovie(
        query: string
    ): Promise<{ id: number; title: string; originalTitle: string }[]> {
        return this.rpc.send<
            { query: string },
            { id: number; title: string; originalTitle: string }[]
        >(
            this.gameCinemaClient,
            "search_movie",
            { query },
            {
                origin: "GameCinema1Service.searchMovie",
            }
        );
    }

    async getGameResult(
        user: { id: number; username?: string },
        date?: string
    ): Promise<GameResult | null> {
        return this.rpc.send<
            { userId: number; date?: string },
            GameResult | null
        >(
            this.gameCinemaClient,
            "get_game_result",
            { userId: user.id, date },
            {
                userId: user.id.toString(),
                username: user.username,
                origin: "GameCinema1Service.getGameResult",
            }
        );
    }

    async getUserResultsByMonth(
        user: { id: number; username?: string },
        month: string
    ): Promise<GameResult[]> {
        return this.rpc.send<{ userId: number; month: string }, GameResult[]>(
            this.gameCinemaClient,
            "get_user_results_by_month",
            { userId: user.id, month },
            {
                userId: user.id.toString(),
                username: user.username,
                origin: "GameCinema1Service.getUserResultsByMonth",
            }
        );
    }
}
