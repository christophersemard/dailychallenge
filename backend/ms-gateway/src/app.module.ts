import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { AuthController } from "./auth/auth.controller";
import { AuthService } from "./auth/auth.service";
import { JwtStrategy } from "./auth/jwt.strategy";
import { ConfigModule } from "@nestjs/config";
import { FriendsService } from "./friends/friends.service";
import { FriendsController } from "./friends/friends.controller";
import { RpcExceptionHandlerService } from "./common/rpc-exception-handler.service";
import { CacheService } from "./common/cache.service";
import { UsersController } from "./users/users.controller";
import { UsersService } from "./users/users.service";
import { LeaderboardService } from "./leaderboard/leaderboard.service";
import { LeaderboardController } from "./leaderboard/leaderboard.controller";
import { APP_GUARD } from "@nestjs/core";
import { RolesGuard } from "./auth/roles.guard";
import { AdminGameCinema1Controller } from "./admin/admin-game-cinema1.controller";
import { GameCinema1Controller } from "./game-cinema/game-cinema-1.controller";
import { AdminGameCinema1Service } from "./admin/admin-game-cinema1.service";
import { GameCinema1Service } from "./game-cinema/game-cinema-1.service";
import { GameCinema2Controller } from "./game-cinema/game-cinema-2.controller";
import { GameCinema2Service } from "./game-cinema/game-cinema-2.service";
import { JwtAuthGuard } from "./auth/auth.guard";
import { AvatarController } from "./avatar/avatar.controller";
import { AvatarService } from "./avatar/avatar.service";
import { AdminGameCinema2Service } from "./admin/admin-game-cinema2.service";
import { AdminGameCinema2Controller } from "./admin/admin-game-cinema2.controller";
import { RpcClientLoggerService } from "./common/rpc-client-logger.service";
import { RpcProxyService } from "./common/rpc-proxy.service";
import { AdminUsersController } from "./admin/admin-users.controller";
import { AdminUsersService } from "./admin/admin-users.service";
import { WebhookController } from "./webhook/webhook.controller";
import { VipController } from "./vip/vip.controller";
import { VipService } from "./vip/vip.service";
import { AdminController } from "./admin/admin.controller";
import { AdminService } from "./admin/admin.service";

const isDocker = process.env.IS_DOCKER === "true";
console.log("isDocker", isDocker);

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ["../../.env.shared", ".env", ".env.local"], // charge d'abord le partagé, puis local
        }),
        ClientsModule.register([
            {
                name: "USERS_SERVICE",
                transport: Transport.TCP,
                options: {
                    host: isDocker ? "ms-users" : "localhost",
                    port: 3001,
                },
            },
            {
                name: "FRIENDS_SERVICE",
                transport: Transport.TCP,
                options: {
                    host: isDocker ? "ms-friends" : "localhost",
                    port: 3002,
                },
            },
            {
                name: "LEADERBOARD_SERVICE",
                transport: Transport.TCP,
                options: {
                    host: isDocker ? "ms-leaderboard" : "localhost",
                    port: 3003,
                },
            },
            {
                name: "GAME_CINEMA_1_SERVICE",
                transport: Transport.TCP,
                options: {
                    host: isDocker ? "ms-game-cinema-1" : "localhost",
                    port: 3004,
                },
            },
            {
                name: "GAME_CINEMA_2_SERVICE",
                transport: Transport.TCP,
                options: {
                    host: isDocker ? "ms-game-cinema-2" : "localhost",
                    port: 3005,
                },
            },
            {
                name: "AVATAR_SERVICE",
                transport: Transport.TCP,
                options: {
                    host: isDocker ? "ms-avatar" : "localhost",
                    port: 3006,
                },
            },
        ]),
    ],
    controllers: [
        AuthController,

        AdminGameCinema1Controller,
        AdminGameCinema2Controller,
        AdminUsersController,
        AdminController,

        FriendsController,
        UsersController,
        LeaderboardController,
        AvatarController,
        GameCinema1Controller,
        GameCinema2Controller,

        WebhookController,
        VipController,
    ],
    providers: [
        AuthService,
        JwtStrategy,
        CacheService,

        AdminGameCinema1Service,
        AdminGameCinema2Service,
        AdminUsersService,
        AdminService,

        FriendsService,
        UsersService,
        LeaderboardService,
        GameCinema1Service,
        GameCinema2Service,
        AvatarService,
        VipService,

        RpcExceptionHandlerService,
        RpcClientLoggerService,
        RpcProxyService,

        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard, // ✅ Vérifie le JWT avant d'accéder aux routes
        },
        {
            provide: APP_GUARD,
            useClass: RolesGuard, // ✅ Active la gestion des rôles sur les routes avec @Roles()
        },
    ],
    exports: [
        RpcExceptionHandlerService,
        RpcProxyService,
        RpcClientLoggerService,
    ],
})
export class AppModule {}
