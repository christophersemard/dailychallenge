import { HttpLoggerInterceptor } from "./http-logger.interceptor";
import { CallHandler, ExecutionContext } from "@nestjs/common";
import { of } from "rxjs";
import { Logger } from "@nestjs/common";

describe("HttpLoggerInterceptor", () => {
    let interceptor: HttpLoggerInterceptor;
    let mockLoggerLog: jest.SpyInstance;

    beforeEach(() => {
        interceptor = new HttpLoggerInterceptor();
        mockLoggerLog = jest
            .spyOn(Logger.prototype, "log")
            .mockImplementation();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    const mockExecutionContext = (req: Partial<any>) =>
        (({
            switchToHttp: () => ({
                getRequest: () => req,
            }),
        } as unknown) as ExecutionContext);

    const mockCallHandler = (): CallHandler => ({
        handle: () => of("result"),
    });

    it("loggue une requête avec pseudo", async () => {
        const context = mockExecutionContext({
            method: "POST",
            originalUrl: "/api/test",
            body: { test: "value" },
            user: { pseudo: "John" },
        });

        const next = mockCallHandler();

        await interceptor.intercept(context, next).toPromise();

        expect(mockLoggerLog).toHaveBeenCalledWith(
            expect.stringContaining("📥 [John] POST /api/test")
        );
        expect(mockLoggerLog).toHaveBeenCalledWith(
            expect.stringContaining('"test":"value"')
        );
    });

    it("filtre les champs sensibles", async () => {
        const context = mockExecutionContext({
            method: "POST",
            originalUrl: "/api/login",
            body: {
                email: "test@example.com",
                password: "secret",
                confirmPassword: "secret",
            },
            user: { email: "test@example.com" },
        });

        const next = mockCallHandler();

        await interceptor.intercept(context, next).toPromise();

        const logs = mockLoggerLog.mock.calls.map(([msg]) => msg);
        expect(logs.join(" ")).toContain('"password":"[REDACTED]"');
        expect(logs.join(" ")).toContain('"confirmPassword":"[REDACTED]"');
    });

    it("n'affiche pas le body s'il y a plus de 50 clés", async () => {
        const bigBody = Object.fromEntries(
            Array.from({ length: 51 }, (_, i) => [`key${i}`, "val"])
        );

        const context = mockExecutionContext({
            method: "POST",
            originalUrl: "/api/big",
            body: bigBody,
            user: {},
        });

        const next = mockCallHandler();

        await interceptor.intercept(context, next).toPromise();

        expect(mockLoggerLog).toHaveBeenCalledWith(
            expect.stringContaining("Body too large to display")
        );
    });

    it("gère l’absence d’utilisateur", async () => {
        const context = mockExecutionContext({
            method: "GET",
            originalUrl: "/api/test",
            body: {},
        });

        const next = mockCallHandler();

        await interceptor.intercept(context, next).toPromise();

        expect(mockLoggerLog).toHaveBeenCalledWith(
            expect.stringContaining("📥 [Anonymous] GET /api/test")
        );
    });
});
