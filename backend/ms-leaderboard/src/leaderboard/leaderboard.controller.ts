import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { LeaderboardService } from "./leaderboard.service";

@Controller()
export class LeaderboardController {
    constructor(private readonly leaderboardService: LeaderboardService) {}

    @MessagePattern("get_global_leaderboard")
    async getGlobalLeaderboard(payload: {
        limit: number;
        offset: number;
        dateStart?: Date;
        dateEnd?: Date;
    }) {
        return this.leaderboardService.getGlobalLeaderboard(
            payload.limit,
            payload.offset,
            payload.dateStart,
            payload.dateEnd
        );
    }

    @MessagePattern("get_category_leaderboard")
    async getCategoryLeaderboard(payload: {
        category: number;
        limit: number;
        offset: number;
        dateStart?: Date;
        dateEnd?: Date;
    }) {
        return this.leaderboardService.getCategoryLeaderboard(
            payload.category,
            payload.limit,
            payload.offset,
            payload.dateStart,
            payload.dateEnd
        );
    }

    @MessagePattern("get_game_leaderboard")
    async getGameLeaderboard(payload: {
        gameId: number;
        limit: number;
        offset: number;
        dateStart?: Date;
        dateEnd?: Date;
    }) {
        return this.leaderboardService.getGameLeaderboard(
            payload.gameId,
            payload.limit,
            payload.offset,
            payload.dateStart,
            payload.dateEnd
        );
    }
}
