import { Injectable, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";

@Injectable()
export class UsersService {
    constructor(
        @Inject("FRIENDS_SERVICE") private friendsClient: ClientProxy
    ) {}

    getUserFriends(user) {
        console.log("user", user);
        return this.friendsClient.send("get_user_friends", {
            userId: user.userId,
        });
    }
}
