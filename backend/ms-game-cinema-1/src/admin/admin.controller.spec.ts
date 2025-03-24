import { Test, TestingModule } from "@nestjs/testing";
import { AdminController } from "./admin.controller";
import { AdminService } from "./admin.service";

describe("AdminController", () => {
    let controller: AdminController;
    let service: AdminService;

    const mockAdminService = {
        generateGameDays: jest.fn(),
        getGameDaysStatus: jest.fn(),
        regenerateGameDay: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [AdminController],
            providers: [
                {
                    provide: AdminService,
                    useValue: mockAdminService,
                },
            ],
        }).compile();

        controller = module.get<AdminController>(AdminController);
        service = module.get<AdminService>(AdminService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should call generateGameDays with correct parameters", async () => {
        const payload = { startDate: "2024-03-01", endDate: "2024-03-31" };
        mockAdminService.generateGameDays.mockResolvedValue("days_generated");

        const result = await controller.generateGameDays(payload);
        expect(service.generateGameDays).toHaveBeenCalledWith("2024-03-01", "2024-03-31");
        expect(result).toBe("days_generated");
    });

    it("should call getGameDaysStatus with correct month", async () => {
        const payload = { month: "2024-03" };
        mockAdminService.getGameDaysStatus.mockResolvedValue("status");

        const result = await controller.getGameDaysStatus(payload);
        expect(service.getGameDaysStatus).toHaveBeenCalledWith("2024-03");
        expect(result).toBe("status");
    });

    it("should call regenerateGameDay with correct date", async () => {
        const payload = { date: "2024-03-24" };
        mockAdminService.regenerateGameDay.mockResolvedValue("regenerated");

        const result = await controller.regenerateGameDay(payload);
        expect(service.regenerateGameDay).toHaveBeenCalledWith("2024-03-24");
        expect(result).toBe("regenerated");
    });
});
