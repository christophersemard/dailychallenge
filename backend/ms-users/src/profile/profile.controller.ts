import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { ProfileService } from "./profile.service";
import { UpdateProfileDto } from "./dto/update-profile.dto";

@Controller()
export class ProfileController {
    constructor(private readonly profileService: ProfileService) {}

    @MessagePattern("get_user_profile")
    async getProfile(@Payload() userId: number) {
        return this.profileService.getProfile(userId);
    }

    @MessagePattern("update_user_profile")
    async updateProfile(
        @Payload() payload: { userId: number; data: UpdateProfileDto }
    ) {
        return this.profileService.updateProfile(payload.userId, payload.data);
    }
}
