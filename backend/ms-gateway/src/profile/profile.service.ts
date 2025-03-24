import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import { UpdateProfileDto } from "./dto/update-profile.dto";
import { RpcExceptionHandlerService } from "../common/rpc-exception-handler.service";
import { UserProfile } from "./profile.types";

@Injectable()
export class ProfileService {
    constructor(
        @Inject("USERS_SERVICE") private readonly client: ClientProxy,
        private readonly rpcExceptionHandler: RpcExceptionHandlerService
    ) {}

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
}
