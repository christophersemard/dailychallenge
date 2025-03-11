import { Controller, Get, UseGuards, Req } from "@nestjs/common";
import { UsersService } from "./users.service";
import { JwtAuthGuard } from "../auth/auth.guard";

@Controller("users")
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    @UseGuards(JwtAuthGuard)
    @Get("profile")
    async getProfile(@Req() req) {
        return {
            message: `Bienvenue ${req.user.email}, votre rôle est ${req.user.role}`,
        };
    }

    @UseGuards(JwtAuthGuard)
    @Get("friends")
    async getFriends(@Req() req) {
        console.log("req.user", req.user);
        return this.usersService.getUserFriends(req.user);
    }
}
