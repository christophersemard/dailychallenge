import { Test, TestingModule } from "@nestjs/testing";
import { UserEventsService } from "./user-events.service";
import prisma from "../prisma/prisma.service";

describe("UserEventsService", () => {
    let userEventsService: UserEventsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [UserEventsService],
        }).compile();

        userEventsService = module.get<UserEventsService>(UserEventsService);

        jest.clearAllMocks(); // ✅ Nettoie les mocks entre chaque test
    });

    describe("addEvent", () => {
        beforeEach(() => {
            jest.spyOn(prisma.userEvent, "create").mockResolvedValue({
                id: 1,
                userId: 80,
                type: "level_up",
                details: "Niveau 2 atteint",
                createdAt: new Date(),
            } as any);
        });

        it("should call Prisma to create an event", async () => {
            await userEventsService.addEvent(
                80,
                "level_up",
                "Niveau 2 atteint"
            );

            expect(prisma.userEvent.create).toHaveBeenCalledWith({
                data: {
                    userId: 80,
                    type: "level_up",
                    details: "Niveau 2 atteint",
                },
            });
        });
    });

    describe("getUserEvents", () => {
        beforeEach(() => {
            jest.spyOn(prisma.userEvent, "findMany").mockResolvedValue([
                {
                    id: 1,
                    userId: 80,
                    type: "level_up",
                    details: "Niveau 2 atteint",
                    createdAt: new Date("2025-03-18T12:00:00Z"),
                },
                {
                    id: 2,
                    userId: 80,
                    type: "game_completed",
                    details: "Jeu terminé avec succès",
                    createdAt: new Date("2025-03-17T12:00:00Z"),
                },
            ] as any);
        });

        it("should return a list of user events ordered by date", async () => {
            const events = await userEventsService.getUserEvents(80);

            expect(prisma.userEvent.findMany).toHaveBeenCalledWith({
                where: { userId: 80 },
                orderBy: { createdAt: "desc" },
            });

            expect(events).toHaveLength(2);
            expect(events[0].type).toBe("level_up");
            expect(events[1].type).toBe("game_completed");
        });
    });
});
