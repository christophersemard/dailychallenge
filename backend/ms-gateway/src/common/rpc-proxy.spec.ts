import { RpcProxyService } from "./rpc-proxy.service";
import { RpcExceptionHandlerService } from "./rpc-exception-handler.service";
import { ClientProxy } from "@nestjs/microservices";
import { of, throwError } from "rxjs";

describe("RpcProxyService", () => {
    let service: RpcProxyService;
    let mockRequest: any;
    let mockExceptionHandler: RpcExceptionHandlerService;
    let mockClient: ClientProxy;

    beforeEach(() => {
        mockRequest = { user: { id: 42, username: "Alice" } };

        mockExceptionHandler = {
            handle: jest.fn(),
        } as any;

        mockClient = {
            send: jest.fn(),
        } as any;

        service = new RpcProxyService(mockRequest, mockExceptionHandler);
    });

    it("should call client.send with correct params", async () => {
        (mockClient.send as jest.Mock).mockReturnValue(of("result"));

        const result = await service.send(mockClient, "test-pattern", {
            data: "ok",
        });

        expect(result).toBe("result");
        expect(mockClient.send).toHaveBeenCalledWith("test-pattern", {
            data: "ok",
        });
    });

    it("should handle errors via RpcExceptionHandler", async () => {
        const mockError = new Error("RPC failed");
        (mockClient.send as jest.Mock).mockReturnValue(
            throwError(() => mockError)
        );

        await service.send(mockClient, "fail-pattern", {
            password: "secret",
        });

        expect(mockExceptionHandler.handle).toHaveBeenCalledWith(mockError);
    });

    it("should redact sensitive fields in logs", () => {
        const payload = {
            password: "123456",
            newPassword: "abc",
            confirmPassword: "abc",
            token: "t",
            accessToken: "a",
            other: "visible",
        };

        const redacted = (service as any).filterSensitiveData(payload);
        expect(redacted).toEqual({
            password: "[REDACTED]",
            newPassword: "[REDACTED]",
            confirmPassword: "[REDACTED]",
            token: "[REDACTED]",
            accessToken: "[REDACTED]",
            other: "visible",
        });
    });

    it("should default username and origin in logs", async () => {
        mockRequest.user = undefined;

        const proxy = new RpcProxyService(mockRequest, mockExceptionHandler);
        (mockClient.send as jest.Mock).mockReturnValue(of("ok"));

        const result = await proxy.send(mockClient, "pattern", null);
        expect(result).toBe("ok");
    });
});
