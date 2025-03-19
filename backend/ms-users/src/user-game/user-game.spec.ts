import { Test, TestingModule } from "@nestjs/testing";
import { UserGameService } from "./user-game.service";
import { UserEventsService } from "../user-events/user-events.service";
import { RpcException } from "@nestjs/microservices";
import prisma from "../prisma/prisma.service";
import { UserGameController } from "./user-game.controller";

describe("UserGameController", () => {
    let userGameController: UserGameController;
    let userGameService: UserGameService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [UserGameController],
            providers: [
                {
                    provide: UserGameService,
                    useValue: {
                        processGameResult: jest.fn(), // ✅ Mock du service
                    },
                },
            ],
        }).compile();

        userGameController = module.get<UserGameController>(UserGameController);
        userGameService = module.get<UserGameService>(UserGameService);
    });

    it("should call processGameResult with correct parameters", async () => {
        const mockPayload = {
            userId: 80,
            gameId: 1,
            status: "passed",
            attempts: 3,
            maxAttempts: 5,
            gameDate: new Date(),
        };

        await userGameController.recordGameResult(mockPayload);

        expect(userGameService.processGameResult).toHaveBeenCalledWith(
            80,
            1,
            "passed",
            3,
            5,
            expect.any(Date)
        );
    });
});

describe("UserGameService", () => {
    let userGameService: UserGameService;
    let userEventsService: UserEventsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UserGameService, UserEventsService],
        }).compile();

        userGameService = module.get<UserGameService>(UserGameService);
        userEventsService = module.get<UserEventsService>(UserEventsService);
    });

    // Test de la fonction calculateScore
    describe("calculateScore", () => {
        beforeEach(() => {
            jest.clearAllMocks(); // Nettoie les mocks entre chaque test
            const dummyUserEventsService = ({
                addEvent: jest.fn(),
            } as unknown) as UserEventsService;

            userGameService = new UserGameService(dummyUserEventsService);
        });

        it("should return 100 points for the first attempt", async () => {
            const { score } = await userGameService.calculateScore(
                1,
                5,
                "passed",
                new Date()
            );
            expect(score).toBe(100); // Vérifie que le score est 100 pour la première tentative
        });

        it("should return a score less than 100 if more than one attempt", async () => {
            const { score } = await userGameService.calculateScore(
                5,
                5,
                "passed",
                new Date()
            );
            expect(score).toBeLessThan(100); // Vérifie que le score est dégressif si plus d'une tentative
            expect(score).toBeGreaterThanOrEqual(30); // Vérifie que le score est supérieur ou égal à 30
        });

        it("should return 0 points if failed", async () => {
            const { score } = await userGameService.calculateScore(
                3,
                5,
                "failed",
                new Date()
            );
            expect(score).toBe(0); // Vérifie que le score est 0 en cas d'échec
        });
    });

    describe("calculateXPAndStreak", () => {
        beforeEach(() => {
            const dummyUserEventsService = ({
                addEvent: jest.fn(),
            } as unknown) as UserEventsService;

            userGameService = new UserGameService(dummyUserEventsService);

            // 🔥 On mocke correctement Prisma en retournant un objet compatible
            jest.spyOn(prisma.userStats, "findUnique").mockResolvedValue({
                id: 1,
                userId: 1,
                xp: 100,
                level: 1,
                streak: 2,
                // Hier pour simuler un streak
                lastPlayedAt: new Date(
                    new Date().setDate(new Date().getDate() - 1)
                ),
                createdAt: new Date(),
                updatedAt: new Date(),
                user: null, // ✅ Obligatoire
            } as any); // ✅ Force le typage pour que Jest accepte

            jest.spyOn(prisma.userStats, "update").mockResolvedValue({
                id: 1,
                userId: 1,
                xp: 100,
                level: 1,
                streak: 2,
                lastPlayedAt: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
                user: null, // ✅ Obligatoire
            } as any);
        });

        it("should calculate XP and streak correctly when the user played today", async () => {
            const {
                finalXP,
                newStreak,
            } = await userGameService.calculateXPAndStreak(
                80,
                40,
                1,
                new Date(),
                "passed"
            );

            expect(finalXP).toBeGreaterThan(40); // XP doit être supérieur au score brut
            expect(newStreak).toBe(3); // Streak doit être incrémenté
        });

        it("should reset the streak if the user didn't play yesterday", async () => {
            jest.spyOn(prisma.userStats, "findUnique").mockResolvedValue({
                id: 1,
                userId: 80,
                xp: 100,
                level: 1,
                streak: 2,
                lastPlayedAt: new Date("2021-01-01"),
                createdAt: new Date(),
                updatedAt: new Date(),
                user: null, // ✅ Obligatoire
            } as any);

            const {
                finalXP,
                newStreak,
            } = await userGameService.calculateXPAndStreak(
                80,
                40,
                1,
                new Date(),
                "passed"
            );

            expect(finalXP).toBeGreaterThan(40); // XP doit être supérieur au score brut
            expect(newStreak).toBe(1); // Streak doit être réinitialisé
        });

        // Vérifier si on donne la moitié de l'xp si le jeu a été joué un autre jour
        it("should give half XP if the user played another day", async () => {
            const {
                finalXP,
                newStreak,
            } = await userGameService.calculateXPAndStreak(
                80,
                0,
                1,
                new Date("2021-01-01"),
                "passed"
            );

            expect(finalXP).toBeLessThan(40); // XP doit être inférieur à la moitié du score brut
            expect(newStreak).toBe(2); // Streak ne doit pas être incrémenté
        });
    });

    describe("saveGameResult", () => {
        beforeEach(() => {
            jest.spyOn(prisma.gameResult, "create").mockResolvedValue({
                id: 1,
                userId: 80,
                gameId: 1,
                score: 40,
                xpGained: 64,
                status: "passed",
                date: new Date(),
            } as any);
        });

        it("should save game result correctly", async () => {
            const result = await userGameService.saveGameResult(
                80, // userId
                1, // gameId
                40, // score
                64, // XP gagné
                "passed", // status
                new Date() // date du jeu
            );

            expect(prisma.gameResult.create).toHaveBeenCalledWith({
                data: {
                    userId: 80,
                    gameId: 1,
                    score: 40,
                    xpGained: 64,
                    status: "passed",
                    date: expect.any(Date), // Vérifier que la date est bien passée
                },
            });

            expect(result).toHaveProperty("score", 40);
            expect(result).toHaveProperty("xpGained", 64);
        });
    });

    describe("updateUserStats", () => {
        beforeEach(() => {
            jest.spyOn(prisma.userStats, "update").mockResolvedValue({
                id: 1,
                userId: 80,
                xp: 200,
                streak: 3,
                lastPlayedAt: new Date(),
                level: 2,
            } as any);
        });

        it("should update user stats correctly", async () => {
            const result = await userGameService.updateUserStats(
                80, // userId
                64, // XP gagné
                3, // Streak
                new Date() // Date de jeu
            );

            expect(prisma.userStats.update).toHaveBeenCalledWith({
                where: { userId: 80 },
                data: {
                    xp: { increment: 64 },
                    streak: 3,
                    lastPlayedAt: expect.any(Date),
                },
            });

            expect(result).toHaveProperty("xp", 200);
            expect(result).toHaveProperty("streak", 3);
        });
    });

    describe("handleLevelUpEvent", () => {
        beforeEach(() => {
            jest.spyOn(prisma.userStats, "findUnique").mockResolvedValue({
                id: 1,
                userId: 80,
                xp: 200,
                level: 1, // ✅ Niveau initial
                streak: 2,
                lastPlayedAt: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
                user: null,
            } as any);

            jest.spyOn(userEventsService, "addEvent").mockResolvedValue({
                id: 1,
                userId: 80,
                type: "level_up",
                details: "Niveau 2 atteint !",
                createdAt: new Date(),
            } as any);
        });

        it("should create a level up event when the user levels up", async () => {
            // 🔥 Simule un gameResult qui devrait faire monter de niveau
            const mockGameResult = {
                xpGained: 500, // Doit être assez élevé pour passer au niveau supérieur
            };

            await userGameService.handleLevelUpEvent(80, 1, mockGameResult);

            expect(userEventsService.addEvent).toHaveBeenCalledWith(
                80,
                "level_up",
                "Nouveau niveau 3 atteint !"
            );
        });
    });

    describe("handleGameEvents", () => {
        beforeEach(() => {
            jest.spyOn(userEventsService, "addEvent").mockResolvedValue({
                id: 1,
                userId: 80,
                type: "game_completed",
                details: "Jeu 1 terminé avec succès",
                createdAt: new Date(),
            } as any);
        });

        it("should create a game_completed event when the user wins", async () => {
            await userGameService.handleGameEvents(
                80,
                1,
                40,
                3,
                5,
                "passed",
                new Date()
            );

            expect(userEventsService.addEvent).toHaveBeenCalledWith(
                80,
                "game_completed",
                expect.stringContaining(
                    "Jeu 1 du 19/03/2025 terminé avec succès en 3 essais (40 points)"
                )
            );
        });

        it("should create a game_failed event when the user fails", async () => {
            await userGameService.handleGameEvents(
                80,
                1,
                0,
                3,
                5,
                "failed",
                new Date()
            );

            expect(userEventsService.addEvent).toHaveBeenCalledWith(
                80,
                "game_failed",
                expect.stringContaining("Jeu 1 échoué")
            );
        });
    });

    describe("processGameResult", () => {
        beforeEach(() => {
            userEventsService = ({
                addEvent: jest.fn(), // ✅ Transforme en mock Jest
            } as unknown) as UserEventsService;

            userGameService = new UserGameService(userEventsService);

            jest.spyOn(prisma.userStats, "findUnique").mockResolvedValue({
                id: 1,
                userId: 80,
                xp: 100,
                level: 1,
                streak: 2,
                lastPlayedAt: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
                user: null,
            } as any);

            jest.spyOn(prisma.gameResult, "create").mockResolvedValue({
                id: 1,
                userId: 80,
                gameId: 1,
                score: 90,
                xpGained: 150,
                status: "passed",
                date: new Date(),
            } as any);

            jest.spyOn(prisma.userStats, "update").mockResolvedValue({
                id: 1,
                userId: 80,
                xp: 250,
                level: 2,
                streak: 3,
                lastPlayedAt: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
            } as any);

            jest.spyOn(userEventsService, "addEvent").mockResolvedValue({
                id: 1,
                userId: 80,
                type: "game_completed",
                details: "Jeu terminé avec succès",
                createdAt: new Date(),
            } as any);
        });

        it("should correctly process a passed game result", async () => {
            const result = await userGameService.processGameResult(
                80, // userId
                1, // gameId
                3, // attempts
                5, // maxAttempts
                "passed",
                new Date() // gameDate
            );

            expect(result).toHaveProperty("userId", 80);
            expect(result).toHaveProperty("score", 90);
            expect(result).toHaveProperty("xpGained", 150);

            expect(prisma.gameResult.create).toHaveBeenCalled();
            expect(prisma.userStats.update).toHaveBeenCalled();
            expect(userEventsService.addEvent).toHaveBeenCalledWith(
                80,
                "game_completed",
                expect.stringContaining(
                    "Jeu 1 du 19/03/2025 terminé avec succès en 3 essais (40 points)"
                )
            );
        });

        it("should correctly process a failed game result", async () => {
            jest.spyOn(prisma.gameResult, "create").mockResolvedValue({
                id: 1,
                userId: 80,
                gameId: 1,
                score: 0,
                xpGained: 0,
                status: "failed",
                date: new Date(),
            } as any);

            await userGameService.processGameResult(
                80,
                1,
                5,
                5,
                "failed",
                new Date()
            );

            expect(userEventsService.addEvent).toHaveBeenCalledWith(
                80,
                "game_failed",
                expect.stringContaining("Jeu 1 échoué")
            );
        });
    });

    describe("handlingErrors", () => {
        beforeEach(() => {
            // ✅ Mock `findUnique` pour renvoyer `null`
            jest.spyOn(prisma.userStats, "findUnique").mockResolvedValue(null);

            // ✅ Mock `update` pour simuler une erreur
            jest.spyOn(prisma.userStats, "update").mockRejectedValue(
                new Error("Erreur Prisma update")
            );

            // ✅ Mock `create` pour simuler une erreur d'insertion
            jest.spyOn(prisma.gameResult, "create").mockRejectedValue(
                new Error("Erreur Prisma create")
            );

            // ✅ Mock `addEvent` pour simuler une erreur lors de la création d'un événement
            jest.spyOn(userEventsService, "addEvent").mockRejectedValue(
                new Error("Erreur lors de l'ajout de l'événement")
            );
        });

        it("should throw an error if userStats is not found", async () => {
            jest.spyOn(prisma.userStats, "findUnique").mockResolvedValue(null);

            await expect(
                userGameService.processGameResult(
                    80,
                    1,
                    3,
                    5,
                    "passed",
                    new Date()
                )
            ).rejects.toThrow("Utilisateur non trouvé");
        });

        it("should throw an error if updating userStats fails", async () => {
            jest.spyOn(prisma.userStats, "update").mockRejectedValue(
                new Error("Utilisateur non trouvé")
            );

            await expect(
                userGameService.processGameResult(
                    80,
                    1,
                    3,
                    5,
                    "passed",
                    new Date()
                )
            ).rejects.toThrow("Utilisateur non trouvé");
        });

        it("should throw an error if saving gameResult fails", async () => {
            // Mocker le fait de recevoir un utilisateur valide
            jest.spyOn(prisma.userStats, "findUnique").mockResolvedValue({
                id: 1,
                userId: 80,
                xp: 100,
                level: 1,
                streak: 2,
                lastPlayedAt: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
                user: null,
            } as any);

            jest.spyOn(prisma.gameResult, "create").mockRejectedValue(
                new Error("Erreur lors de l'enregistrement du résultat")
            );

            await expect(
                userGameService.processGameResult(
                    80,
                    1,
                    3,
                    5,
                    "passed",
                    new Date()
                )
            ).rejects.toThrow("Erreur lors de l'enregistrement du résultat");
        });

        it("should throw an error if adding an event fails", async () => {
            // Mocker le fait de recevoir un utilisateur valide
            jest.spyOn(prisma.userStats, "findUnique").mockResolvedValue({
                id: 1,
                userId: 80,
                xp: 100,
                level: 1,
                streak: 2,
                lastPlayedAt: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
                user: null,
            } as any);
            jest.spyOn(userEventsService, "addEvent").mockRejectedValue(
                new Error("Erreur Prisma create")
            );

            await expect(
                userGameService.processGameResult(
                    80,
                    1,
                    3,
                    5,
                    "passed",
                    new Date()
                )
            ).rejects.toThrow("Erreur Prisma create");
        });

        it("should throw an error if userId is invalid", async () => {
            await expect(
                userGameService.processGameResult(
                    null as any, // 👈 On passe `null` pour voir si une erreur est levée
                    1,
                    3,
                    5,
                    "passed",
                    new Date()
                )
            ).rejects.toThrow("Utilisateur non trouvé");
        });

        it("should throw an error if gameId is invalid", async () => {
            // Mocker le fait de recevoir un utilisateur valide
            jest.spyOn(prisma.userStats, "findUnique").mockResolvedValue({
                id: 1,
                userId: 80,
                xp: 100,
                level: 1,
                streak: 2,
                lastPlayedAt: new Date(),
                createdAt: new Date(),
                updatedAt: new Date(),
                user: null,
            } as any);
            await expect(
                userGameService.processGameResult(
                    80,
                    null as any, // 👈 On passe `null` pour voir si une erreur est levée
                    3,
                    5,
                    "passed",
                    new Date()
                )
            ).rejects.toThrow("Jeu non trouvé");
        });
    });
});
