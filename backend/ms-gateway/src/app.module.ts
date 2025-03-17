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

const isDocker = process.env.IS_DOCKER === "true";
console.log("isDocker", isDocker);

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true, // Rend le module global pour toute l'application
            envFilePath: ".env", // Chemin vers votre fichier .env
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
    controllers: [AuthController, FriendsController, UsersController],
    providers: [
        AuthService,
        JwtStrategy,
        FriendsService,
        RpcExceptionHandlerService,
        CacheService,
        UsersService,
    ],
    exports: [RpcExceptionHandlerService],
})
export class AppModule {}
