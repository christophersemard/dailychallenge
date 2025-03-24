import { Controller, Get, Post, Query, UseGuards } from "@nestjs/common";
import { AdminGameCinema1Service } from "./admin-game-cinema1.service";
import { JwtAuthGuard } from "../auth/auth.guard"; // 🔐 Vérifie l'authentification
import { RolesGuard } from "../auth/roles.guard"; // 🔐 Vérifie les rôles
import { Roles } from "../auth/roles.decorator"; // 🔐 Rôles nécessaires pour accéder à la ressource

@Controller("api/admin/game-cinema-1")
@UseGuards(JwtAuthGuard, RolesGuard) // ✅ Protection des routes Admin
export class AdminGameCinema1Controller {
    constructor(
        private readonly adminGameCinema1Service: AdminGameCinema1Service
    ) {}

    @Post("generate")
    @Roles("admin") // ✅ Restriction aux admins
    async generateGameDays(
        @Query("startDate") startDate: string,
        @Query("endDate") endDate: string
    ) {
        return this.adminGameCinema1Service.generateGameDays(
            startDate,
            endDate
        );
    }

    @Get("status")
    @Roles("admin")
    async getGameDaysStatus(@Query("month") month: string) {
        return this.adminGameCinema1Service.getGameDaysStatus(month);
    }

    @Post("regenerate")
    @Roles("admin")
    async regenerateGameDay(@Query("date") date: string) {
        return this.adminGameCinema1Service.regenerateGameDay(date);
    }
}
