import { Module } from "@nestjs/common";
import { LeaderboardController } from "./leaderboard/leaderboard.controller";
import { LeaderboardService } from "./leaderboard/leaderboard.service";
import { ConfigModule } from "@nestjs/config";
import { AdminController } from "./admin/admin.controller";
import { AdminService } from "./admin/admin.service";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ["../../.env.shared", ".env", ".env.local"], // charge d'abord le partagé, puis local
        }),
    ],
    controllers: [LeaderboardController, AdminController],
    providers: [LeaderboardService, AdminService],
})
export class AppModule {}
