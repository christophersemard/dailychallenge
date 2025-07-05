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
import { GameMusic1Service } from "./game-music-1.service";
import { UserRequest } from "../auth/auth.types"; // ✅ Type pour `req.user`
import { GameData, GuessResponse, GameResult } from "./game.types"; // ✅ Import des types

@Controller("api/game-music-1")
export class GameMusic1Controller {
    constructor(private readonly gameMusic1Service: GameMusic1Service) {}

    @UseGuards(JwtAuthGuard)
    @Get("today")
    async getTodayGame(@Req() req: UserRequest): Promise<GameData> {
        return this.gameMusic1Service.getTodayGame({
            id: req.user.id,
            username: req.user.pseudo,
        });
    }

    @UseGuards(JwtAuthGuard)
    @Get("by-date/:date")
    async getGameByDate(
        @Req() req: UserRequest,
        @Param("date") date: string
    ): Promise<GameData> {
        return this.gameMusic1Service.getGameByDate(
            {
                id: req.user.id,
                username: req.user.pseudo,
            },
            date
        );
    }

    @UseGuards(JwtAuthGuard)
    @Post("guess")
    async submitGuess(
        @Req() req: UserRequest,
        @Body() { guess, date }: { guess: number; date?: string }
    ): Promise<GuessResponse> {
        return this.gameMusic1Service.submitGuess(
            {
                id: req.user.id,
                username: req.user.pseudo,
            },
            guess,
            date
        );
    }

    @Get("search")
    async searchMovie(
        @Query("query") query: string
    ): Promise<{ id: number; title: string; originalTitle: string }[]> {
        return this.gameMusic1Service.searchMovie(query);
    }

    @UseGuards(JwtAuthGuard)
    @Get("result")
    async getGameResult(
        @Req() req: UserRequest,
        @Query("date") date?: string // ✅ `date` récupéré via Query
    ): Promise<GameResult | null> {
        return this.gameMusic1Service.getGameResult(
            {
                id: req.user.id,
                username: req.user.pseudo,
            },
            date
        );
    }

    @UseGuards(JwtAuthGuard)
    @Get("user-results")
    async getUserResultsByMonth(
        @Req() req: UserRequest,
        @Query("month") month: string // ✅ `month` récupéré via Query
    ): Promise<GameResult[]> {
        return this.gameMusic1Service.getUserResultsByMonth(
            {
                id: req.user.id,
                username: req.user.pseudo,
            },
            month
        );
    }
}
