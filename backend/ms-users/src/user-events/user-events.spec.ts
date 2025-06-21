jest.mock("../prisma/prisma.service", () => {
    return {
        __esModule: true,
        default: {
            user: {
                findUnique: jest.fn(),
            },
            userEvent: {
                create: jest.fn(),
                findMany: jest.fn(),
            },
        },
    };
});

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
        jest.clearAllMocks();
    });

    describe("addEvent", () => {
        it("should throw if userId or type is missing", async () => {
            await expect(userEventsService.addEvent(0, "")).rejects.toThrow(
                "userId and type are required."
            );
        });

        it("should throw if user not found", async () => {
            (prisma.user.findUnique as jest.Mock).mockResolvedValue(null);

            await expect(
                userEventsService.addEvent(42, "level_up")
            ).rejects.toThrow("User not found.");
        });

        it("should create an event with all optional fields", async () => {
            (prisma.user.findUnique as jest.Mock).mockResolvedValue({ id: 42 });

            const mockEvent = {
                id: 1,
                type: "game_completed",
                createdAt: new Date(),
            };

            (prisma.userEvent.create as jest.Mock).mockResolvedValue(mockEvent);

            const result = await userEventsService.addEvent(
                42,
                "game_completed",
                12, // avatarAssetId
                99, // friendId
                { id: 33 }, // gameResult
                5, // levelUp
                3 // attempts
            );

            expect(prisma.user.findUnique).toHaveBeenCalledWith({
                where: { id: 42, deletedAt: null },
            });

            expect(prisma.userEvent.create).toHaveBeenCalledWith({
                data: {
                    userId: 42,
                    type: "game_completed",
                    avatarAssetId: 12,
                    friendId: 99,
                    gameResultId: 33,
                    levelUp: 5,
                    attempts: 3,
                },
            });

            expect(result).toEqual(mockEvent);
        });
    });

    describe("getUserEvents", () => {
        it("should return events for a user ordered by date", async () => {
            const events = [
                {
                    id: 1,
                    type: "level_up",
                    levelUp: 2,
                    attempts: null,
                    createdAt: new Date(),
                    gameResult: null,
                },
            ];

            (prisma.userEvent.findMany as jest.Mock).mockResolvedValue(events);

            const result = await userEventsService.getUserEvents(42);

            expect(prisma.userEvent.findMany).toHaveBeenCalledWith({
                where: { userId: 42 },
                orderBy: { createdAt: "desc" },
                select: {
                    id: true,
                    createdAt: true,
                    type: true,
                    levelUp: true,
                    attempts: true,
                    gameResult: true,
                },
            });

            expect(result).toEqual(events);
        });
    });
});
