import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "./users.service";
import prisma from "../prisma/prisma.service";
import { UserEventsService } from "../user-events/user-events.service";
import * as bcrypt from "bcryptjs";
import { UsersController } from "./users.controller";

describe("UsersController", () => {
    let usersController: UsersController;
    let usersService: UsersService;
    let userEventsService: UserEventsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UsersController],
            providers: [
                {
                    provide: UsersService,
                    useValue: {
                        getUserStats: jest.fn(), // ✅ Mock de `getUserStats`
                    },
                },
                {
                    provide: UserEventsService,
                    useValue: {
                        getUserEvents: jest.fn(), // ✅ Mock de `getUserEvents`
                    },
                },
            ],
        }).compile();

        usersController = module.get<UsersController>(UsersController);
        usersService = module.get<UsersService>(UsersService);
        userEventsService = module.get<UserEventsService>(UserEventsService);

        jest.clearAllMocks(); // ✅ Nettoie les mocks avant chaque test
    });

    describe("getUserStats", () => {
        it("should call usersService.getUserStats with the correct userId", async () => {
            const mockUserStats = { userId: 80, xp: 100, level: 2, streak: 5 };
            (usersService.getUserStats as jest.Mock).mockResolvedValue(
                mockUserStats
            );

            const result = await usersController.getUserStats(80);

            expect(usersService.getUserStats).toHaveBeenCalledWith(80);
            expect(result).toEqual(mockUserStats);
        });
    });

    describe("getUserEvents", () => {
        it("should call userEventsService.getUserEvents with the correct userId", async () => {
            const mockUserEvents = [
                {
                    id: 1,
                    userId: 80,
                    type: "level_up",
                    details: "Niveau 3 atteint",
                },
                {
                    id: 2,
                    userId: 80,
                    type: "game_completed",
                    details: "Jeu terminé",
                },
            ];
            (userEventsService.getUserEvents as jest.Mock).mockResolvedValue(
                mockUserEvents
            );

            const result = await usersController.getUserEvents(80);

            expect(userEventsService.getUserEvents).toHaveBeenCalledWith(80);
            expect(result).toEqual(mockUserEvents);
        });
    });
});

describe("UsersService", () => {
    let usersService: UsersService;
    let userEventsService: UserEventsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [
                UsersService,
                {
                    provide: UserEventsService,
                    useValue: {
                        addEvent: jest.fn(), // ✅ Mock des événements
                    },
                },
            ],
        }).compile();

        usersService = module.get<UsersService>(UsersService);
        userEventsService = module.get<UserEventsService>(UserEventsService);

        jest.clearAllMocks(); // ✅ Nettoie les mocks entre chaque test
    });

    describe("getAllUsers", () => {
        beforeEach(() => {
            jest.spyOn(prisma.user, "findMany").mockResolvedValue([
                { id: 1, email: "test1@example.com", password: "hashed" },
                { id: 2, email: "test2@example.com", password: "hashed" },
            ] as any);
        });

        it("should return a list of users", async () => {
            const users = await usersService.getAllUsers();
            expect(prisma.user.findMany).toHaveBeenCalled();
            expect(users).toHaveLength(2);
        });
    });

    describe("createUser", () => {
        beforeEach(() => {
            jest.spyOn(prisma.user, "create").mockResolvedValue({
                id: 1,
                email: "newuser@example.com",
                password: "hashedpassword",
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

        it("should create a user and trigger an event", async () => {
            const user = await usersService.createUser(
                "newuser@example.com",
                "securepassword"
            );

            expect(bcrypt.hash).toHaveBeenCalledWith("securepassword", 10);
            expect(prisma.user.create).toHaveBeenCalled();
            expect(prisma.userStats.create).toHaveBeenCalled();
            expect(userEventsService.addEvent).toHaveBeenCalledWith(
                1,
                "user_registered",
                "Nouvel utilisateur inscrit avec l'email newuser@example.com"
            );

            expect(user).toHaveProperty("email", "newuser@example.com");
            expect(user).not.toHaveProperty("password"); // ✅ Vérifier qu'on ne retourne pas le mdp
        });

        it("should throw an error if email or password is missing", async () => {
            await expect(
                usersService.createUser("", "securepassword")
            ).rejects.toThrow("Email et mot de passe obligatoires.");
        });
    });

    describe("validateUser", () => {
        beforeEach(() => {
            jest.spyOn(prisma.user, "findUnique").mockResolvedValue({
                id: 1,
                email: "valid@example.com",
                password: "hashedpassword",
            } as any);

            // ✅ Mock `bcrypt.compare` et `bcrypt.hash` correctement avec typage explicite
            (bcrypt.compare as jest.MockedFunction<
                typeof bcrypt.compare
            >) = jest.fn().mockResolvedValue(true);
            (bcrypt.hash as jest.MockedFunction<
                typeof bcrypt.hash
            >) = jest.fn().mockResolvedValue("hashedpassword");
        });

        it("should return user if credentials are valid", async () => {
            const user = await usersService.validateUser(
                "valid@example.com",
                "securepassword"
            );

            expect(prisma.user.findUnique).toHaveBeenCalled();
            expect(bcrypt.compare).toHaveBeenCalledWith(
                "securepassword",
                "hashedpassword"
            );

            expect(user).toHaveProperty("email", "valid@example.com");
            expect(user).not.toHaveProperty("password");
        });

        it("should throw an error if credentials are incorrect", async () => {
            (bcrypt.compare as jest.MockedFunction<
                typeof bcrypt.compare
            >) = jest.fn().mockResolvedValue(false);

            await expect(
                usersService.validateUser("valid@example.com", "wrongpassword")
            ).rejects.toThrow("Identifiants incorrects.");
        });

        it("should throw an error if user is not found", async () => {
            jest.spyOn(prisma.user, "findUnique").mockResolvedValue(null);
            await expect(
                usersService.validateUser(
                    "notfound@example.com",
                    "securepassword"
                )
            ).rejects.toThrow("Identifiants incorrects.");
        });
    });

    describe("getUserStats", () => {
        beforeEach(() => {
            jest.spyOn(prisma.userStats, "findUnique").mockResolvedValue({
                userId: 1,
                xp: 100,
                level: 2,
                streak: 5,
                lastPlayedAt: new Date("2025-03-18T00:00:00Z"),
            } as any);

            jest.spyOn(prisma.userStats, "update").mockResolvedValue({
                userId: 1,
                xp: 100,
                level: 2,
                streak: 0, // ✅ Simule le reset du streak
                lastPlayedAt: new Date(),
            } as any);
        });

        it("should return user stats", async () => {
            const stats = await usersService.getUserStats(1);
            expect(prisma.userStats.findUnique).toHaveBeenCalledWith({
                where: { userId: 1 },
            });

            expect(stats).toHaveProperty("xp", 100);
            expect(stats).toHaveProperty("level", 2);
            expect(stats).toHaveProperty("streak", 5);
        });

        it("should reset streak if user did not play yesterday", async () => {
            jest.spyOn(prisma.userStats, "findUnique").mockResolvedValue({
                userId: 1,
                xp: 100,
                level: 2,
                streak: 5,
                lastPlayedAt: new Date("2025-03-15T00:00:00Z"), // 🔥 +3 jours d'inactivité
            } as any);

            const stats = await usersService.getUserStats(1);
            expect(prisma.userStats.update).toHaveBeenCalledWith({
                where: { userId: 1 },
                data: { streak: 0 },
            });

            expect(stats.streak).toBe(0);
        });

        it("should throw an error if userStats is not found", async () => {
            jest.spyOn(prisma.userStats, "findUnique").mockResolvedValue(null);
            await expect(usersService.getUserStats(99)).rejects.toThrow(
                "Utilisateur non trouvé"
            );
        });
    });
});
