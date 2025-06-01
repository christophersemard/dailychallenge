// src/common/rpc-client-logger.service.ts
import { Injectable, Logger } from "@nestjs/common";
import { UserPayload } from "../auth/auth.types"; // à adapter selon ton projet

@Injectable()
export class RpcClientLoggerService {
    private readonly logger = new Logger("Gateway→Microservice");

    logCall({
        pattern,
        payload,
        user,
        microservice,
    }: {
        pattern: string;
        payload: any;
        user?: any;
        microservice: string;
    }) {
        const filtered = this.filterSensitive(payload);
        this.logger.log(
            `🚀 [${
                user?.email ?? "anon"
            }] → ${microservice}.${pattern} | Payload: ${JSON.stringify(
                filtered
            )}`
        );
    }

    private filterSensitive(obj: Record<string, any>) {
        const clone = { ...obj };
        for (const key of ["password", "token"]) {
            if (clone[key]) clone[key] = "[REDACTED]";
        }
        return clone;
    }
}
