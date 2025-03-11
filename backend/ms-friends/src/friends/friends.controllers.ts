import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";

@Controller()
export class FriendsController {
    @MessagePattern("get_user_friends")
    async getUserFriends(@Payload() data) {
        const { userId } = data;
        return `Voici la liste des amis de l'utilisateur ${userId}`;
    }
}
