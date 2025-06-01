import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { RpcProxyService } from "../common/rpc-proxy.service";
import { UserPublicProfile } from "./users.types";
import { UpdateProfileDto } from "../users/dto/update-profile.dto";
import { UserProfile } from "../users/profile.types";

@Injectable()
export class UsersService {
    constructor(
        @Inject("USERS_SERVICE") private readonly client: ClientProxy,
        private readonly rpc: RpcProxyService
    ) {}

    async getUserById(
        user: { id: number; username?: string },
        friendId: number
    ): Promise<UserPublicProfile> {
        return this.rpc.send<
            { userId: number; friendId: number },
            UserPublicProfile
        >(
            this.client,
            "get_user_by_id",
            { userId: user.id, friendId },
            {
                userId: user.id.toString(),
                username: user.username,
                origin: "UsersService.getUserById",
            }
        );
    }

    async getUserList(): Promise<UserPublicProfile[]> {
        return this.rpc.send<undefined, UserPublicProfile[]>(
            this.client,
            "get_user_list",
            undefined,
            {
                origin: "UsersService.getUserList",
            }
        );
    }

    async getProfile(user: {
        id: number;
        username?: string;
    }): Promise<UserProfile> {
        return this.rpc.send<number, UserProfile>(
            this.client,
            "get_user_profile",
            user.id,
            {
                userId: user.id.toString(),
                username: user.username,
                origin: "UsersService.getProfile",
            }
        );
    }

    async updateProfile(
        user: { id: number; username?: string },
        dto: UpdateProfileDto
    ): Promise<UserProfile> {
        return this.rpc.send<
            { userId: number; data: UpdateProfileDto },
            UserProfile
        >(
            this.client,
            "update_user_profile",
            { userId: user.id, data: dto },
            {
                userId: user.id.toString(),
                username: user.username,
                origin: "UsersService.updateProfile",
            }
        );
    }

    async searchUsers(query: string): Promise<UserPublicProfile[]> {
        return this.rpc.send<string, UserPublicProfile[]>(
            this.client,
            "search_users",
            query,
            {
                origin: "UsersService.searchUsers",
            }
        );
    }
}
