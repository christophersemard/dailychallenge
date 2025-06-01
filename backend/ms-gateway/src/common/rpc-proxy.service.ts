// src/common/rpc-proxy.service.ts

import { Inject, Injectable, Logger, Scope } from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { ClientProxy } from "@nestjs/microservices";
import { Request } from "express";
import { lastValueFrom } from "rxjs";
import { RpcExceptionHandlerService } from "./rpc-exception-handler.service";

@Injectable({ scope: Scope.REQUEST })
export class RpcProxyService {
    private readonly logger = new Logger(RpcProxyService.name);

    constructor(
        @Inject(REQUEST) private readonly request: Request,
        private readonly rpcExceptionHandler: RpcExceptionHandlerService
    ) {}

    async send<TInput = any, TOutput = any>(
        client: ClientProxy,
        pattern: string,
        payload: TInput | null = {} as TInput,
        context?: {
            userId?: string;
            username?: string;
            origin?: string;
        }
    ): Promise<TOutput> {
        const user = this.request?.user as
            | { id: number; username: string }
            | undefined;
        const username = context?.username ?? user?.username ?? "Anonymous";
        const caller = context?.origin ?? "UnknownService";

        const patternDisplay =
            typeof pattern === "string"
                ? `"${pattern}"`
                : JSON.stringify(pattern);

        const payloadDisplay =
            payload === undefined
                ? "undefined"
                : payload === null
                ? "null"
                : JSON.stringify(this.filterSensitiveData(payload));

        this.logger.log(
            `➡️ [${caller}] [${username}] → pattern ${patternDisplay} | payload: ${payloadDisplay}`
        );

        const effectivePayload = payload === null ? {} : payload;
        return lastValueFrom(
            client.send<TOutput>(pattern, effectivePayload)
        ).catch((error) => {
            this.logger.error(
                `❌ Erreur lors de l'appel RPC ${patternDisplay} pour [${username}]`
            );
            this.rpcExceptionHandler.handle(error);
        });
    }

    private filterSensitiveData(obj: Record<string, any>): Record<string, any> {
        if (!obj || typeof obj !== "object") return {};
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
}
