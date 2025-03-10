import { Controller, Get } from "@nestjs/common";
import { AppService } from "./app.service";
import { MessagePattern } from "@nestjs/microservices";

@Controller()
export class AppController {
    constructor(private readonly appService: AppService) {}

    @MessagePattern("ping_game_cinema")
    ping() {
        return "Pong from Cinema Game!";
    }
}
