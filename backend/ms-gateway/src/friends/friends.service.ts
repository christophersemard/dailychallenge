import { Injectable, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import {
    FriendRequestPayload,
    RespondFriendRequestPayload,
    FriendResponse,
    FriendsListResponse,
} from "./friends.types";
import { CacheService } from "../common/cache.service";
import { RpcProxyService } from "../common/rpc-proxy.service";

@Injectable()
export class FriendsService {
    constructor(
        @Inject("FRIENDS_SERVICE") private friendsClient: ClientProxy,
        private readonly rpc: RpcProxyService,
        private readonly cacheService: CacheService
    ) {}

    async addFriend(
        user: { id: number; username?: string },
        friendId: number
    ): Promise<FriendResponse> {
        const payload: FriendRequestPayload = {
            userId: user.id,
            friendId: Number(friendId),
        };

        const result = await this.rpc.send(
            this.friendsClient,
            "add_friend",
            payload,
            {
                userId: String(user.id),
                username: user.username,
                origin: "FriendsService.addFriend",
            }
        );

        this.invalidateCache(user.id, friendId);
        return result;
    }

    async removeFriend(
        user: { id: number; username?: string },
        friendId: number
    ): Promise<FriendResponse> {
        const payload: FriendRequestPayload = {
            userId: user.id,
            friendId: Number(friendId),
        };

        const result = await this.rpc.send(
            this.friendsClient,
            "remove_friend",
            payload,
            {
                userId: String(user.id),
                username: user.username,
                origin: "FriendsService.removeFriend",
            }
        );

        this.invalidateCache(user.id, friendId);
        return result;
    }

    async respondFriendRequest(
        user: { id: number; username?: string },
        friendId: number,
        accept: boolean
    ): Promise<FriendResponse> {
        const payload: RespondFriendRequestPayload = {
            userId: user.id,
            friendId: Number(friendId),
            accept,
        };

        const result = await this.rpc.send(
            this.friendsClient,
            "respond_friend_request",
            payload,
            {
                userId: String(user.id),
                username: user.username,
                origin: "FriendsService.respondFriendRequest",
            }
        );

        this.invalidateCache(user.id, friendId);
        return result;
    }

    async getFriendsList(user: {
        id: number;
        username?: string;
    }): Promise<FriendsListResponse> {
        const cacheKey = `friends_list_${user.id}`;
        const cached = this.cacheService.get<FriendsListResponse>(cacheKey);
        if (cached) return cached;

        const result = await this.rpc.send(
            this.friendsClient,
            "get_friends_list",
            { userId: user.id },
            {
                userId: String(user.id),
                username: user.username,
                origin: "FriendsService.getFriendsList",
            }
        );

        this.cacheService.set(cacheKey, result);
        return result;
    }

    async getFriendRequests(user: {
        id: number;
        username?: string;
    }): Promise<FriendsListResponse> {
        return await this.rpc.send(
            this.friendsClient,
            "get_pending_requests",
            { userId: user.id },
            {
                userId: String(user.id),
                username: user.username,
                origin: "FriendsService.getFriendRequests",
            }
        );
    }

    private invalidateCache(userId: number, friendId: number) {
        this.cacheService.delete(`friends_list_${userId}`);
        this.cacheService.delete(`friends_list_${friendId}`);
    }
}
