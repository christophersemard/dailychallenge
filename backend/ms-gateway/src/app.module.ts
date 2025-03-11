import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { AuthController } from "./auth/auth.controller";
import { AuthService } from "./auth/auth.service";
import { AppController } from "./app.controller";
import { JwtStrategy } from "./auth/jwt.strategy";
import { ConfigModule } from "@nestjs/config";
import { UsersController } from "./users/users.controller";
import { UsersService } from "./users/users.service";

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
                options: { host: "localhost", port: 3001 },
            },
            {
                name: "FRIENDS_SERVICE",
                transport: Transport.TCP,
                options: { host: "localhost", port: 3002 },
            },
            {
                name: "LEADERBOARD_SERVICE",
                transport: Transport.TCP,
                options: { host: "localhost", port: 3003 },
            },
            {
                name: "GAME_CINEMA_1_SERVICE",
                transport: Transport.TCP,
                options: { host: "localhost", port: 3004 },
            },
        ]),
    ],
    controllers: [AuthController, AppController, UsersController],
    providers: [AuthService, JwtStrategy, UsersService],
})
export class AppModule {}
