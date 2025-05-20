import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpStatus,
    Logger,
} from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { Prisma } from "database";
import { throwError } from "rxjs";

@Catch(Prisma.PrismaClientKnownRequestError, Prisma.PrismaClientValidationError)
export class PrismaRpcExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(PrismaRpcExceptionFilter.name);

    catch(
        exception: Prisma.PrismaClientKnownRequestError,
        host: ArgumentsHost
    ) {
        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = "Erreur interne du serveur";

        // Si c'est une erreur de validation
        if (exception instanceof Prisma.PrismaClientValidationError) {
            // Récupérer les informations des champs invalides
            status = HttpStatus.BAD_REQUEST;
            message = "Donnée invalide. Vérifier les champs.";
        } else {
            switch (exception.code) {
                case "P2002": // Contrainte unique violée (ex: email déjà utilisé)
                    status = HttpStatus.CONFLICT;
                    message = "Donnée déjà existante.";
                    break;
                case "P2025": // Enregistrement non trouvé
                    status = HttpStatus.NOT_FOUND;
                    message = "Donnée introuvable.";
                    break;
                case "P2003": // 🔥 Contrainte de clé étrangère violée
                    status = HttpStatus.BAD_REQUEST;
                    message =
                        "Référence invalide. Un des champs ne correspond pas à un élément existant.";
                    break;
                default:
                    this.logger.error(
                        `💥 Prisma Error (${exception.code}): ${exception.message}`
                    );
            }
        }

        this.logger.warn(`📌 Prisma Error Captured: ${message}`);
        return throwError(
            () =>
                new RpcException({
                    statusCode: status,
                    message,
                })
        );
    }
}
