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

    @MessagePattern("get_friends_leaderboard")
    async getFriendsLeaderboard(payload: {
        userId: number;
        limit: number;
        offset: number;
        dateStart?: Date;
        dateEnd?: Date;
    }) {
        return this.leaderboardService.getFriendsLeaderboard(
            payload.userId,
            payload.limit,
            payload.offset,
            payload.dateStart,
            payload.dateEnd
        );
    }

    @MessagePattern("get_friends_category_leaderboard")
    async getCategoryFriendsLeaderboard(payload: {
        userId: number;
        category: number;
        limit: number;
        offset: number;
        dateStart?: Date;
        dateEnd?: Date;
    }) {
        return this.leaderboardService.getCategoryFriendsLeaderboard(
            payload.userId,
            payload.category,
            payload.limit,
            payload.offset,
            payload.dateStart,
            payload.dateEnd
        );
    }

    @MessagePattern("get_friends_game_leaderboard")
    async getGameFriendsLeaderboard(payload: {
        userId: number;
        gameId: number;
        limit: number;
        offset: number;
        dateStart?: Date;
        dateEnd?: Date;
    }) {
        return this.leaderboardService.getGameFriendsLeaderboard(
            payload.userId,
            payload.gameId,
            payload.limit,
            payload.offset,
            payload.dateStart,
            payload.dateEnd
        );
    }
}
