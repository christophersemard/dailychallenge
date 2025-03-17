import { Module } from "@nestjs/common";
import { LeaderboardController } from "./leaderboard/leaderboard.controller";
import { LeaderboardService } from "./leaderboard/leaderboard.service";

@Module({
    imports: [],
    controllers: [LeaderboardController],
    providers: [LeaderboardService],
})
export class AppModule {}
