import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { UsersService } from "./users.service";
import { UserEventsService } from "../user-events/user-events.service";

@Controller()
export class UsersController {
    constructor(
        private readonly usersService: UsersService,
        private readonly userEventsService: UserEventsService
    ) {}

    @MessagePattern("get_user_stats")
    async getUserStats(@Payload() userId: number) {
        return this.usersService.getUserStats(userId);
    }

    @MessagePattern("add_xp_to_user")
    async addXP(@Payload() data: { userId: number; xp: number }) {
        return this.usersService.addXP(data.userId, data.xp);
    }

    @MessagePattern("get_user_events")
    async getUserEvents(@Payload() userId: number) {
        return this.userEventsService.getUserEvents(userId);
    }
}
