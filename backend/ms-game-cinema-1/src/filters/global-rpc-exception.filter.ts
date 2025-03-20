import {
    ArgumentsHost,
    Catch,
    ExceptionFilter,
    HttpException,
    BadRequestException,
    Logger,
    NotFoundException,
    ConflictException,
} from "@nestjs/common";
import { RpcException } from "@nestjs/microservices";
import { throwError } from "rxjs";

@Catch(RpcException, BadRequestException, NotFoundException, ConflictException)
export class GlobalRpcExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(GlobalRpcExceptionFilter.name);

    catch(
        exception:
            | RpcException
            | BadRequestException
            | NotFoundException
            | ConflictException,
        host: ArgumentsHost
    ) {
        let status = 400;
        let message = "Erreur inconnue.";

        if (exception instanceof RpcException) {
            // ✅ Si l'exception est une `RpcException`, on récupère son message
            message = exception.getError() as string;
        } else {
            // ✅ Si l'exception est une `BadRequestException`, on récupère la réponse
            const response = exception.getResponse();
            message =
                typeof response === "string" ? response : response["message"];
            status = exception.getStatus();
        }

        this.logger.warn(`📌 RPC Error Captured: ${message}`);
        return throwError(
            () => new RpcException({ statusCode: status, message })
        );
    }
}
