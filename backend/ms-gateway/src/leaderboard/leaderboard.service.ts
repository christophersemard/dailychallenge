import { Injectable, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import { RpcExceptionHandlerService } from "../common/rpc-exception-handler.service";
import { LeaderboardEntry } from "./leaderboard.types";

@Injectable()
export class LeaderboardService {
    constructor(
        @Inject("LEADERBOARD_SERVICE") private leaderboardClient: ClientProxy,
        private readonly rpcExceptionHandler: RpcExceptionHandlerService
    ) {}

    async getGlobalLeaderboard(
        limit: number,
        offset: number,
        dateStart?: Date,
        dateEnd?: Date
    ): Promise<LeaderboardEntry[]> {
        return await lastValueFrom(
            this.leaderboardClient.send<LeaderboardEntry[]>(
                "get_global_leaderboard",
                { limit, offset, dateStart, dateEnd }
            )
        ).catch((error) => this.rpcExceptionHandler.handle(error));
    }

    async getCategoryLeaderboard(
        category: string,
        limit: number,
        offset: number,
        dateStart?: Date,
        dateEnd?: Date
    ): Promise<LeaderboardEntry[]> {
        return await lastValueFrom(
            this.leaderboardClient.send<LeaderboardEntry[]>(
                "get_category_leaderboard",
                { category, limit, offset, dateStart, dateEnd }
            )
        ).catch((error) => this.rpcExceptionHandler.handle(error));
    }

    async getGameLeaderboard(
        gameId: number,
        limit: number,
        offset: number,
        dateStart?: Date,
        dateEnd?: Date
    ): Promise<LeaderboardEntry[]> {
        return await lastValueFrom(
            this.leaderboardClient.send<LeaderboardEntry[]>(
                "get_game_leaderboard",
                { gameId, limit, offset, dateStart, dateEnd }
            )
        ).catch((error) => this.rpcExceptionHandler.handle(error));
    }
}
