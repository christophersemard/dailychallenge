// src/admin-game-cinema1/admin-game-cinema1.service.ts

import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { RpcProxyService } from "../common/rpc-proxy.service";

@Injectable()
export class AdminGameCinema1Service {
    constructor(
        @Inject("GAME_CINEMA_1_SERVICE") private gameCinemaClient: ClientProxy,
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
                origin: "AdminGameCinema1Service.generateGameDays",
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
                origin: "AdminGameCinema1Service.getGameDaysStatus",
            }
        );
    }

    async regenerateGameDay(date: string): Promise<{ message: string }> {
        return this.rpc.send(
            this.gameCinemaClient,
            "admin_regenerate_game_day",
            { date },
            {
                origin: "AdminGameCinema1Service.regenerateGameDay",
            }
        );
    }
}
