import { Injectable, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { RpcProxyService } from "../common/rpc-proxy.service";
import { UserDto } from "../dto/user.dto";
import {
    ConfirmPasswordResetDto,
    UpdatePasswordDto,
    UpdateEmailDto,
    ConfirmPasswordDto,
} from "./auth.types";

@Injectable()
export class AuthService {
    constructor(
        @Inject("USERS_SERVICE") private client: ClientProxy,
        private readonly rpc: RpcProxyService
    ) {}

    async register(
        email: string,
        password: string,
        pseudo: string
    ): Promise<UserDto> {
        return this.rpc.send(
            this.client,
            "register_user",
            { email, password, pseudo },
            {
                origin: "AuthService.register",
            }
        );
    }

    async login(
        email: string,
        password: string
    ): Promise<{ token: string; user: UserDto }> {
        const user = await this.rpc.send(
            this.client,
            "validate_user",
            { email, password },
            {
                origin: "AuthService.login.validate_user",
            }
        );

        const { token } = await this.rpc.send(
            this.client,
            "generate_jwt",
            user,
            {
                origin: "AuthService.login.generate_jwt",
                userId: user.id.toString(),
                username: user.pseudo,
            }
        );

        return { token, user };
    }

    async getUsers(): Promise<UserDto[]> {
        return this.rpc.send(
            this.client,
            "get_all_users",
            {},
            {
                origin: "AuthService.getUsers",
            }
        );
    }

    async updatePassword(
        userId: number,
        dto: UpdatePasswordDto
    ): Promise<{ success: boolean }> {
        return this.rpc.send(
            this.client,
            "update_user_password",
            { userId, data: dto },
            {
                origin: "AuthService.updatePassword",
                userId: userId.toString(),
            }
        );
    }

    async updateEmail(
        userId: number,
        dto: UpdateEmailDto
    ): Promise<{ success: boolean }> {
        return this.rpc.send(
            this.client,
            "update_user_email",
            { userId, data: dto },
            {
                origin: "AuthService.updateEmail",
                userId: userId.toString(),
            }
        );
    }

    async deleteAccount(
        user: { id: number; username?: string },
        dto: ConfirmPasswordDto
    ): Promise<{ success: boolean }> {
        return this.rpc.send(
            this.client,
            "delete_user_account",
            { userId: user.id, data: dto },
            {
                origin: "UsersService.deleteAccount",
                userId: user.id.toString(),
                username: user.username,
            }
        );
    }

    async sendResetPasswordToken(email: string): Promise<{ success: boolean }> {
        return this.rpc.send(
            this.client,
            "send_reset_password_token",
            { email },
            {
                origin: "AuthService.sendResetPasswordToken",
            }
        );
    }

    async resetPasswordWithToken(
        dto: ConfirmPasswordResetDto
    ): Promise<{ success: boolean }> {
        return this.rpc.send(this.client, "confirm_reset_password", dto, {
            origin: "AuthService.resetPasswordWithToken",
        });
    }
}
