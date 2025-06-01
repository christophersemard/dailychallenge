import { Injectable, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { RpcProxyService } from "../common/rpc-proxy.service";
import { UserDto } from "../dto/user.dto";

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
        return this.rpc.send<
            { email: string; password: string; pseudo: string },
            UserDto
        >(
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
        const user = await this.rpc.send<
            { email: string; password: string },
            UserDto
        >(
            this.client,
            "validate_user",
            { email, password },
            {
                origin: "AuthService.login.validate_user",
            }
        );

        const { token } = await this.rpc.send<UserDto, { token: string }>(
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
        return this.rpc.send<object, UserDto[]>(
            this.client,
            "get_all_users",
            {},
            {
                origin: "AuthService.getUsers",
            }
        );
    }
}
