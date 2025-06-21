import { Injectable, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { RpcProxyService } from "../common/rpc-proxy.service";
import { CategoryGame, LeaderboardResponse } from "./leaderboard.types";

@Injectable()
export class LeaderboardService {
    constructor(
        @Inject("LEADERBOARD_SERVICE") private leaderboardClient: ClientProxy,
        private readonly rpc: RpcProxyService
    ) {}

    async getGlobalLeaderboard(
        user: { id: number; username?: string },
        limit: number,
        offset: number,
        dateStart?: Date,
        dateEnd?: Date
    ): Promise<LeaderboardResponse> {
        return this.rpc.send(
            this.leaderboardClient,
            "get_global_leaderboard",
            {
                userId: user.id,
                limit,
                offset,
                dateStart,
                dateEnd,
            },
            {
                userId: String(user.id),
                username: user.username,
                origin: "LeaderboardService.getGlobalLeaderboard",
            }
        );
    }

    async getCategoryLeaderboard(
        user: { id: number; username?: string },
        category: number,
        limit: number,
        offset: number,
        dateStart?: Date,
        dateEnd?: Date
    ): Promise<LeaderboardResponse> {
        return this.rpc.send(
            this.leaderboardClient,
            "get_category_leaderboard",
            {
                userId: user.id,
                category,
                limit,
                offset,
                dateStart,
                dateEnd,
            },
            {
                userId: String(user.id),
                username: user.username,
                origin: "LeaderboardService.getCategoryLeaderboard",
            }
        );
    }

    async getGameLeaderboard(
        user: { id: number; username?: string },
        gameId: number,
        limit: number,
        offset: number,
        dateStart?: Date,
        dateEnd?: Date
    ): Promise<LeaderboardResponse> {
        return this.rpc.send(
            this.leaderboardClient,
            "get_game_leaderboard",
            {
                userId: user.id,
                gameId,
                limit,
                offset,
                dateStart,
                dateEnd,
            },
            {
                userId: String(user.id),
                username: user.username,
                origin: "LeaderboardService.getGameLeaderboard",
            }
        );
    }

    async getFriendsLeaderboard(
        user: { id: number; username?: string },
        limit: number,
        offset: number,
        dateStart?: Date,
        dateEnd?: Date
    ): Promise<LeaderboardResponse> {
        return this.rpc.send(
            this.leaderboardClient,
            "get_friends_leaderboard",
            {
                userId: user.id,
                limit,
                offset,
                dateStart,
                dateEnd,
            },
            {
                userId: String(user.id),
                username: user.username,
                origin: "LeaderboardService.getFriendsLeaderboard",
            }
        );
    }

    async getFriendsCategoryLeaderboard(
        user: { id: number; username?: string },
        category: number,
        limit: number,
        offset: number,
        dateStart?: Date,
        dateEnd?: Date
    ): Promise<LeaderboardResponse> {
        return this.rpc.send(
            this.leaderboardClient,
            "get_friends_category_leaderboard",
            {
                userId: user.id,
                category,
                limit,
                offset,
                dateStart,
                dateEnd,
            },
            {
                userId: String(user.id),
                username: user.username,
                origin: "LeaderboardService.getFriendsCategoryLeaderboard",
            }
        );
    }

    async getFriendsGameLeaderboard(
        user: { id: number; username?: string },
        gameId: number,
        limit: number,
        offset: number,
        dateStart?: Date,
        dateEnd?: Date
    ): Promise<LeaderboardResponse> {
        return this.rpc.send(
            this.leaderboardClient,
            "get_friends_game_leaderboard",
            {
                userId: user.id,
                gameId,
                limit,
                offset,
                dateStart,
                dateEnd,
            },
            {
                userId: String(user.id),
                username: user.username,
                origin: "LeaderboardService.getFriendsGameLeaderboard",
            }
        );
    }

    async getGamesAndCategories(): Promise<CategoryGame[]> {
        return this.rpc.send(
            this.leaderboardClient,
            "get_games_and_categories",
            {},
            {
                origin: "LeaderboardService.getGamesAndCategories",
            }
        );
    }
}
