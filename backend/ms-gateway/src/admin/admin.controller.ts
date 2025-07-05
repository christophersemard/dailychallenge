import { Controller, Get, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/auth.guard";
import { RolesGuard } from "../auth/roles.guard";
import { Roles } from "../auth/roles.decorator";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { AdminService } from "./admin.service";
import { UserRequest } from "../auth/auth.types";

@ApiTags("Admin - Résumé")
@Controller("api/admin")
@UseGuards(JwtAuthGuard, RolesGuard)
@Roles("admin")
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

    @Get("summary")
    @ApiOperation({ summary: "Résumé global pour dashboard admin" })
    async getAdminSummary(@Req() req: UserRequest) {
        return this.adminService.getAdminSummary(req.user);
    }
}
