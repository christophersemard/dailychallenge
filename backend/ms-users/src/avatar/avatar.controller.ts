import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { AvatarService } from "./avatar.service";
import { CreateOrUpdateAvatarDto } from "./dto/create-avatar.dto";

@Controller()
export class AvatarController {
    constructor(private readonly avatarService: AvatarService) {}

    @MessagePattern("get_avatar_assets")
    async getAvatarAssets() {
        console.log("AvatarController: getAvatarAssets called");
        return this.avatarService.getAvatarAssets();
    }

    @MessagePattern("create_or_update_avatar")
    async createOrUpdateAvatar(
        @Payload()
        payload: {
            userId: number;
            data: CreateOrUpdateAvatarDto;
        }
    ) {
        if (!payload?.userId || !payload?.data) {
            throw new Error("Requête invalide : userId ou data manquant");
        }

        return this.avatarService.createOrUpdateAvatar(
            payload.userId,
            payload.data
        );
    }
}
