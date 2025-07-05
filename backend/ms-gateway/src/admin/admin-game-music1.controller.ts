import {
    Controller,
    Get,
    Post,
    Query,
    UseGuards,
    Patch,
    Body,
} from "@nestjs/common";
import { AdminGameMusic1Service } from "./admin-game-music1.service";
import { JwtAuthGuard } from "../auth/auth.guard"; // 🔐 Vérifie l'authentification
import { RolesGuard } from "../auth/roles.guard"; // 🔐 Vérifie les rôles
import { Roles } from "../auth/roles.decorator"; // 🔐 Rôles nécessaires pour accéder à la ressource
import { UpdateGameStatusDto } from "./admin.types"; // DTO pour la mise à jour du statut du jeu

@Controller("api/admin/game-music-1")
@UseGuards(JwtAuthGuard, RolesGuard) // ✅ Protection des routes Admin
export class AdminGameMusic1Controller {
    constructor(private readonly adminGameService: AdminGameMusic1Service) {}

    @Post("generate")
    @Roles("admin") // ✅ Restriction aux admins
    async generateGameDays(
        @Query("startDate") startDate: string,
        @Query("endDate") endDate: string
    ) {
        console.log(
            `Génération des jours de jeu entre ${startDate} et ${endDate}`
        );
        return this.adminGameService.generateGameDays(startDate, endDate);
    }

    @Get("status")
    @Roles("admin")
    async getGameDaysStatus(@Query("month") month: string) {
        return this.adminGameService.getGameDaysStatus(month);
    }

    @Post("regenerate")
    @Roles("admin")
    async regenerateGameDay(@Query("date") date: string) {
        return this.adminGameService.regenerateGameDay(date);
    }

    @Patch("status")
    @Roles("admin")
    async updateGameStatus(@Body() dto: UpdateGameStatusDto) {
        return this.adminGameService.updateGameStatus(dto.status);
    }
}
