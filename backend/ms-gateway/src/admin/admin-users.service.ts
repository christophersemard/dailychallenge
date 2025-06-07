import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { RpcProxyService } from "../common/rpc-proxy.service";
import { UpdateUserAdminDto } from "./admin.types";

@Injectable()
export class AdminUsersService {
    constructor(
        @Inject("USERS_SERVICE") private usersClient: ClientProxy,
        private readonly rpc: RpcProxyService
    ) {}

    async findAll({
        page = 1,
        limit = 20,
        search = "",
    }: {
        page?: number;
        limit?: number;
        search?: string;
    }) {
        return this.rpc.send(
            this.usersClient,
            "admin_users_find_all",
            { page, limit, search },
            { origin: "AdminUsersService.findAll" }
        );
    }

    async updateUser(id: number, dto: UpdateUserAdminDto) {
        return this.rpc.send(
            this.usersClient,
            "admin_users_update",
            { id, ...dto },
            { origin: "AdminUsersService.updateUser" }
        );
    }
}
