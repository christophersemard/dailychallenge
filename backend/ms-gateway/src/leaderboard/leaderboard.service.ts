import { Injectable, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import { RpcExceptionHandlerService } from "../common/rpc-exception-handler.service";
import { CategoryGame, LeaderboardResponse } from "./leaderboard.types";

@Injectable()
export class LeaderboardService {
    constructor(
        @Inject("LEADERBOARD_SERVICE") private leaderboardClient: ClientProxy,
        private readonly rpcExceptionHandler: RpcExceptionHandlerService
    ) {}

    async getGlobalLeaderboard(
        userId: number,
        limit: number,
        offset: number,
        dateStart?: Date,
        dateEnd?: Date
    ): Promise<LeaderboardResponse> {
        return await lastValueFrom(
            this.leaderboardClient.send<LeaderboardResponse>(
                "get_global_leaderboard",
                { userId, limit, offset, dateStart, dateEnd }
            )
        ).catch((error) => this.rpcExceptionHandler.handle(error));
    }

    async getCategoryLeaderboard(
        userId: number,
        category: number,
        limit: number,
        offset: number,
        dateStart?: Date,
        dateEnd?: Date
    ): Promise<LeaderboardResponse> {
        return await lastValueFrom(
            this.leaderboardClient.send<LeaderboardResponse>(
                "get_category_leaderboard",
                { userId, category, limit, offset, dateStart, dateEnd }
            )
        ).catch((error) => this.rpcExceptionHandler.handle(error));
    }

    async getGameLeaderboard(
        userId: number,
        gameId: number,
        limit: number,
        offset: number,
        dateStart?: Date,
        dateEnd?: Date
    ): Promise<LeaderboardResponse> {
        return await lastValueFrom(
            this.leaderboardClient.send<LeaderboardResponse>(
                "get_game_leaderboard",
                { userId, gameId, limit, offset, dateStart, dateEnd }
            )
        ).catch((error) => this.rpcExceptionHandler.handle(error));
    }

    async getFriendsLeaderboard(
        userId: number,
        limit: number,
        offset: number,
        dateStart?: Date,
        dateEnd?: Date
    ): Promise<LeaderboardResponse> {
        return await lastValueFrom(
            this.leaderboardClient.send<LeaderboardResponse>(
                "get_friends_leaderboard",
                { userId, limit, offset, dateStart, dateEnd }
            )
        ).catch((error) => this.rpcExceptionHandler.handle(error));
    }

    async getFriendsCategoryLeaderboard(
        userId: number,
        category: number,
        limit: number,
        offset: number,
        dateStart?: Date,
        dateEnd?: Date
    ): Promise<LeaderboardResponse> {
        return await lastValueFrom(
            this.leaderboardClient.send<LeaderboardResponse>(
                "get_friends_category_leaderboard",
                { userId, category, limit, offset, dateStart, dateEnd }
            )
        ).catch((error) => this.rpcExceptionHandler.handle(error));
    }

    async getFriendsGameLeaderboard(
        userId: number,
        gameId: number,
        limit: number,
        offset: number,
        dateStart?: Date,
        dateEnd?: Date
    ): Promise<LeaderboardResponse> {
        return await lastValueFrom(
            this.leaderboardClient.send<LeaderboardResponse>(
                "get_friends_game_leaderboard",
                { userId, gameId, limit, offset, dateStart, dateEnd }
            )
        ).catch((error) => this.rpcExceptionHandler.handle(error));
    }

    async getGamesAndCategories(): Promise<CategoryGame[]> {
        return await lastValueFrom(
            this.leaderboardClient.send<CategoryGame[]>(
                "get_games_and_categories",
                {}
            )
        ).catch((error) => this.rpcExceptionHandler.handle(error));
    }
}
