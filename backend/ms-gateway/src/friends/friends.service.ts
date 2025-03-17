import { Injectable, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import {
    FriendRequestPayload,
    RespondFriendRequestPayload,
    FriendResponse,
    FriendsListResponse,
} from "./friends.types";
import { RpcExceptionHandlerService } from "../common/rpc-exception-handler.service";
import { CacheService } from "../common/cache.service";

@Injectable()
export class FriendsService {
    constructor(
        @Inject("FRIENDS_SERVICE") private friendsClient: ClientProxy,
        private readonly cacheService: CacheService,
        private readonly rpcExceptionHandler: RpcExceptionHandlerService
    ) {}

    async addFriend(
        user: { id: number },
        friendId: number
    ): Promise<FriendResponse> {
        const payload: FriendRequestPayload = { userId: user.id, friendId };
        const result = await lastValueFrom(
            this.friendsClient.send<FriendResponse>("add_friend", payload)
        ).catch((error) => this.rpcExceptionHandler.handle(error));

        this.cacheService.delete(`friends_list_${user.id}`);
        this.cacheService.delete(`friends_list_${friendId}`);

        return result;
    }

    async removeFriend(
        user: { id: number },
        friendId: number
    ): Promise<FriendResponse> {
        const payload: FriendRequestPayload = { userId: user.id, friendId };
        const result = await lastValueFrom(
            this.friendsClient.send<FriendResponse>("remove_friend", payload)
        ).catch((error) => this.rpcExceptionHandler.handle(error));

        this.cacheService.delete(`friends_list_${user.id}`);
        this.cacheService.delete(`friends_list_${friendId}`);

        return result;
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
        const result = await lastValueFrom(
            this.friendsClient.send<FriendResponse>(
                "respond_friend_request",
                payload
            )
        ).catch((error) => this.rpcExceptionHandler.handle(error));

        this.cacheService.delete(`friends_list_${user.id}`);
        this.cacheService.delete(`friends_list_${friendId}`);

        return result;
    }

    async getFriendsList(user: { id: number }): Promise<FriendsListResponse> {
        const cacheKey = `friends_list_${user.id}`;
        const cachedData = this.cacheService.get<FriendsListResponse>(cacheKey);

        if (cachedData) {
            return cachedData;
        }

        const result = await lastValueFrom(
            this.friendsClient.send<FriendsListResponse>("get_friends_list", {
                userId: user.id,
            })
        ).catch((error) => this.rpcExceptionHandler.handle(error));

        this.cacheService.set<FriendsListResponse>(cacheKey, result);
        return result;
    }
}
