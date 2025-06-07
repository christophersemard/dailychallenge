import {
    Controller,
    Get,
    Patch,
    Query,
    Body,
    Param,
    UseGuards,
} from "@nestjs/common";
import { AdminUsersService } from "./admin-users.service";
import { JwtAuthGuard } from "../auth/auth.guard";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../auth/roles.decorator";
import { ApiTags, ApiOperation, ApiQuery } from "@nestjs/swagger";
import { UpdateUserAdminDto } from "./admin.types";

@ApiTags("Admin - Utilisateurs")
@Controller("api/admin/users")
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles("admin")
export class AdminUsersController {
    constructor(private readonly adminUsersService: AdminUsersService) {}

    @Get()
    @ApiOperation({
        summary: "Lister les utilisateurs avec pagination et recherche",
    })
    @ApiQuery({ name: "page", required: false, type: Number })
    @ApiQuery({ name: "limit", required: false, type: Number })
    @ApiQuery({ name: "search", required: false, type: String })
    async findAll(
        @Query("page") page?: number,
        @Query("limit") limit?: number,
        @Query("search") search?: string
    ) {
        return this.adminUsersService.findAll({ page, limit, search });
    }

    @Patch(":id")
    @ApiOperation({
        summary: "Mettre à jour les informations d’un utilisateur",
    })
    async updateUser(@Param("id") id: number, @Body() dto: UpdateUserAdminDto) {
        return this.adminUsersService.updateUser(+id, dto);
    }
}
