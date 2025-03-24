// backend/ms-friends/src/friends/friends.controller.ts
import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { FriendsService } from "./friends.service";

@Controller()
export class FriendsController {
    constructor(private readonly friendsService: FriendsService) {}

    @MessagePattern("add_friend")
    async addFriend(
        @Payload() { userId, friendId }: { userId: number; friendId: number }
    ) {
        return this.friendsService.addFriend(userId, friendId);
    }

    @MessagePattern("remove_friend")
    async removeFriend(
        @Payload() { userId, friendId }: { userId: number; friendId: number }
    ) {
        return this.friendsService.removeFriend(userId, friendId);
    }

    @MessagePattern("respond_friend_request")
    async respondFriendRequest(
        @Payload()
        data: {
            userId: number;
            friendId: number;
            accept: boolean;
        }
    ) {
        return this.friendsService.respondFriendRequest(
            data.userId,
            data.friendId,
            data.accept
        );
    }

    @MessagePattern("get_friends_list")
    async getFriendsList(@Payload() { userId }: { userId: number }) {
        return this.friendsService.getFriendsList(userId);
    }

    @MessagePattern("get_pending_requests")
    async getFriendRequests(@Payload() { userId }: { userId: number }) {
        return this.friendsService.getPendingRequests(userId);
    }
}
