import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { UserGameService } from "../user-game/user-game.service";
import { UserEventsService } from "../user-events/user-events.service";
@Controller()
export class UserGameController {
    constructor(private readonly userGameService: UserGameService) {}

    @MessagePattern("record_game_result")
    async recordGameResult(
        @Payload() { userId, gameId, status, attempts, maxAttempts, gameDate }
    ) {
        return await this.userGameService.processGameResult(
            userId,
            gameId,
            status,
            attempts,
            maxAttempts,
            gameDate
        );
    }
}
