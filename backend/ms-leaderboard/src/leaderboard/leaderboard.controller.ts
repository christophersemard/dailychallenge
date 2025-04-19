// leaderboard.controller.ts
import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { LeaderboardService } from "./leaderboard.service";

type DateParams = {
    dateStart?: Date;
    dateEnd?: Date;
};

@Controller()
export class LeaderboardController {
    constructor(private readonly leaderboardService: LeaderboardService) {}

    @MessagePattern("get_global_leaderboard")
    async getGlobalLeaderboard(
        payload: {
            userId: number;
            limit: number;
            offset: number;
        } & DateParams
    ) {
        return this.leaderboardService.getGlobalLeaderboard(
            payload.userId,
            payload.limit,
            payload.offset,
            payload.dateStart,
            payload.dateEnd
        );
    }

    @MessagePattern("get_category_leaderboard")
    async getCategoryLeaderboard(
        payload: {
            userId: number;
            category: number;
            limit: number;
            offset: number;
        } & DateParams
    ) {
        return this.leaderboardService.getCategoryLeaderboard(
            payload.userId,
            payload.category,
            payload.limit,
            payload.offset,
            payload.dateStart,
            payload.dateEnd
        );
    }

    @MessagePattern("get_game_leaderboard")
    async getGameLeaderboard(
        payload: {
            userId: number;
            gameId: number;
            limit: number;
            offset: number;
        } & DateParams
    ) {
        return this.leaderboardService.getGameLeaderboard(
            payload.userId,
            payload.gameId,
            payload.limit,
            payload.offset,
            payload.dateStart,
            payload.dateEnd
        );
    }

    @MessagePattern("get_friends_leaderboard")
    async getFriendsLeaderboard(
        payload: {
            userId: number;
            limit: number;
            offset: number;
        } & DateParams
    ) {
        return this.leaderboardService.getFriendsLeaderboard(
            payload.userId,
            payload.limit,
            payload.offset,
            payload.dateStart,
            payload.dateEnd
        );
    }

    @MessagePattern("get_friends_category_leaderboard")
    async getCategoryFriendsLeaderboard(
        payload: {
            userId: number;
            category: number;
            limit: number;
            offset: number;
        } & DateParams
    ) {
        return this.leaderboardService.getFriendsCategoryLeaderboard(
            payload.userId,
            payload.category,
            payload.limit,
            payload.offset,
            payload.dateStart,
            payload.dateEnd
        );
    }

    @MessagePattern("get_friends_game_leaderboard")
    async getGameFriendsLeaderboard(
        payload: {
            userId: number;
            gameId: number;
            limit: number;
            offset: number;
        } & DateParams
    ) {
        return this.leaderboardService.getFriendsGameLeaderboard(
            payload.userId,
            payload.gameId,
            payload.limit,
            payload.offset,
            payload.dateStart,
            payload.dateEnd
        );
    }

    @MessagePattern("get_games_and_categories")
    async getGamesAndCategories() {
        return this.leaderboardService.getCategoriesWithGames();
    }
}
