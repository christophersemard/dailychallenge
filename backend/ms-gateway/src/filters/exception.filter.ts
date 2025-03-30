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

    catch(exception: unknown, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse<Response>();

        let status = 500;
        let errorResponse = {
            statusCode: 500,
            error: "Erreur interne du serveur",
            message: "Une erreur inconnue est survenue.",
        };

        console.log("exception", exception);

        // ✅ Cas 1: Erreur HTTP classique (HttpException)
        if (exception instanceof HttpException) {
            const httpResponse = exception.getResponse();
            status = exception.getStatus();

            if (typeof httpResponse === "object" && httpResponse !== null) {
                const responseObj = httpResponse as Record<string, unknown>;
                errorResponse = {
                    statusCode: status,
                    error: (responseObj["error"] as string) || "Erreur",
                    message:
                        (responseObj["message"] as string) ||
                        "Une erreur s'est produite",
                };
            } else {
                errorResponse = {
                    statusCode: status,
                    error: this.getErrorLabel(status),
                    message: String(httpResponse),
                };
            }
        }
        // ✅ Cas 2: Erreur RPC provenant d'un microservice
        else if (
            typeof exception === "object" &&
            exception !== null &&
            "error" in exception &&
            typeof exception.error === "object" &&
            exception.error !== null &&
            "statusCode" in exception.error
        ) {
            const rpcError = exception.error as {
                statusCode: number;
                message?: string;
            };

            status = rpcError.statusCode;
            errorResponse = {
                statusCode: status,
                error: this.getErrorLabel(status),
                message: rpcError.message || "Une erreur s'est produite",
            };
        }
        // ✅ Cas 3: Erreur inconnue
        else {
            this.logger.error(
                `❌ Erreur non gérée: ${JSON.stringify(exception)}`
            );
        }

        // ✅ Log clair de l'erreur
        this.logger.error(`❌ ${status} - ${JSON.stringify(errorResponse)}`);

        // ✅ Réponse JSON avec le bon status code
        response.status(status).json(errorResponse);
    }

    // ✅ Fonction utilitaire pour donner un label aux erreurs HTTP
    private getErrorLabel(status: number): string {
        switch (status) {
            case 400:
                return "Requête incorrecte";
            case 401:
                return "Non autorisé";
            case 403:
                return "Interdit";
            case 404:
                return "Non trouvé";
            case 409:
                return "Conflit";
            case 422:
                return "Entité non traitable";
            case 500:
                return "Erreur interne du serveur";
            default:
                return "Erreur";
        }
    }
}
