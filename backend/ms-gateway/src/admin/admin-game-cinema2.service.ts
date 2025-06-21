// src/admin-game-cinema2/admin-game-cinema2.service.ts

import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { RpcProxyService } from "../common/rpc-proxy.service";

@Injectable()
export class AdminGameCinema2Service {
    constructor(
        @Inject("GAME_CINEMA_2_SERVICE") private gameCinemaClient: ClientProxy,
        private readonly rpc: RpcProxyService
    ) {}

    async generateGameDays(
        startDate: string,
        endDate: string
    ): Promise<{ message: string }> {
        return this.rpc.send(
            this.gameCinemaClient,
            "admin_generate_game_days",
            { startDate, endDate },
            {
                origin: "AdminGameCinema2Service.generateGameDays",
            }
        );
    }

    async getGameDaysStatus(
        month: string
    ): Promise<{ upcoming: string[]; missingDays: string[] }> {
        return this.rpc.send(
            this.gameCinemaClient,
            "admin_check_game_days_status",
            { month },
            {
                origin: "AdminGameCinema2Service.getGameDaysStatus",
            }
        );
    }

    async regenerateGameDay(date: string): Promise<{ message: string }> {
        return this.rpc.send(
            this.gameCinemaClient,
            "admin_regenerate_game_day",
            { date },
            {
                origin: "AdminGameCinema2Service.regenerateGameDay",
            }
        );
    }
    async updateGameStatus(status: string): Promise<{ message: string }> {
        return this.rpc.send(
            this.gameCinemaClient,
            "admin_update_game_status",
            { status },
            {
                origin: "AdminGameCinema1Service.updateGameStatus",
            }
        );
    }
}
