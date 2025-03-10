import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";

@Controller()
export class AppController {
    @MessagePattern("ping_friends")
    ping() {
        return "Pong from Friends!";
    }
}
