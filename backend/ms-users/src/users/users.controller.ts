import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { UsersService } from "./users.service";

@Controller()
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @MessagePattern("get_user_by_id")
    async getUserById(@Payload() userId: number) {
        return this.usersService.getUserById(userId);
    }

    @MessagePattern("get_user_list")
    async getUserList() {
        return this.usersService.getUserList();
    }
}
