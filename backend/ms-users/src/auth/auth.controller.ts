import { Controller, Get } from "@nestjs/common";
import { MessagePattern, RpcException } from "@nestjs/microservices";
import { UsersService } from "../users/users.service";
import { AuthService } from "./auth.service";

@Controller()
export class AuthController {
    constructor(
        private readonly usersService: UsersService,
        private readonly authService: AuthService
    ) {}

    // Route GET pour teser la connexion
    @Get()
    async test() {
        return "Auth service is up and running!";
    }

    @MessagePattern("register_user")
    async register({ email, password }: { email: string; password: string }) {
        try {
            return await this.usersService.createUser(email, password);
        } catch (error) {
            console.log(error);
            throw new RpcException(error.message);
        }
    }

    @MessagePattern("validate_user")
    async validate({ email, password }: { email: string; password: string }) {
        try {
            return await this.usersService.validateUser(email, password);
        } catch (error) {
            throw new RpcException(error.message);
        }
    }

    @MessagePattern("generate_jwt")
    async generateJwt(user: { id: number; email: string; role: string }) {
        return { token: await this.authService.generateToken(user) };
    }

    @MessagePattern("get_all_users")
    async getAllUsers() {
        return await this.usersService.getAllUsers();
    }
}
