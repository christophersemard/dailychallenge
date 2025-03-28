import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import { RpcExceptionHandlerService } from "../common/rpc-exception-handler.service";
import { UserPublicProfile } from "./users.types";
import { UpdateProfileDto } from "../users/dto/update-profile.dto";
import { UserProfile } from "../users/profile.types";

@Injectable()
export class UsersService {
    constructor(
        @Inject("USERS_SERVICE") private readonly client: ClientProxy,
        private readonly rpcExceptionHandler: RpcExceptionHandlerService
    ) {}

    async getUserById(userId: number): Promise<UserPublicProfile> {
        return lastValueFrom(
            this.client.send<UserPublicProfile>("get_user_by_id", userId)
        ).catch((error) => this.rpcExceptionHandler.handle(error));
    }

    async getUserList(): Promise<UserPublicProfile[]> {
        return lastValueFrom(
            this.client.send<UserPublicProfile[]>("get_user_list", {})
        ).catch((error) => this.rpcExceptionHandler.handle(error));
    }

    async getProfile(userId: number): Promise<UserProfile> {
        return lastValueFrom(
            this.client.send<UserProfile>("get_user_profile", userId)
        ).catch((error) => this.rpcExceptionHandler.handle(error));
    }

    async updateProfile(
        userId: number,
        dto: UpdateProfileDto
    ): Promise<UserProfile> {
        return lastValueFrom(
            this.client.send<UserProfile>("update_user_profile", {
                userId,
                data: dto,
            })
        ).catch((error) => this.rpcExceptionHandler.handle(error));
    }

    async searchUsers(query: string): Promise<UserPublicProfile[]> {
        return lastValueFrom(
            this.client.send<UserPublicProfile[]>("search_users", query)
        ).catch((error) => this.rpcExceptionHandler.handle(error));
    }
}
