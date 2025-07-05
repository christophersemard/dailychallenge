import { Module } from "@nestjs/common";
import { AdminController } from "./admin/admin.controller";
import { GameController } from "./game/game.controller";
import { AdminService } from "./admin/admin.service";
import { GameService } from "./game/game.service";
import { ClientsModule, Transport } from "@nestjs/microservices";
import { ConfigModule } from "@nestjs/config";

const isDocker = process.env.IS_DOCKER === "true";

@Module({
    imports: [
        ClientsModule.register([
            {
                name: "USERS_SERVICE",
                transport: Transport.TCP,
                options: {
                    host: isDocker ? "ms-users" : "localhost",
                    port: 3001,
                },
            },
        ]),
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ["../../.env.shared", ".env", ".env.local"], // charge d'abord le partagé, puis local
        }),
    ],
    controllers: [AdminController, GameController],
    providers: [AdminService, GameService],
})
export class AppModule {}
