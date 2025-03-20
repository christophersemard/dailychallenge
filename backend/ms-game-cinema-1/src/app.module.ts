import { Module } from "@nestjs/common";
import { ScheduleModule } from "@nestjs/schedule";
import { MoviesCronJob } from "./cron/movies.cron";
import { AdminController } from "./admin/admin.controller";
import { GameController } from "./game/game.controller";
import { AdminService } from "./admin/admin.service";
import { GameService } from "./game/game.service";

@Module({
    imports: [ScheduleModule.forRoot()],
    controllers: [AdminController, GameController],
    providers: [MoviesCronJob, AdminService, GameService],
})
export class AppModule {}
