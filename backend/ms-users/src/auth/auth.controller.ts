import { Controller, Get } from "@nestjs/common";
import { MessagePattern, RpcException } from "@nestjs/microservices";
import { AuthService } from "./auth.service";

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @MessagePattern("register_user")
    async register({ email, password }: { email: string; password: string }) {
        return await this.authService.createUser(email, password);
    }

    @MessagePattern("validate_user")
    async validate({ email, password }: { email: string; password: string }) {
        return await this.authService.validateUser(email, password);
    }

    @MessagePattern("generate_jwt")
    async generateJwt(user: { id: number; email: string; role: string }) {
        return { token: await this.authService.generateToken(user) };
    }
}
