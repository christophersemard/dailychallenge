import {
    Controller,
    Get,
    Post,
    Query,
    Body,
    Param,
    Req,
    UseGuards,
} from "@nestjs/common";
import { JwtAuthGuard } from "../auth/auth.guard"; // ✅ Import du Guard
import { GameCinema2Service } from "./game-cinema-2.service";
import { UserRequest } from "../auth/auth.types"; // ✅ Type pour `req.user`
import { GameData, GuessResponse, GameResult } from "./game.types"; // ✅ Import des types

@Controller("api/game-cinema-2")
export class GameCinema2Controller {
    constructor(private readonly gameCinema2Service: GameCinema2Service) {}

    @UseGuards(JwtAuthGuard)
    @Get("today")
    async getTodayGame(@Req() req: UserRequest): Promise<GameData> {
        return this.gameCinema2Service.getTodayGame(req.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Get("by-date/:date")
    async getGameByDate(
        @Req() req: UserRequest,
        @Param("date") date: string
    ): Promise<GameData> {
        return this.gameCinema2Service.getGameByDate(req.user.id, date);
    }

    @UseGuards(JwtAuthGuard)
    @Post("guess")
    async submitGuess(
        @Req() req: UserRequest,
        @Body() { guess, date }: { guess: number; date?: string }
    ): Promise<GuessResponse> {
        return this.gameCinema2Service.submitGuess(req.user.id, guess, date);
    }

    @Get("search")
    async searchMovie(
        @Query("query") query: string
    ): Promise<{ id: number; title: string; originalTitle: string }[]> {
        return this.gameCinema2Service.searchMovie(query);
    }

    @UseGuards(JwtAuthGuard)
    @Get("result")
    async getGameResult(
        @Req() req: UserRequest,
        @Query("date") date?: string // ✅ `date` récupéré via Query
    ): Promise<GameResult | null> {
        return this.gameCinema2Service.getGameResult(req.user.id, date);
    }

    @UseGuards(JwtAuthGuard)
    @Get("user-results")
    async getUserResultsByMonth(
        @Req() req: UserRequest,
        @Query("month") month: string // ✅ `month` récupéré via Query
    ): Promise<GameResult[]> {
        return this.gameCinema2Service.getUserResultsByMonth(
            req.user.id,
            month
        );
    }
}
