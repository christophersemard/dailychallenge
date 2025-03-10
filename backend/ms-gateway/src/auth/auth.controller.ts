import { Controller, Post, Body } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "../dto/register.dto";
import { LoginDto } from "../dto/login.dto";
import { UserDto } from "../dto/user.dto";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("register")
    register(@Body() body: RegisterDto): Promise<UserDto> {
        return this.authService.register(body.email, body.password);
    }

    @Post("login")
    login(@Body() body: LoginDto): Promise<{ token: string }> {
        return this.authService.login(body.email, body.password);
    }
}
