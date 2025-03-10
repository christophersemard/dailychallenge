import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";

@Controller()
export class AppController {
    @MessagePattern("ping_leaderboard")
    ping() {
        return "Pong from Leaderboard!";
    }
}
