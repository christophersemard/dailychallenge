import { Test, TestingModule } from "@nestjs/testing";
import { AdminService } from "./admin.service";
import prisma from "../prisma/prisma.service";

jest.mock("../prisma/prisma.service", () => ({
    __esModule: true,
    default: {
        gameMusic1Days: {
            deleteMany: jest.fn(),
            findMany: jest.fn(),
            create: jest.fn(),
        },
        dataArtist: {
            findMany: jest.fn(),
        },
        game: {
            update: jest.fn(),
        },
    },
}));

describe("AdminService - GameMusic1", () => {
    let service: AdminService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [AdminService],
        }).compile();

        service = module.get<AdminService>(AdminService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    describe("generateGameDays", () => {
        it("should call regenerateGameDay for each date", async () => {
            const spy = jest
                .spyOn(service, "regenerateGameDay")
                .mockResolvedValue({} as any);

            const result = await service.generateGameDays(
                "2024-03-01",
                "2024-03-03"
            );

            expect(spy).toHaveBeenCalledTimes(3);
            expect(result).toEqual({
                message: "Jeux générés entre 2024-03-01 et 2024-03-03",
            });
        });
    });

    describe("getGameDaysStatus", () => {
        it("should return upcoming and missing days", async () => {
            const existingDates = [
                { date: new Date("2024-03-01") },
                { date: new Date("2024-03-02") },
            ];

            jest.spyOn(prisma.gameMusic1Days, "findMany").mockResolvedValue(
                existingDates as any
            );

            const result = await service.getGameDaysStatus("2024-03");

            expect(result.upcoming).toContain("2024-03-01");
            expect(result.upcoming).toContain("2024-03-02");
            expect(result.missingDays).toContain("2024-03-03");
        });
    });

    describe("regenerateGameDay", () => {
        it("should throw error if no artist is available", async () => {
            jest.spyOn(prisma.gameMusic1Days, "deleteMany").mockResolvedValue(
                {} as any
            );
            jest.spyOn(prisma.gameMusic1Days, "findMany").mockResolvedValue(
                [] as any
            );
            jest.spyOn(prisma.dataArtist, "findMany").mockResolvedValue(
                [] as any
            );

            await expect(
                service.regenerateGameDay("2024-03-01")
            ).rejects.toThrow("Pas assez d'artistes disponibles !");
        });

        it("should create a new game day with a random artist", async () => {
            jest.spyOn(prisma.gameMusic1Days, "deleteMany").mockResolvedValue(
                {} as any
            );
            jest.spyOn(prisma.gameMusic1Days, "findMany").mockResolvedValue([
                { artistId: "a" },
                { artistId: "b" },
            ] as any);
            jest.spyOn(prisma.dataArtist, "findMany").mockResolvedValue([
                {
                    id: "c",
                    name: "Daft Punk",
                    songs: [{ title: "One More Time" }],
                },
                {
                    id: "d",
                    name: "Justice",
                    songs: [{ title: "D.A.N.C.E." }],
                },
            ] as any);
            const createSpy = jest
                .spyOn(prisma.gameMusic1Days, "create")
                .mockResolvedValue({} as any);

            const result = await service.regenerateGameDay("2024-03-01");
            expect(createSpy).toHaveBeenCalled();
            expect(result.message).toContain("assigné au 2024-03-01");
        });
    });

    describe("updateGameStatus", () => {
        it("should update game status", async () => {
            const spy = jest
                .spyOn(prisma.game, "update")
                .mockResolvedValue({} as any);

            const result = await service.updateGameStatus("unavailable");

            expect(spy).toHaveBeenCalledWith({
                where: { id: 5 },
                data: { status: "unavailable" },
            });
            expect(result).toEqual({
                message: "Statut du jeu mis à jour : unavailable",
            });
        });
    });
});
