import { RpcExceptionHandlerService } from "./rpc-exception-handler.service";
import { BadRequestException, HttpException } from "@nestjs/common";

describe("RpcExceptionHandlerService", () => {
    let service: RpcExceptionHandlerService;

    beforeEach(() => {
        service = new RpcExceptionHandlerService();
    });

    it("should throw HttpException from nested rpcError", () => {
        const error = {
            error: {
                message: "Unauthorized",
                statusCode: 401,
            },
        };

        try {
            service.handle(error);
        } catch (e) {
            expect(e).toBeInstanceOf(HttpException);
            expect(e.message).toBe("Unauthorized");
            expect((e as HttpException).getStatus()).toBe(401);
        }
    });

    it("should throw HttpException from direct error", () => {
        const error = {
            message: "Forbidden",
            statusCode: 403,
        };

        try {
            service.handle(error);
        } catch (e) {
            expect(e).toBeInstanceOf(HttpException);
            expect(e.message).toBe("Forbidden");
            expect((e as HttpException).getStatus()).toBe(403);
        }
    });

    it("should throw BadRequestException for unknown structure", () => {
        const error = { foo: "bar" };

        try {
            service.handle(error);
        } catch (e) {
            expect(e).toBeInstanceOf(BadRequestException);
            expect(e.message).toContain("Erreur interne");
        }
    });

    it("should throw BadRequestException for primitive error", () => {
        try {
            service.handle("some string");
        } catch (e) {
            expect(e).toBeInstanceOf(BadRequestException);
        }
    });

    it("should throw BadRequestException for null", () => {
        try {
            service.handle(null);
        } catch (e) {
            expect(e).toBeInstanceOf(BadRequestException);
        }
    });
});
