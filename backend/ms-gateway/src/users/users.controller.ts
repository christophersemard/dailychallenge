import {
    Controller,
    Get,
    Patch,
    Req,
    Body,
    Param,
    UseGuards,
    Query,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiBearerAuth } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/auth.guard";
import { UsersService } from "./users.service";
import { UserPublicProfile, UpdatePseudoDto } from "./users.types";
import { UserRequest } from "../auth/auth.types";

@ApiTags("Users")
@Controller("/api/users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    // ✅ AUTHENTIFIÉ ----------------------

    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @Get("me")
    @ApiOperation({ summary: "Récupère le profil connecté" })
    async getMe(@Req() req: UserRequest) {
        return this.usersService.getProfile({
            id: req.user.id,
            username: req.user.pseudo,
        });
    }

    @UseGuards(JwtAuthGuard)
    @Patch("pseudo")
    @ApiOperation({ summary: "Met à jour le pseudo de l'utilisateur" })
    updatePseudo(@Req() req: UserRequest, @Body() dto: UpdatePseudoDto) {
        return this.usersService.updatePseudo(
            {
                id: req.user.id,
                username: req.user.pseudo,
            },
            dto
        );
    }

    // ✅ PUBLIC ----------------------

    @UseGuards(JwtAuthGuard)
    @Get()
    @ApiOperation({ summary: "Liste des utilisateurs (public)" })
    async getUserList(): Promise<UserPublicProfile[]> {
        return this.usersService.getUserList();
    }

    @Get("/search")
    @ApiOperation({ summary: "Recherche d'utilisateurs" })
    async searchUsers(
        @Query("query") query: string
    ): Promise<UserPublicProfile[]> {
        return this.usersService.searchUsers(query);
    }

    @UseGuards(JwtAuthGuard)
    @Get(":id")
    @ApiOperation({ summary: "Récupère le profil public d’un utilisateur" })
    async getUserById(
        @Param("id") id: string,
        @Req() req: UserRequest
    ): Promise<UserPublicProfile> {
        console.log("getUserById", { id, user: req.user });
        return this.usersService.getUserById(
            {
                id: req.user.id,
                username: req.user.pseudo,
            },
            Number(id)
        );
    }
}
