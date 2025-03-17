import {
    Controller,
    Get,
    Patch,
    Param,
    Body,
    ParseIntPipe,
    UseGuards,
    Req,
} from "@nestjs/common";
import { JwtAuthGuard } from "../auth/auth.guard";
import { UsersService } from "./users.service";
import { UserRequest } from "../auth/auth.types";
import {
    ApiTags,
    ApiOperation,
    ApiParam,
    ApiResponse,
    ApiBody,
} from "@nestjs/swagger";
import { UserStats, UserEvent } from "./users.types";

@ApiTags("Users")
@Controller("users")
export class UsersController {
    constructor(private usersService: UsersService) {}

    @UseGuards(JwtAuthGuard)
    @Get(":id/stats")
    @ApiOperation({ summary: "Récupère les statistiques d’un joueur" })
    @ApiParam({ name: "id", required: true, type: "number" })
    @ApiResponse({
        status: 200,
        description: "Statistiques récupérées",
        type: UserStats,
    })
    async getUserStats(
        @Param("id", ParseIntPipe) userId: number
    ): Promise<UserStats> {
        return await this.usersService.getUserStats(userId);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(":id/xp")
    @ApiOperation({
        summary: "Ajoute de l’XP au joueur et met à jour son niveau",
    })
    @ApiParam({ name: "id", required: true, type: "number" })
    @ApiBody({ schema: { properties: { xp: { type: "number" } } } })
    @ApiResponse({
        status: 200,
        description: "XP ajouté avec succès",
        type: UserStats,
    })
    async addXP(
        @Req() req: UserRequest,
        @Body() body: { xp: number }
    ): Promise<UserStats> {
        return await this.usersService.addXP(req.user.id, body.xp);
    }

    @UseGuards(JwtAuthGuard)
    @Get(":id/events")
    @ApiOperation({ summary: "Récupère les événements d’un joueur" })
    async getUserEvents(
        @Param("id", ParseIntPipe) userId: number
    ): Promise<UserEvent[]> {
        return this.usersService.getUserEvents(userId);
    }
}
