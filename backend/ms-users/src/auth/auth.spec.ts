import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "./auth.service";
import { JwtService } from "@nestjs/jwt";
import { UnauthorizedException } from "@nestjs/common";
import { AuthController } from "./auth.controller";
import { UsersService } from "../users/users.service";

describe("AuthController", () => {
    let authController: AuthController;
    let usersService: UsersService;
    let authService: AuthService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AuthController],
            providers: [
                {
                    provide: UsersService,
                    useValue: {
                        createUser: jest.fn(), // ✅ Mock de `createUser`
                        validateUser: jest.fn(), // ✅ Mock de `validateUser`
                        getAllUsers: jest.fn(), // ✅ Mock de `getAllUsers`
                    },
                },
                {
                    provide: AuthService,
                    useValue: {
                        generateToken: jest.fn(), // ✅ Mock de `generateToken`
                    },
                },
            ],
        }).compile();

        authController = module.get<AuthController>(AuthController);
        usersService = module.get<UsersService>(UsersService);
        authService = module.get<AuthService>(AuthService);

        jest.clearAllMocks(); // ✅ Nettoie les mocks avant chaque test
    });

    describe("register", () => {
        it("should call usersService.createUser with correct parameters", async () => {
            const mockUser = { id: 1, email: "test@example.com" };
            (usersService.createUser as jest.Mock).mockResolvedValue(mockUser);

            const result = await authController.register({
                email: "test@example.com",
                password: "securepassword",
            });

            expect(usersService.createUser).toHaveBeenCalledWith(
                "test@example.com",
                "securepassword"
            );
            expect(result).toEqual(mockUser);
        });
    });

    describe("validate", () => {
        it("should call usersService.validateUser with correct parameters", async () => {
            const mockUser = { id: 1, email: "test@example.com" };
            (usersService.validateUser as jest.Mock).mockResolvedValue(
                mockUser
            );

            const result = await authController.validate({
                email: "test@example.com",
                password: "securepassword",
            });

            expect(usersService.validateUser).toHaveBeenCalledWith(
                "test@example.com",
                "securepassword"
            );
            expect(result).toEqual(mockUser);
        });
    });

    describe("generateJwt", () => {
        it("should call authService.generateToken and return a token", async () => {
            (authService.generateToken as jest.Mock).mockResolvedValue(
                "mocked-jwt-token"
            );

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

    describe("getAllUsers", () => {
        it("should call usersService.getAllUsers and return users", async () => {
            const mockUsers = [
                { id: 1, email: "test1@example.com" },
                { id: 2, email: "test2@example.com" },
            ];
            (usersService.getAllUsers as jest.Mock).mockResolvedValue(
                mockUsers
            );

            const result = await authController.getAllUsers();

            expect(usersService.getAllUsers).toHaveBeenCalled();
            expect(result).toEqual(mockUsers);
        });
    });
});

describe("AuthService", () => {
    let authService: AuthService;
    let jwtService: JwtService;

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
            ],
        }).compile();

        authService = module.get<AuthService>(AuthService);
        jwtService = module.get<JwtService>(JwtService);

        jest.clearAllMocks(); // ✅ Nettoie les mocks entre chaque test
    });

    describe("generateToken", () => {
        it("should generate a JWT token", async () => {
            const user = { id: 1, email: "test@example.com", role: "user" };
            const token = await authService.generateToken(user);

            expect(jwtService.sign).toHaveBeenCalledWith({
                sub: user.id,
                id: user.id,
                email: user.email,
                role: user.role,
            });

            expect(token).toBe("mocked-token");
        });
    });

    describe("verifyToken", () => {
        it("should verify a valid token", async () => {
            const token = "valid-token";
            const decoded = await authService.verifyToken(token);

            expect(jwtService.verify).toHaveBeenCalledWith(token);
            expect(decoded).toEqual({
                id: 1,
                email: "test@example.com",
                role: "user",
            });
        });

        it("should throw an error for an invalid token", async () => {
            jest.spyOn(jwtService, "verify").mockImplementation(() => {
                throw new UnauthorizedException("Invalid token");
            });

            await expect(
                authService.verifyToken("invalid-token")
            ).rejects.toThrow("Invalid token");
        });
    });
});
