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
import { JwtAuthGuard } from "./auth/auth.guard";
import { AvatarController } from "./avatar/avatar.controller";
import { AvatarService } from "./avatar/avatar.service";

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
        ]),
    ],
    controllers: [
        AuthController,
        FriendsController,
        UsersController,
        LeaderboardController,
        AdminGameCinema1Controller,
        GameCinema1Controller,
        AvatarController,
    ],
    providers: [
        AuthService,
        JwtStrategy,
        FriendsService,
        RpcExceptionHandlerService,
        CacheService,
        UsersService,
        LeaderboardService,
        AdminGameCinema1Service,
        GameCinema1Service,
        AvatarService,

        {
            provide: APP_GUARD,
            useClass: JwtAuthGuard, // ✅ Vérifie le JWT avant d'accéder aux routes
        },
        {
            provide: APP_GUARD,
            useClass: RolesGuard, // ✅ Active la gestion des rôles sur les routes avec @Roles()
        },
    ],
    exports: [RpcExceptionHandlerService],
})
export class AppModule {}
