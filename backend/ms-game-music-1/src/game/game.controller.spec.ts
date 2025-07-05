import { Test, TestingModule } from "@nestjs/testing";
import { GameController } from "./game.controller";
import { GameService } from "./game.service";

describe("GameController", () => {
    let controller: GameController;
    let service: GameService;

    const mockGameService = {
        getTodayGame: jest.fn(),
        getGameByDate: jest.fn(),
        submitGuess: jest.fn(),
        searchArtist: jest.fn(),
        getGameResult: jest.fn(),
    };

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [GameController],
            providers: [
                {
                    provide: GameService,
                    useValue: mockGameService,
                },
            ],
        }).compile();

        controller = module.get<GameController>(GameController);
        service = module.get<GameService>(GameService);
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it("should call getTodayGame with correct userId", async () => {
        const payload = { userId: 42 };
        mockGameService.getTodayGame.mockResolvedValue("today_game");

        const result = await controller.getTodayGame(payload);
        expect(service.getTodayGame).toHaveBeenCalledWith(42);
        expect(result).toBe("today_game");
    });

    it("should call getGameByDate with correct parameters", async () => {
        const payload = { userId: 1, date: "2024-03-24" };
        mockGameService.getGameByDate.mockResolvedValue("game_by_date");

        const result = await controller.getGameByDate(payload);
        expect(service.getGameByDate).toHaveBeenCalledWith(1, "2024-03-24");
        expect(result).toBe("game_by_date");
    });

    it("should call submitGuess with correct parameters", async () => {
        const payload = { userId: 1, guess: "123", date: "2024-03-24" };
        mockGameService.submitGuess.mockResolvedValue("submit_result");

        const result = await controller.submitGuess(payload);
        expect(service.submitGuess).toHaveBeenCalledWith(
            1,
            "123",
            "2024-03-24"
        );
        expect(result).toBe("submit_result");
    });

    it("should call searchArtist with correct query", async () => {
        const payload = { query: "inception" };
        mockGameService.searchArtist.mockResolvedValue(["movie1"]);

        const result = await controller.searchArtist(payload);
        expect(service.searchArtist).toHaveBeenCalledWith("inception");
        expect(result).toEqual(["movie1"]);
    });

    it("should call getGameResult with correct parameters", async () => {
        const payload = { userId: 1, date: "2024-03-24" };
        mockGameService.getGameResult.mockResolvedValue("game_result");

        const result = await controller.getGameResult(payload);
        expect(service.getGameResult).toHaveBeenCalledWith(1, "2024-03-24");
        expect(result).toBe("game_result");
    });
});
