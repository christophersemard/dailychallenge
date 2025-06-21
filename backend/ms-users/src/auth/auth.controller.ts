import { Controller } from "@nestjs/common";
import { MessagePattern } from "@nestjs/microservices";
import { AuthService } from "./auth.service";

@Controller()
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @MessagePattern("register_user")
    async register({
        email,
        password,
        pseudo,
    }: {
        email: string;
        password: string;
        pseudo: string;
    }) {
        return await this.authService.createUser(email, password, pseudo);
    }

    @MessagePattern("validate_user")
    async validate({ email, password }: { email: string; password: string }) {
        return await this.authService.validateUser(email, password);
    }

    @MessagePattern("generate_jwt")
    async generateJwt(user: {
        id: number;
        email: string;
        role: string;
        pseudo: string;
    }) {
        return { token: await this.authService.generateToken(user) };
    }

    @MessagePattern("update_user_password")
    async updatePassword({
        userId,
        data,
    }: {
        userId: number;
        data: {
            currentPassword: string;
            newPassword: string;
            confirmPassword: string;
        };
    }) {
        return this.authService.updatePassword(userId, data);
    }

    @MessagePattern("update_user_email")
    async updateEmail({
        userId,
        data,
    }: {
        userId: number;
        data: { currentPassword: string; newEmail: string };
    }) {
        return this.authService.updateEmail(userId, data);
    }

    @MessagePattern("delete_user_account")
    async deleteAccount({
        userId,
        data,
    }: {
        userId: number;
        data: { currentPassword: string };
    }) {
        return this.authService.deleteAccount(userId, data.currentPassword);
    }

    @MessagePattern("send_reset_password_token")
    async sendResetToken({ email }: { email: string }) {
        return this.authService.sendResetPasswordToken(email);
    }

    @MessagePattern("confirm_reset_password")
    async resetWithToken(data: {
        token: string;
        newPassword: string;
        confirmPassword: string;
    }) {
        return this.authService.resetPasswordWithToken(data);
    }
}
