import { Injectable, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import {
    FriendRequestPayload,
    RespondFriendRequestPayload,
    FriendResponse,
    FriendsListResponse,
} from "./friends.types";

@Injectable()
export class FriendsService {
    constructor(
        @Inject("FRIENDS_SERVICE") private friendsClient: ClientProxy
    ) {}

    async addFriend(
        user: { id: number },
        friendId: number
    ): Promise<FriendResponse> {
        const payload: FriendRequestPayload = { userId: user.id, friendId };
        return await lastValueFrom(
            this.friendsClient.send<FriendResponse>("add_friend", payload)
        );
    }

    async removeFriend(
        user: { id: number },
        friendId: number
    ): Promise<FriendResponse> {
        const payload: FriendRequestPayload = { userId: user.id, friendId };
        return await lastValueFrom(
            this.friendsClient.send<FriendResponse>("remove_friend", payload)
        );
    }

    async respondFriendRequest(
        user: { id: number },
        friendId: number,
        accept: boolean
    ): Promise<FriendResponse> {
        const payload: RespondFriendRequestPayload = {
            userId: user.id,
            friendId,
            accept,
        };
        return await lastValueFrom(
            this.friendsClient.send<FriendResponse>(
                "respond_friend_request",
                payload
            )
        );
    }

    async getFriendsList(user: { id: number }): Promise<FriendsListResponse> {
        return await lastValueFrom(
            this.friendsClient.send<FriendsListResponse>("get_friends_list", {
                userId: user.id,
            })
        );
    }
}
