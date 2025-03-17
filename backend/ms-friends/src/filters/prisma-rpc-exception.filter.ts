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

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaRpcExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(PrismaRpcExceptionFilter.name);

    catch(
        exception: Prisma.PrismaClientKnownRequestError,
        host: ArgumentsHost
    ) {
        let status = HttpStatus.INTERNAL_SERVER_ERROR;
        let message = "Erreur interne du serveur";

        switch (exception.code) {
            case "P2002": // Contrainte unique violée (ex: email déjà utilisé)
                status = HttpStatus.CONFLICT;
                message = "Donnée déjà existante.";
                break;
            case "P2025": // Enregistrement non trouvé
                status = HttpStatus.NOT_FOUND;
                message = "Donnée introuvable.";
                break;
            default:
                this.logger.error(
                    `💥 Prisma Error (${exception.code}): ${exception.message}`
                );
        }

        this.logger.warn(`📌 Prisma Error Captured: ${message}`);
        console.error(exception);
        console.error(status);
        return throwError(
            () =>
                new RpcException({
                    statusCode: status,
                    message,
                })
        );
    }
}
