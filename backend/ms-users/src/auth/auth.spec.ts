import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { JwtService } from "@nestjs/jwt";
import { UserEventsService } from "../user-events/user-events.service";
import { MailerService } from "../mailer/mailer.service";
import { VipService } from "../vip/vip.service";
import prisma from "../prisma/prisma.service";
import * as bcrypt from "bcryptjs";
import { VipStatus } from "database";

jest.mock("../prisma/prisma.service", () => ({
    __esModule: true,
    default: {
        user: {
            findUnique: jest.fn(),
            findFirst: jest.fn(),
            create: jest.fn(),
            update: jest.fn(),
        },
        userStats: {
            create: jest.fn(),
        },
        vipSubscription: {
            findFirst: jest.fn(),
            updateMany: jest.fn(),
        },
        passwordResetToken: {
            create: jest.fn(),
            findUnique: jest.fn(),
            delete: jest.fn(),
            deleteMany: jest.fn(),
        },
    },
}));

describe("AuthService", () => {
    let authService: AuthService;
    let vipService: VipService;
    const jwtPayload = { id: 1, email: "test@example.com", role: "user" };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: JwtService,
                    useValue: {
                        sign: jest.fn().mockReturnValue("mocked-token"),
                        verify: jest.fn().mockReturnValue(jwtPayload),
                    },
                },
                {
                    provide: UserEventsService,
                    useValue: { addEvent: jest.fn() },
                },
                {
                    provide: MailerService,
                    useValue: {
                        sendWelcomeEmail: jest.fn(),
                        sendPasswordChangedEmail: jest.fn(),
                        sendEmailChangedEmail: jest.fn(),
                        sendAccountDeletedEmail: jest.fn(),
                        sendPasswordResetEmail: jest.fn(),
                    },
                },
                {
                    provide: VipService,
                    useValue: {
                        cancelSubscription: jest.fn(),
                    },
                },
            ],
        }).compile();

        authService = module.get<AuthService>(AuthService);
        vipService = module.get<VipService>(VipService);
        jest.clearAllMocks();
    });

    describe("generateToken & verifyToken", () => {
        it("should sign and verify token", async () => {
            const token = await authService.generateToken({
                id: 1,
                email: "test@example.com",
                pseudo: "Player",
                role: "user",
            });
            expect(token).toBe("mocked-token");

            const payload = await authService.verifyToken("token");
            expect(payload).toEqual(jwtPayload);
        });
    });

    describe("createUser", () => {
        beforeEach(() => {
            (bcrypt.hash as jest.MockedFunction<
                any
            >) = jest.fn().mockResolvedValue("hashed");
            (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
            (prisma.user.create as jest.Mock).mockResolvedValue({
                id: 1,
                email: "new@example.com",
                password: "hashed",
                pseudo: "NewUser",
            });
            (prisma.userStats.create as jest.Mock).mockResolvedValue({});
        });

        it("should create new user", async () => {
            const user = await authService.createUser(
                "new@example.com",
                "pass",
                "NewUser"
            );
            expect(user.email).toBe("new@example.com");
            expect(user).not.toHaveProperty("password");
        });
    });

    describe("validateUser", () => {
        it("should validate correct credentials", async () => {
            (bcrypt.compare as jest.MockedFunction<
                any
            >) = jest.fn().mockResolvedValue(true);
            (prisma.user.findFirst as jest.Mock).mockResolvedValue({
                id: 1,
                email: "valid@example.com",
                password: "hashed",
            });

            const user = await authService.validateUser(
                "valid@example.com",
                "pass"
            );
            expect(user.email).toBe("valid@example.com");
        });

        it("should throw on invalid credentials", async () => {
            (prisma.user.findFirst as jest.Mock).mockResolvedValue(null);
            await expect(
                authService.validateUser("a@a.com", "pass")
            ).rejects.toThrow();
        });
    });

    describe("updatePassword", () => {
        it("should update password if valid", async () => {
            (bcrypt.compare as jest.Mock).mockResolvedValue(true);
            (bcrypt.hash as jest.Mock).mockResolvedValue("newhash");
            (prisma.user.findUnique as jest.Mock).mockResolvedValue({
                id: 1,
                email: "test",
                password: "hashed",
            });
            const result = await authService.updatePassword(1, {
                currentPassword: "old",
                newPassword: "new",
                confirmPassword: "new",
            });
            expect(result.success).toBe(true);
        });

        it("should reject if passwords mismatch", async () => {
            await expect(
                authService.updatePassword(1, {
                    currentPassword: "x",
                    newPassword: "a",
                    confirmPassword: "b",
                })
            ).rejects.toThrow();
        });
    });

    describe("updateEmail", () => {
        it("should update email if password valid", async () => {
            (bcrypt.compare as jest.Mock).mockResolvedValue(true);
            (prisma.user.findUnique as jest.Mock).mockResolvedValue({
                id: 1,
                email: "old@test.com",
                password: "hash",
            });
            const result = await authService.updateEmail(1, {
                currentPassword: "ok",
                newEmail: "new@test.com",
            });
            expect(result.success).toBe(true);
        });
    });

    describe("deleteAccount", () => {
        const mockUser = {
            id: 1,
            email: "vip@example.com",
            password: "hashed",
            pseudo: "VIPUser",
        };

        beforeEach(() => {
            (prisma.user.findUnique as jest.Mock).mockResolvedValue(mockUser);
            (bcrypt.compare as jest.Mock).mockResolvedValue(true);
            (prisma.user.update as jest.Mock).mockResolvedValue({});
        });

        it("should call cancelSubscription if sub exists", async () => {
            (prisma.vipSubscription.findFirst as jest.Mock).mockResolvedValue({
                userId: 1,
                status: VipStatus.active,
                stripeSubscriptionId: "sub_123",
            });

            await authService.deleteAccount(1, "correct");
            expect(vipService.cancelSubscription).toHaveBeenCalledWith(1);
        });
    });

    describe("sendResetPasswordToken", () => {
        it("should create token and send email", async () => {
            (prisma.user.findUnique as jest.Mock).mockResolvedValue({
                id: 1,
                email: "a@a.com",
            });
            (prisma.passwordResetToken.create as jest.Mock).mockResolvedValue({
                token: "123",
            });
            const result = await authService.sendResetPasswordToken("a@a.com");
            expect(result.success).toBe(true);
        });
    });

    describe("resetPasswordWithToken", () => {
        it("should reset password if token valid", async () => {
            (prisma.passwordResetToken
                .findUnique as jest.Mock).mockResolvedValue({
                token: "tok",
                userId: 1,
                user: { email: "a@a.com" },
                expiresAt: new Date(Date.now() + 60000),
            });
            (bcrypt.hash as jest.Mock).mockResolvedValue("hashed");
            const result = await authService.resetPasswordWithToken({
                token: "tok",
                newPassword: "abc",
                confirmPassword: "abc",
            });
            expect(result.success).toBe(true);
        });

        it("should throw on expired token", async () => {
            (prisma.passwordResetToken
                .findUnique as jest.Mock).mockResolvedValue({
                expiresAt: new Date(Date.now() - 60000),
            });
            await expect(
                authService.resetPasswordWithToken({
                    token: "tok",
                    newPassword: "a",
                    confirmPassword: "a",
                })
            ).rejects.toThrow("Token invalide ou expiré.");
        });
    });
});
