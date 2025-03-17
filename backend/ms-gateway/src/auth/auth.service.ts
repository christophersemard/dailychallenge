import { Injectable, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import { UserDto } from "../dto/user.dto";
import { RpcExceptionHandlerService } from "../common/rpc-exception-handler.service";

@Injectable()
export class AuthService {
    constructor(
        @Inject("USERS_SERVICE") private client: ClientProxy,
        private readonly rpcExceptionHandler: RpcExceptionHandlerService
    ) {}

    async register(email: string, password: string): Promise<UserDto> {
        return lastValueFrom(
            this.client.send<UserDto>("register_user", { email, password })
        ).catch((error) => this.rpcExceptionHandler.handle(error));
    }

    async login(email: string, password: string): Promise<{ token: string }> {
        return lastValueFrom(
            this.client.send<UserDto>("validate_user", { email, password })
        )
            .then((user) => {
                return lastValueFrom(
                    this.client.send<{ token: string }>("generate_jwt", user)
                );
            })
            .catch((error) => this.rpcExceptionHandler.handle(error));
    }

    async getUsers(): Promise<UserDto[]> {
        return lastValueFrom(
            this.client.send<UserDto[]>("get_all_users", {})
        ).catch((error) => this.rpcExceptionHandler.handle(error));
    }
}
