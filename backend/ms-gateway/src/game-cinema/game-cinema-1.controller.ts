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
import {
    GameCinema1Service,
    GameData,
    GuessResponse,
    GameResult,
} from "./game-cinema-1.service";
import { UserRequest } from "../auth/auth.types"; // ✅ Type pour `req.user`

@Controller("api/game-cinema-1")
export class GameCinema1Controller {
    constructor(private readonly gameCinema1Service: GameCinema1Service) {}

    @UseGuards(JwtAuthGuard)
    @Get("today")
    async getTodayGame(@Req() req: UserRequest): Promise<GameData> {
        return this.gameCinema1Service.getTodayGame(req.user.id);
    }

    @UseGuards(JwtAuthGuard)
    @Get("by-date/:date")
    async getGameByDate(
        @Req() req: UserRequest,
        @Param("date") date: string
    ): Promise<GameData> {
        return this.gameCinema1Service.getGameByDate(req.user.id, date);
    }

    @UseGuards(JwtAuthGuard)
    @Post("guess")
    async submitGuess(
        @Req() req: UserRequest,
        @Body() { guess, date }: { guess: string; date?: string }
    ): Promise<GuessResponse> {
        return this.gameCinema1Service.submitGuess(req.user.id, guess, date);
    }

    @Get("search")
    async searchMovie(
        @Query("query") query: string
    ): Promise<{ id: number; title: string; originalTitle: string }[]> {
        return this.gameCinema1Service.searchMovie(query);
    }

    @UseGuards(JwtAuthGuard)
    @Get("result")
    async getGameResult(
        @Req() req: UserRequest,
        @Query("date") date?: string // ✅ `date` récupéré via Query
    ): Promise<GameResult | null> {
        return this.gameCinema1Service.getGameResult(req.user.id, date);
    }
}
