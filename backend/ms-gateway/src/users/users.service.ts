import { Inject, Injectable } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import { RpcExceptionHandlerService } from "../common/rpc-exception-handler.service";
import { UserPublicProfile } from "./users.types";

@Injectable()
export class UsersService {
    constructor(
        @Inject("USERS_SERVICE") private readonly client: ClientProxy,
        private readonly rpcExceptionHandler: RpcExceptionHandlerService
    ) {}

    async getUserById(userId: number): Promise<UserPublicProfile> {
        return lastValueFrom(
            this.client.send<UserPublicProfile>("get_user_by_id", userId)
        ).catch((error) => this.rpcExceptionHandler.handle(error));
    }

    async getUserList(): Promise<UserPublicProfile[]> {
        return lastValueFrom(
            this.client.send<UserPublicProfile[]>("get_user_list", {})
        ).catch((error) => this.rpcExceptionHandler.handle(error));
    }
}
