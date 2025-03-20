import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";

@Injectable()
export class AdminGameCinema1Service {
    constructor(
        @Inject("GAME_CINEMA_1_SERVICE") private gameCinemaClient: ClientProxy
    ) {}

    async generateGameDays(
        startDate: string,
        endDate: string
    ): Promise<{ message: string }> {
        return lastValueFrom(
            this.gameCinemaClient.send<{ message: string }>(
                "admin_generate_game_days",
                { startDate, endDate }
            )
        );
    }

    async getGameDaysStatus(
        month: string
    ): Promise<{ upcoming: string[]; missingDays: string[] }> {
        return lastValueFrom(
            this.gameCinemaClient.send<{
                upcoming: string[];
                missingDays: string[];
            }>("admin_check_game_days_status", { month })
        );
    }

    async regenerateGameDay(date: string): Promise<{ message: string }> {
        return lastValueFrom(
            this.gameCinemaClient.send<{ message: string }>(
                "admin_regenerate_game_day",
                { date }
            )
        );
    }
}
