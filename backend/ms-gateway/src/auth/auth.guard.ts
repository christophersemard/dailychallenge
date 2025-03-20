import {
    Injectable,
    ExecutionContext,
    UnauthorizedException,
} from "@nestjs/common";
import { AuthGuard } from "@nestjs/passport";
import { Reflector } from "@nestjs/core";

@Injectable()
export class JwtAuthGuard extends AuthGuard("jwt") {
    constructor(private reflector: Reflector) {
        super();
    }

    canActivate(context: ExecutionContext) {
        const isPublic = this.reflector.get<boolean>(
            "isPublic",
            context.getHandler()
        );

        if (isPublic) {
            return true; // ✅ Autoriser les routes publiques
        }

        return super.canActivate(context);
    }

    handleRequest<TUser = any>(
        err: any,
        user: TUser,
        info: Error | null
    ): TUser {
        if (err || !user) {
            const errorMessage = info instanceof Error ? info.message : null;

            if (errorMessage === "No auth token") {
                throw new UnauthorizedException(
                    "Token d’authentification manquant."
                );
            }
            if (errorMessage === "jwt expired") {
                throw new UnauthorizedException("Token expiré.");
            }
            if (errorMessage === "invalid signature") {
                throw new UnauthorizedException("Token invalide.");
            }

            throw new UnauthorizedException("Accès refusé.");
        }

        return user;
    }
}
