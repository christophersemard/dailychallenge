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

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                AuthService,
                {
                    provide: JwtService,
                    useValue: {
                        sign: jest.fn().mockReturnValue("mocked-token"),
                        verify: jest.fn().mockReturnValue({
                            id: 1,
                            email: "test@example.com",
                            role: "user",
                        }),
                    },
                },
                {
                    provide: UserEventsService,
                    useValue: {
                        addEvent: jest.fn(),
                    },
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
                        hasVipAccess: jest.fn(),
                        getVipStatus: jest.fn(),
                    },
                },
            ],
        }).compile();

        authService = module.get<AuthService>(AuthService);
        vipService = module.get<VipService>(VipService);
        jest.clearAllMocks();
    });

    describe("generateToken", () => {
        it("should return a signed token", async () => {
            const token = await authService.generateToken({
                id: 1,
                email: "test@example.com",
                pseudo: "Player_123",
                role: "user",
            });
            expect(token).toBe("mocked-token");
        });
    });

    describe("verifyToken", () => {
        it("should verify and return payload", async () => {
            const payload = await authService.verifyToken("valid-token");
            expect(payload).toEqual({
                id: 1,
                email: "test@example.com",
                role: "user",
            });
        });
    });

    describe("createUser", () => {
        beforeEach(() => {
            (bcrypt.hash as jest.MockedFunction<
                typeof bcrypt.hash
            >) = jest.fn().mockResolvedValue("hashed");
            (prisma.user.create as jest.Mock).mockResolvedValue({
                id: 1,
                email: "new@example.com",
                password: "hashed",
                pseudo: "NewUser",
            });
            (prisma.userStats.create as jest.Mock).mockResolvedValue({});
            (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);
        });

        it("should create a new user", async () => {
            const user = await authService.createUser(
                "new@example.com",
                "pass",
                "NewUser"
            );
            expect(user).toHaveProperty("email", "new@example.com");
            expect(user).not.toHaveProperty("password");
        });
    });

    describe("validateUser", () => {
        beforeEach(() => {
            (bcrypt.compare as jest.MockedFunction<
                typeof bcrypt.compare
            >) = jest.fn().mockResolvedValue(true);
            (prisma.user.findFirst as jest.Mock).mockResolvedValue({
                id: 1,
                email: "valid@example.com",
                password: "hashed",
                pseudo: "ValidUser",
            });
        });

        it("should return user if credentials are valid", async () => {
            const user = await authService.validateUser(
                "valid@example.com",
                "pass"
            );
            expect(user).toHaveProperty("email", "valid@example.com");
        });

        it("should throw error if user not found", async () => {
            (prisma.user.findFirst as jest.Mock).mockResolvedValue(null);
            await expect(
                authService.validateUser("missing@example.com", "pass")
            ).rejects.toThrow("Identifiants incorrects.");
        });

        it("should throw error if password is invalid", async () => {
            (bcrypt.compare as jest.MockedFunction<
                typeof bcrypt.compare
            >) = jest.fn().mockResolvedValue(false);
            await expect(
                authService.validateUser("valid@example.com", "wrong")
            ).rejects.toThrow("Identifiants incorrects.");
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
            (bcrypt.compare as jest.MockedFunction<
                typeof bcrypt.compare
            >) = jest.fn().mockResolvedValue(true);
            (prisma.user.update as jest.Mock).mockResolvedValue({});
        });

        it("should call vipService.cancelSubscription if user has active sub", async () => {
            (prisma.vipSubscription.findFirst as jest.Mock).mockResolvedValue({
                userId: 1,
                status: VipStatus.active,
                stripeSubscriptionId: "sub_123",
            });

            await authService.deleteAccount(1, "correct");

            expect(vipService.cancelSubscription).toHaveBeenCalledWith(1);
        });

        it("should not call cancelSubscription if no active sub", async () => {
            (prisma.vipSubscription.findFirst as jest.Mock).mockResolvedValue(
                null
            );

            await authService.deleteAccount(1, "correct");

            expect(vipService.cancelSubscription).not.toHaveBeenCalled();
        });
    });
});
