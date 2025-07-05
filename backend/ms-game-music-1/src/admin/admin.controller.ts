import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { AdminService } from "./admin.service";

@Controller()
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

    @MessagePattern("admin_generate_game_days")
    async generateGameDays(
        @Payload()
        { startDate, endDate }: { startDate: string; endDate: string }
    ) {
        return this.adminService.generateGameDays(startDate, endDate);
    }

    @MessagePattern("admin_check_game_days_status")
    async getGameDaysStatus(@Payload() { month }: { month: string }) {
        console.log(
            "Received request to check game days status for month:",
            month
        );
        return this.adminService.getGameDaysStatus(month);
    }

    @MessagePattern("admin_regenerate_game_day")
    async regenerateGameDay(@Payload() { date }: { date: string }) {
        return this.adminService.regenerateGameDay(date);
    }

    @MessagePattern("admin_update_game_status")
    async updateGameStatus(@Payload() { status }: { status: string }) {
        return this.adminService.updateGameStatus(status);
    }
}
