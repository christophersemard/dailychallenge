import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import { RpcExceptionHandlerService } from "../common/rpc-exception-handler.service";
import { AvatarAssetsResponse, GeneratedAvatarResponse } from "./avatar.types";
import { CreateOrUpdateAvatarDto } from "./dto/create-avatar.dto";

@Injectable()
export class AvatarService {
    constructor(
        @Inject("USERS_SERVICE") private readonly client: ClientProxy,
        private readonly rpcExceptionHandler: RpcExceptionHandlerService
    ) {}

    async getAvatarAssets(): Promise<AvatarAssetsResponse> {
        return lastValueFrom(
            this.client.send<AvatarAssetsResponse>("get_avatar_assets", {})
        ).catch((error) => this.rpcExceptionHandler.handle(error));
    }

    async createOrUpdateAvatar(
        userId: number,
        dto: CreateOrUpdateAvatarDto
    ): Promise<{ url: string }> {
        return lastValueFrom(
            this.client.send<{ url: string }>("create_or_update_avatar", {
                userId,
                data: dto,
            })
        ).catch((error) => this.rpcExceptionHandler.handle(error));
    }

    async generateRandomAvatar(
        userId: number
    ): Promise<GeneratedAvatarResponse> {
        return lastValueFrom(
            this.client.send<GeneratedAvatarResponse>(
                "generate_random_avatar",
                userId
            )
        ).catch((error) => this.rpcExceptionHandler.handle(error));
    }
}
