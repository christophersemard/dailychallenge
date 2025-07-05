// src/common/rpc-client-logger.service.spec.ts

import { RpcClientLoggerService } from "./rpc-client-logger.service";
import { Logger } from "@nestjs/common";

describe("RpcClientLoggerService", () => {
    let service: RpcClientLoggerService;
    let logSpy: jest.SpyInstance;

    beforeEach(() => {
        service = new RpcClientLoggerService();
        logSpy = jest
            .spyOn(Logger.prototype, "log")
            .mockImplementation(() => {});
        jest.clearAllMocks();
    });

    it("should log microservice call with user email", () => {
        service.logCall({
            pattern: "test.pattern",
            payload: { some: "value", password: "secret" },
            user: { email: "user@example.com" },
            microservice: "users",
        });

        expect(logSpy).toHaveBeenCalledWith(
            expect.stringContaining("user@example.com")
        );
        expect(logSpy).toHaveBeenCalledWith(
            expect.stringContaining('"password":"[REDACTED]"')
        );
    });

    it("should log with 'anon' if no user", () => {
        service.logCall({
            pattern: "event.created",
            payload: { foo: "bar", token: "123" },
            user: undefined,
            microservice: "events",
        });

        expect(logSpy).toHaveBeenCalledWith(
            expect.stringContaining("[anon] → events.event.created")
        );
        expect(logSpy).toHaveBeenCalledWith(
            expect.stringContaining('"token":"[REDACTED]"')
        );
    });

    it("should not redact unrelated fields", () => {
        const clean = service["filterSensitive"]({
            hello: "world",
            token: "abc",
            password: "abc123",
        });

        expect(clean).toEqual({
            hello: "world",
            token: "[REDACTED]",
            password: "[REDACTED]",
        });
    });
});
