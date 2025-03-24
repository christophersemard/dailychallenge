import { Controller, Get, Patch, Req, Body, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/auth.guard";
import { ProfileService } from "./profile.service";
import { UpdateProfileDto } from "./dto/update-profile.dto";
import { UserRequest } from "../auth/auth.types";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";

@ApiTags("Profile")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("users")
export class ProfileController {
    constructor(private readonly usersService: ProfileService) {}

    @Get("me")
    @ApiOperation({ summary: "Récupère le profil connecté" })
    async getMe(@Req() req: UserRequest) {
        return this.usersService.getProfile(req.user.id);
    }

    @Patch("update-profile")
    @ApiOperation({ summary: "Met à jour le profil utilisateur" })
    async updateProfile(
        @Req() req: UserRequest,
        @Body() dto: UpdateProfileDto
    ) {
        return this.usersService.updateProfile(req.user.id, dto);
    }
}
