import { Controller, Get, Param } from "@nestjs/common";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { UsersService } from "./users.service";
import { UserPublicProfile } from "./users.types";

@ApiTags("Users")
@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @Get(":id")
    @ApiOperation({ summary: "Récupère le profil public d’un utilisateur" })
    async getUserById(@Param("id") id: string): Promise<UserPublicProfile> {
        return this.usersService.getUserById(Number(id));
    }

    @Get()
    @ApiOperation({ summary: "Liste des utilisateurs (public)" })
    async getUserList(): Promise<UserPublicProfile[]> {
        return this.usersService.getUserList();
    }
}
