import {
    Injectable,
    HttpException,
    BadRequestException,
    Logger,
} from "@nestjs/common";

interface RpcError {
    statusCode?: number;
    error?: string;
    message?: string;
}

@Injectable()
export class RpcExceptionHandlerService {
    private readonly logger = new Logger(RpcExceptionHandlerService.name);

    handle(error: unknown): never {
        this.logger.error("🚨 Erreur capturée:", error);

        if (typeof error === "object" && error !== null) {
            // ✅ Vérifier si `error` a une propriété `error` contenant `message` et `statusCode`
            const rpcError = (error as { error?: RpcError }).error;
            if (rpcError && typeof rpcError === "object") {
                const { message, statusCode } = rpcError;
                if (
                    typeof message === "string" &&
                    typeof statusCode === "number"
                ) {
                    throw new HttpException(message, statusCode);
                }
            }

            // ✅ Vérifier si `error` contient directement `message` et `statusCode`
            const directError = error as RpcError;
            if (
                typeof directError.message === "string" &&
                typeof directError.statusCode === "number"
            ) {
                throw new HttpException(
                    directError.message,
                    directError.statusCode
                );
            }
        }

        // ✅ Si aucune structure reconnue, on log et renvoie une erreur générique
        this.logger.warn("⚠️ Erreur RPC inconnue, renvoi d'une erreur interne");
        throw new BadRequestException("Erreur interne");
    }
}
