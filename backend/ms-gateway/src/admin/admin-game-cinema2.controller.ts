import { Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { AdminGameCinema2Service } from "./admin-game-cinema2.service";
import { JwtAuthGuard } from "../auth/auth.guard"; // 🔐 Vérifie l'authentification
import { RolesGuard } from "../auth/roles.guard"; // 🔐 Vérifie les rôles
import { Roles } from "../auth/roles.decorator"; // 🔐 Rôles nécessaires pour accéder à la ressource

@Controller("api/admin/game-cinema-1")
@UseGuards(JwtAuthGuard, RolesGuard) // ✅ Protection des routes Admin
export class AdminGameCinema2Controller {
    constructor(
        private readonly adminGameCinema2Service: AdminGameCinema2Service
    ) {}

    @Post("generate")
    @Roles("admin") // ✅ Restriction aux admins
    async generateGameDays(
        @Query("startDate") startDate: string,
        @Query("endDate") endDate: string
    ) {
        return this.adminGameCinema2Service.generateGameDays(
            startDate,
            endDate
        );
    }

    @Get("status")
    @Roles("admin")
    async getGameDaysStatus(@Query("month") month: string) {
        return this.adminGameCinema2Service.getGameDaysStatus(month);
    }

    @Post("regenerate")
    @Roles("admin")
    async regenerateGameDay(@Query("date") date: string) {
        return this.adminGameCinema2Service.regenerateGameDay(date);
    }
}
