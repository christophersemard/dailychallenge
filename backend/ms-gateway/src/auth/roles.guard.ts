import {
    Injectable,
    CanActivate,
    ExecutionContext,
    ForbiddenException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Request } from "express"; // ✅ Import du type Request pour un typage correct

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles: string[] | undefined = this.reflector.get<
            string[]
        >("roles", context.getHandler());

        if (!requiredRoles || requiredRoles.length === 0) {
            return true; // ✅ Si aucune restriction de rôle, accès libre aux utilisateurs connectés
        }

        const request: Request = context.switchToHttp().getRequest(); // ✅ Typage correct
        const user = request.user as
            | { id: number; email: string; role: string }
            | undefined; // ✅ Définition du type utilisateur

        console.log("User reçu", user);

        if (!user || !user.role || !requiredRoles.includes(user.role)) {
            throw new ForbiddenException(
                "Vous n'avez pas l'autorisation d'accéder à cette ressource."
            );
        }

        return true;
    }
}
