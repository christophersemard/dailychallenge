import { Injectable, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import { RpcExceptionHandlerService } from "../common/rpc-exception-handler.service";
import { CacheService } from "../common/cache.service";
import { UserStats, UserEvent } from "./users.types";

@Injectable()
export class UsersService {
    constructor(
        @Inject("USERS_SERVICE") private usersClient: ClientProxy,
        private readonly cacheService: CacheService,
        private readonly rpcExceptionHandler: RpcExceptionHandlerService
    ) {}

    async getUserStats(userId: number): Promise<UserStats> {
        const cacheKey = `user_stats_${userId}`;
        const cachedData = this.cacheService.get<UserStats>(cacheKey);

        if (cachedData) {
            return cachedData;
        }

        const result = await lastValueFrom(
            this.usersClient.send<UserStats>("get_user_stats", userId)
        ).catch((error) => this.rpcExceptionHandler.handle(error));

        this.cacheService.set<UserStats>(cacheKey, result);
        return result;
    }

    async addXP(userId: number, xp: number): Promise<UserStats> {
        const result = await lastValueFrom(
            this.usersClient.send<UserStats>("add_xp_to_user", { userId, xp })
        ).catch((error) => this.rpcExceptionHandler.handle(error));

        this.cacheService.delete(`user_stats_${userId}`);
        return result;
    }

    async getUserEvents(userId: number): Promise<UserEvent[]> {
        return await lastValueFrom(
            this.usersClient.send<UserEvent[]>("get_user_events", userId)
        ).catch((error) => this.rpcExceptionHandler.handle(error));
    }
}
