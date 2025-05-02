import { Controller, Get, Post, Body, Req, UseGuards } from "@nestjs/common";
import { AvatarService } from "./avatar.service";
import { JwtAuthGuard } from "../auth/auth.guard";
import { UserRequest } from "../auth/auth.types";
import { CreateOrUpdateAvatarDto } from "./dto/create-avatar.dto";
import { AvatarAssetsResponse } from "./avatar.types";
import { ApiTags, ApiOperation, ApiBody, ApiResponse } from "@nestjs/swagger";

@ApiTags("Avatar")
@Controller("api/avatar")
export class AvatarController {
    constructor(private readonly avatarService: AvatarService) {}

    @Get("assets")
    @ApiOperation({
        summary: "Liste des assets et couleurs d'avatar disponibles",
    })
    @ApiResponse({ status: 200, description: "Liste des assets", type: Object })
    async getAssets(): Promise<AvatarAssetsResponse> {
        return this.avatarService.getAvatarAssets();
    }

    @Post("generate")
    @UseGuards(JwtAuthGuard)
    @ApiOperation({ summary: "Crée ou met à jour l’avatar du joueur" })
    @ApiBody({ type: CreateOrUpdateAvatarDto })
    async generateAvatar(
        @Req() req: UserRequest,
        @Body() dto: CreateOrUpdateAvatarDto
    ) {
        return this.avatarService.createOrUpdateAvatar(req.user.id, dto);
    }
}
