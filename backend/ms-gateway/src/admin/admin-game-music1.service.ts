// src/admin-game-music1/admin-game-music1.service.ts

import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { RpcProxyService } from "../common/rpc-proxy.service";

@Injectable()
export class AdminGameMusic1Service {
    constructor(
        @Inject("GAME_MUSIC_1_SERVICE") private gameCinemaClient: ClientProxy,
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
                origin: "AdminGameMusic1Service.generateGameDays",
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
                origin: "AdminGameMusic1Service.getGameDaysStatus",
            }
        );
    }

    async regenerateGameDay(date: string): Promise<{ message: string }> {
        return this.rpc.send(
            this.gameCinemaClient,
            "admin_regenerate_game_day",
            { date },
            {
                origin: "AdminGameMusic1Service.regenerateGameDay",
            }
        );
    }

    async updateGameStatus(status: string): Promise<{ message: string }> {
        return this.rpc.send(
            this.gameCinemaClient,
            "admin_update_game_status",
            { status },
            {
                origin: "AdminGameMusic1Service.updateGameStatus",
            }
        );
    }
}
