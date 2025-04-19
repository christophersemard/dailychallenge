import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { UsersService } from "./users.service";

@Controller()
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @MessagePattern("get_user_by_id")
    async getUserById(
        @Payload() payload: { userId: number; friendId: number }
    ) {
        return this.usersService.getUserById(payload.userId, payload.friendId);
    }

    @MessagePattern("get_user_list")
    async getUserList() {
        return this.usersService.getUserList();
    }

    @MessagePattern("search_users")
    async searchUsers(@Payload() query: string) {
        return this.usersService.searchUsers(query);
    }
}
