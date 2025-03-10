import { Module } from "@nestjs/common";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { AuthController } from "./auth/auth.controller";
import { AuthService } from "./auth/auth.service";
import { AppController } from "./app.controller";

@Module({
    imports: [
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
    controllers: [AuthController, AppController],
    providers: [AuthService],
})
export class AppModule {}
