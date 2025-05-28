import { Test, TestingModule } from "@nestjs/testing";
import { EventCleanupJob } from "./eventCleanUp.cron";
import prisma from "../prisma/prisma.service";

jest.mock("../prisma/prisma.service", () => {
    return {
        __esModule: true,
        default: {
            userEvent: {
                deleteMany: jest.fn(),
            },
        },
    };
});

describe("EventCleanupJob", () => {
    let eventCleanupJob: EventCleanupJob;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [EventCleanupJob],
        }).compile();

        eventCleanupJob = module.get<EventCleanupJob>(EventCleanupJob);

        jest.clearAllMocks(); // ✅ Nettoie les mocks entre chaque test
    });

    it("should execute removeExpiredEvents and call deleteMany", async () => {
        jest.spyOn(prisma.userEvent, "deleteMany").mockResolvedValue({
            count: 3,
        } as any);

        await eventCleanupJob.removeExpiredEvents();

        expect(prisma.userEvent.deleteMany).toHaveBeenCalledTimes(3);
        expect(prisma.userEvent.deleteMany).toHaveBeenCalledWith({
            where: {
                type: "game_completed",
                createdAt: { lte: expect.any(Date) },
            },
        });
        expect(prisma.userEvent.deleteMany).toHaveBeenCalledWith({
            where: {
                type: "game_failed",
                createdAt: { lte: expect.any(Date) },
            },
        });
        expect(prisma.userEvent.deleteMany).toHaveBeenCalledWith({
            where: {
                type: "game_completed_old",
                createdAt: { lte: expect.any(Date) },
            },
        });
    });
});
