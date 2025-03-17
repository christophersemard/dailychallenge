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

        let status = 500;
        let errorResponse = {
            statusCode: 500,
            error: "Erreur interne du serveur",
            message: "Une erreur inconnue est survenue.",
        };

        if (exception instanceof HttpException) {
            // ✅ Récupérer la réponse HTTP proprement
            const httpResponse = exception.getResponse();
            if (typeof httpResponse === "object" && httpResponse !== null) {
                status = httpResponse["statusCode"] ?? exception.getStatus();
                errorResponse = {
                    statusCode: status,
                    error: httpResponse["error"] || "Erreur",
                    message:
                        httpResponse["message"] || "Une erreur s'est produite",
                };
            } else {
                // Si c'est juste une string
                status = exception.getStatus();
                // errorString doit être le texte correspondant au status code
                let errorString = "Erreur";
                switch (status) {
                    case 400:
                        errorString = "Requête incorrecte";
                        break;
                    case 401:
                        errorString = "Non autorisé";
                        break;
                    case 403:
                        errorString = "Interdit";
                        break;
                    case 404:
                        errorString = "Non trouvé";
                        break;
                    case 409:
                        errorString = "Conflit";
                        break;
                    case 500:
                        errorString = "Erreur interne du serveur";
                        break;
                }
                errorResponse = {
                    statusCode: status,
                    error: errorString,
                    message: httpResponse,
                };
            }
        }

        // Log de l'erreur avec un message clair
        this.logger.error(`❌ ${status} - ${JSON.stringify(errorResponse)}`);

        // ✅ Réponse JSON propre avec le bon status code
        response.status(status).json(errorResponse);
    }
}
