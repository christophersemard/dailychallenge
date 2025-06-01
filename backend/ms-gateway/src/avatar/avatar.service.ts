import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { RpcProxyService } from "../common/rpc-proxy.service";
import { AvatarAssetsResponse, GeneratedAvatarResponse } from "./avatar.types";
import { CreateOrUpdateAvatarDto } from "./dto/create-avatar.dto";

@Injectable()
export class AvatarService {
    constructor(
        @Inject("USERS_SERVICE") private readonly client: ClientProxy,
        private readonly rpc: RpcProxyService
    ) {}

    async getAvatarAssets(user?: {
        id: number;
        username: string;
    }): Promise<AvatarAssetsResponse> {
        return this.rpc.send<object, AvatarAssetsResponse>(
            this.client,
            "get_avatar_assets",
            {},
            {
                origin: "AvatarService.getAvatarAssets",
                userId: user?.id?.toString(),
                username: user?.username,
            }
        );
    }

    async createOrUpdateAvatar(
        userId: number,
        dto: CreateOrUpdateAvatarDto,
        username?: string
    ): Promise<GeneratedAvatarResponse> {
        return this.rpc.send<
            { userId: number; data: CreateOrUpdateAvatarDto },
            GeneratedAvatarResponse
        >(
            this.client,
            "create_or_update_avatar",
            { userId, data: dto },
            {
                origin: "AvatarService.createOrUpdateAvatar",
                userId: userId.toString(),
                username,
            }
        );
    }
}
