import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { AdminService } from "./admin.service";

@Controller()
export class AdminController {
    constructor(private readonly adminService: AdminService) {}

    @MessagePattern("admin_users_find_all")
    async findAll(
        @Payload() payload: { page: number; limit: number; search: string }
    ) {
        return this.adminService.findAll(payload);
    }

    @MessagePattern("admin_users_update")
    async update(
        @Payload()
        payload: {
            id: number;
            pseudo?: string;
            email?: string;
            isActive?: boolean;
            isVip?: boolean;
            vipUntil?: Date;
        }
    ) {
        return this.adminService.update(payload);
    }
}
