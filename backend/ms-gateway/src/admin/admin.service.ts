import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { RpcProxyService } from "../common/rpc-proxy.service";
import { UserRequest } from "../auth/auth.types";

@Injectable()
export class AdminService {
    constructor(
        @Inject("USERS_SERVICE") private usersClient: ClientProxy,
        @Inject("LEADERBOARD_SERVICE") private leaderboardClient: ClientProxy,
        private readonly rpc: RpcProxyService
    ) {}

    async getAdminSummary(user: UserRequest["user"]) {
        const [users, activeVip, allGames] = await Promise.all([
            this.rpc.send(
                this.usersClient,
                "admin_count_users",
                {},
                { origin: "AdminService.countUsers" }
            ),
            this.rpc.send(
                this.usersClient,
                "admin_count_active_vip",
                {},
                { origin: "AdminService.countVip" }
            ),
            this.rpc.send(
                this.leaderboardClient,
                "admin_get_all_games",
                {},
                { origin: "AdminService.getAllGames" }
            ),
        ]);

        return {
            totalUsers: users,
            activeVip: activeVip,
            totalGames: allGames.length,
        };
    }
}
