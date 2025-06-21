import { Test, TestingModule } from "@nestjs/testing";
import { StreakResetJob } from "./streakReset.cron";
import prisma from "../prisma/prisma.service";

jest.mock("../prisma/prisma.service", () => {
    return {
        __esModule: true,
        default: {
            userStats: {
                findMany: jest.fn(),
                updateMany: jest.fn(),
            },
        },
    };
});

describe("StreakResetJob", () => {
    let streakResetJob: StreakResetJob;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [StreakResetJob],
        }).compile();

        streakResetJob = module.get<StreakResetJob>(StreakResetJob);

        jest.clearAllMocks(); // ✅ Nettoie les mocks entre chaque test
    });

    it("should reset expired streaks when users are found", async () => {
        // ✅ Simuler des utilisateurs ayant un streak actif mais expiré
        jest.spyOn(prisma.userStats, "findMany").mockResolvedValue([
            {
                userId: 1,
                streak: 5,
                lastPlayedAt: new Date("2025-03-17T00:00:00Z"),
            },
            {
                userId: 2,
                streak: 3,
                lastPlayedAt: new Date("2025-03-16T00:00:00Z"),
            },
        ] as any);

        jest.spyOn(prisma.userStats, "updateMany").mockResolvedValue({
            count: 2,
        } as any);

        await streakResetJob.resetExpiredStreaks();

        expect(prisma.userStats.findMany).toHaveBeenCalledWith({
            where: {
                lastPlayedAt: { lt: expect.any(Date) },
                streak: { gt: 0 },
            },
        });

        expect(prisma.userStats.updateMany).toHaveBeenCalledWith({
            where: { userId: { in: [1, 2] } },
            data: { streak: 0 },
        });
    });

    it("should not reset streaks if no users are found", async () => {
        // ✅ Simuler qu'aucun utilisateur n'a un streak expiré
        jest.spyOn(prisma.userStats, "findMany").mockResolvedValue([]);

        await streakResetJob.resetExpiredStreaks();

        expect(prisma.userStats.findMany).toHaveBeenCalled();
        expect(prisma.userStats.updateMany).not.toHaveBeenCalled();
    });
});
