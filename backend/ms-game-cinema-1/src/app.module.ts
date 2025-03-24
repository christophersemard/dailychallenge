import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { MoviesCronJob } from "./cron/movies.cron";
import { AdminController } from "./admin/admin.controller";
import { GameController } from "./game/game.controller";
import { AdminService } from "./admin/admin.service";
import { GameService } from "./game/game.service";
import { ClientsModule, Transport } from "@nestjs/microservices";

const isDocker = process.env.DOCKER_MODE === "true";

@Module({
    imports: [
        ScheduleModule.forRoot(),
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
    ],
    controllers: [AdminController, GameController],
    providers: [MoviesCronJob, AdminService, GameService],
})
export class AppModule {}
