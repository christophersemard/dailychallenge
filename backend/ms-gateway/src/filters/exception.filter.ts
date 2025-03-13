import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    Logger,
} from "@nestjs/common";
import { Response } from "express";

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(GlobalExceptionFilter.name);

    catch(exception: any, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        // Vérifier si c'est une exception HTTP
        const status =
            exception instanceof HttpException ? exception.getStatus() : 500;
        const message =
            exception instanceof HttpException
                ? exception.getResponse()
                : "Erreur interne du serveur";

        // Log de l'erreur
        this.logger.error(`❌ ${status} - ${JSON.stringify(message)}`);

        // Réponse JSON propre
        response.status(status).json({
            statusCode: status,
            error:
                typeof message === "string"
                    ? message
                    : message["message"] || "Erreur interne",
        });
    }
}
