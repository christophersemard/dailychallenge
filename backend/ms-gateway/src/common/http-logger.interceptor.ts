import {
    Injectable,
    NestInterceptor,
    ExecutionContext,
    CallHandler,
    Logger,
} from "@nestjs/common";
import { Observable, tap } from "rxjs";

@Injectable()
export class HttpLoggerInterceptor implements NestInterceptor {
    private readonly logger = new Logger("HTTP");

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const req = context.switchToHttp().getRequest();
        const { method, originalUrl, body, user } = req;

        const username = req.user?.pseudo || req.user?.email || "Anonymous";

        const filteredBody = filterSensitiveData(req.body);
        const bodyText =
            filteredBody && Object.keys(filteredBody).length
                ? `\n➡️ Body: ${JSON.stringify(filteredBody)}`
                : "";

        return next.handle().pipe(
            tap(() => {
                this.logger.log(
                    `📥 [${username}] ${method} ${originalUrl}${bodyText}`
                );
            })
        );
    }
}
function filterSensitiveData(obj: Record<string, any>): Record<string, any> {
    if (!obj) return {};
    const clone = { ...obj };
    const sensitiveFields = [
        "password",
        "newPassword",
        "confirmPassword",
        "token",
        "accessToken",
    ];

    for (const field of sensitiveFields) {
        if (clone[field]) {
            clone[field] = "[REDACTED]";
        }
    }

    return clone;
}
