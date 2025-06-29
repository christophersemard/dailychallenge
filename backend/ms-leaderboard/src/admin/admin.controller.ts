import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { AdminService } from "./admin.service";

@Controller()
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

    @MessagePattern("admin_get_all_games")
    async getAllGames() {
        return this.adminService.getAllGames();
    }
}
