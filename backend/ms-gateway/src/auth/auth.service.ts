import { Injectable, Inject, BadRequestException } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import { UserDto } from "../dto/user.dto";

// Type guard explicite pour les erreurs
function isError(error: unknown): error is { message: string } {
    return (
        typeof error === "object" &&
        error !== null &&
        "message" in error &&
        typeof error.message === "string"
    );
}

@Injectable()
export class AuthService {
    constructor(@Inject("USERS_SERVICE") private client: ClientProxy) {}

    async register(email: string, password: string): Promise<UserDto> {
        try {
            return await lastValueFrom(
                this.client.send<UserDto>("register_user", { email, password })
            );
        } catch (error) {
            if (isError(error)) {
                throw new BadRequestException(error.message);
            }
            throw new BadRequestException("Erreur interne");
        }
    }

    async login(email: string, password: string): Promise<{ token: string }> {
        try {
            const user = await lastValueFrom(
                this.client.send<UserDto>("validate_user", { email, password })
            );

            return await lastValueFrom(
                this.client.send<{ token: string }>("generate_jwt", user)
            );
        } catch (error) {
            if (isError(error)) {
                throw new BadRequestException(error.message);
            }
            throw new BadRequestException("Erreur interne");
        }
    }
}
