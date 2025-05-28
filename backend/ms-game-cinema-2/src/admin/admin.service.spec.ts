import { Test, TestingModule } from "@nestjs/testing";
import { AdminService } from "./admin.service";
import prisma from "../prisma/prisma.service";

jest.mock("../prisma/prisma.service", () => ({
    __esModule: true,
    default: {
        gameCinema2Days: {
            deleteMany: jest.fn(),
            findMany: jest.fn(),
            create: jest.fn(),
        },
        dataMovie: {
            findMany: jest.fn(),
        },
    },
}));

describe("AdminService", () => {
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

            jest.spyOn(prisma.gameCinema2Days, "findMany").mockResolvedValue(
                existingDates as any
            );

            const result = await service.getGameDaysStatus("2024-03");

            expect(result.upcoming).toContain("2024-03-01");
            expect(result.upcoming).toContain("2024-03-02");
            expect(result.missingDays).toContain("2024-03-03");
        });
    });

    describe("regenerateGameDay", () => {
        it("should throw error if no movie is available", async () => {
            jest.spyOn(prisma.gameCinema2Days, "deleteMany").mockResolvedValue(
                {} as any
            );
            jest.spyOn(prisma.gameCinema2Days, "findMany").mockResolvedValue(
                [] as any
            );
            jest.spyOn(prisma.dataMovie, "findMany").mockResolvedValue(
                [] as any
            );

            await expect(
                service.regenerateGameDay("2024-03-01")
            ).rejects.toThrow("Pas assez de films disponibles !");
        });

        it("should create a new game day with a random movie", async () => {
            jest.spyOn(prisma.gameCinema2Days, "deleteMany").mockResolvedValue(
                {} as any
            );
            jest.spyOn(prisma.gameCinema2Days, "findMany").mockResolvedValue([
                { movieId: 1 },
                { movieId: 2 },
            ] as any);
            jest.spyOn(prisma.dataMovie, "findMany").mockResolvedValue([
                { id: 3, title: "Inception" },
                { id: 4, title: "Matrix" },
            ] as any);
            const createSpy = jest
                .spyOn(prisma.gameCinema2Days, "create")
                .mockResolvedValue({} as any);

            const result = await service.regenerateGameDay("2024-03-01");
            expect(createSpy).toHaveBeenCalled();
            expect(result.message).toContain("assigné au 2024-03-01");
        });
    });
});
