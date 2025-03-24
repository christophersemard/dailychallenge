import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { JwtService } from "@nestjs/jwt";
import { UnauthorizedException } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { UserEventsService } from "../user-events/user-events.service";
import * as bcrypt from "bcryptjs";
import prisma from "../prisma/prisma.service";

describe("AuthController", () => {
    let authController: AuthController;
    let authService: AuthService;

    const mockAuthService = {
        createUser: jest.fn(),
        validateUser: jest.fn(),
        generateToken: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                {
                    provide: AuthService,
                    useValue: mockAuthService,
                },
            ],
        }).compile();

        authController = module.get<AuthController>(AuthController);
        authService = module.get<AuthService>(AuthService);

        jest.clearAllMocks();
    });

    describe("register", () => {
        it("should call authService.createUser with correct parameters", async () => {
            const mockUser = { id: 1, email: "test@example.com" };
            mockAuthService.createUser.mockResolvedValue(mockUser);

            const result = await authController.register({
                email: "test@example.com",
                password: "securepassword",
            });

            expect(authService.createUser).toHaveBeenCalledWith(
                "test@example.com",
                "securepassword"
            );
            expect(result).toEqual(mockUser);
        });
    });

    describe("validate", () => {
        it("should call authService.validateUser with correct parameters", async () => {
            const mockUser = { id: 1, email: "test@example.com" };
            mockAuthService.validateUser.mockResolvedValue(mockUser);

            const result = await authController.validate({
                email: "test@example.com",
                password: "securepassword",
            });

            expect(authService.validateUser).toHaveBeenCalledWith(
                "test@example.com",
                "securepassword"
            );
            expect(result).toEqual(mockUser);
        });
    });

    describe("generateJwt", () => {
        it("should call authService.generateToken and return a token", async () => {
            mockAuthService.generateToken.mockResolvedValue("mocked-jwt-token");

            const result = await authController.generateJwt({
                id: 1,
                email: "test@example.com",
                role: "user",
            });

            expect(authService.generateToken).toHaveBeenCalledWith({
                id: 1,
                email: "test@example.com",
                role: "user",
            });
            expect(result).toEqual({ token: "mocked-jwt-token" });
        });
    });
});

describe("AuthService", () => {
    let authService: AuthService;
    let jwtService: JwtService;
    let userEventsService: UserEventsService;

    const mockUser = {
        id: 1,
        email: "test@example.com",
        password: "hashedpassword",
        role: "user",
    };

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
            ],
        }).compile();

        authService = module.get<AuthService>(AuthService);
        jwtService = module.get<JwtService>(JwtService);
        userEventsService = module.get<UserEventsService>(UserEventsService);

        jest.clearAllMocks();
    });

    describe("generateToken", () => {
        it("should sign a token with user data", async () => {
            const token = await authService.generateToken(mockUser);
            expect(jwtService.sign).toHaveBeenCalledWith({
                sub: mockUser.id,
                id: mockUser.id,
                email: mockUser.email,
                role: mockUser.role,
            });
            expect(token).toBe("mocked-token");
        });
    });

    describe("verifyToken", () => {
        it("should verify and return payload", async () => {
            const result = await authService.verifyToken("valid-token");
            expect(jwtService.verify).toHaveBeenCalledWith("valid-token");
            expect(result).toEqual({
                id: 1,
                email: "test@example.com",
                role: "user",
            });
        });
    });

    describe("createUser", () => {
        beforeEach(() => {
            jest.spyOn(prisma.user, "create").mockResolvedValue({
                id: 1,
                email: "newuser@example.com",
                password: "hashedpassword",
                pseudo: "Player_123",
            } as any);

            jest.spyOn(prisma.userStats, "create").mockResolvedValue({
                userId: 1,
                xp: 0,
                level: 1,
                streak: 0,
            } as any);

            (bcrypt.hash as jest.MockedFunction<
                typeof bcrypt.hash
            >) = jest.fn().mockResolvedValue("hashedpassword");
        });

        it("should create a user and emit an event", async () => {
            const user = await authService.createUser(
                "newuser@example.com",
                "securepassword"
            );

            expect(bcrypt.hash).toHaveBeenCalledWith("securepassword", 10);
            expect(prisma.user.create).toHaveBeenCalled();
            expect(userEventsService.addEvent).toHaveBeenCalled();
            expect(user).toHaveProperty("email", "newuser@example.com");
            expect(user).not.toHaveProperty("password");
        });
    });

    describe("validateUser", () => {
        beforeEach(() => {
            jest.spyOn(prisma.user, "findUnique").mockResolvedValue({
                id: 1,
                email: "valid@example.com",
                password: "hashedpassword",
            } as any);

            (bcrypt.compare as jest.MockedFunction<
                typeof bcrypt.compare
            >) = jest.fn().mockResolvedValue(true);
            (bcrypt.hash as jest.MockedFunction<
                typeof bcrypt.hash
            >) = jest.fn().mockResolvedValue("hashedpassword");
        });

        it("should return user if credentials are valid", async () => {
            const user = await authService.validateUser(
                "valid@example.com",
                "securepassword"
            );
            expect(user).toHaveProperty("email", "valid@example.com");
        });

        it("should throw error if password is invalid", async () => {
            (bcrypt.compare as jest.MockedFunction<
                typeof bcrypt.compare
            >) = jest.fn().mockResolvedValue(false);

            await expect(
                authService.validateUser("valid@example.com", "wrong")
            ).rejects.toThrow("Identifiants incorrects.");
        });

        it("should throw error if user not found", async () => {
            jest.spyOn(prisma.user, "findUnique").mockResolvedValue(null);

            await expect(
                authService.validateUser("missing@example.com", "password")
            ).rejects.toThrow("Identifiants incorrects.");
        });
    });
});
