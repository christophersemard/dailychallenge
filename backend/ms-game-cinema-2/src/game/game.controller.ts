import { Controller } from "@nestjs/common";
import { MessagePattern, Payload } from "@nestjs/microservices";
import { GameService } from "./game.service";

@Controller()
export class GameController {
    constructor(private readonly gameService: GameService) {}

    @MessagePattern("get_today_game")
    async getTodayGame(@Payload() { userId }: { userId: number }) {
        return this.gameService.getTodayGame(userId);
    }

    @MessagePattern("get_game_by_date")
    async getGameByDate(
        @Payload() { userId, date }: { userId: number; date: string }
    ) {
        return this.gameService.getGameByDate(userId, date);
    }

    @MessagePattern("submit_guess")
    async submitGuess(
        @Payload()
        {
            userId,
            guess,
            date,
        }: {
            userId: number;
            guess: string;
            date?: string;
        }
    ) {
        return this.gameService.submitGuess(userId, guess, date);
    }

    @MessagePattern("search_movie")
    async searchMovie(@Payload() { query }: { query: string }) {
        return this.gameService.searchMovie(query);
    }

    @MessagePattern("get_game_result")
    async getGameResult(
        @Payload() { userId, date }: { userId: number; date?: string }
    ) {
        return this.gameService.getGameResult(userId, date);
    }

    // Récupérer les résultats d'un utilisateur sur un mois donné
    @MessagePattern("get_user_results_by_month")
    async getUserResultsByMonth(
        @Payload()
        { userId, month }: { userId: number; month: string }
    ) {
        return this.gameService.getUserResultsByMonth(userId, month);
    }
}
