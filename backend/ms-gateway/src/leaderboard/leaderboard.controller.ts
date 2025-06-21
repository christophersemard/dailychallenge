import { Controller, Get, Query, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/auth.guard";
import { LeaderboardService } from "./leaderboard.service";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { LeaderboardResponse } from "./leaderboard.types";
import { Public } from "../auth/public.decorator";
import { UserRequest } from "../auth/auth.types";

@ApiTags("Leaderboard")
@Controller("api/leaderboard")
export class LeaderboardController {
    constructor(private leaderboardService: LeaderboardService) {}

    @UseGuards(JwtAuthGuard)
    @Get("global")
    @ApiOperation({ summary: "Classement global" })
    async getGlobalLeaderboard(
        @Req() req: UserRequest,
        @Query("limit") limit = 10,
        @Query("offset") offset = 0,
        @Query("dateStart") dateStart?: string,
        @Query("dateEnd") dateEnd?: string
    ): Promise<LeaderboardResponse> {
        return this.leaderboardService.getGlobalLeaderboard(
            {
                id: req.user.id,
                username: req.user.pseudo,
            },
            limit,
            offset,
            dateStart ? new Date(dateStart) : undefined,
            dateEnd ? new Date(dateEnd) : undefined
        );
    }

    @UseGuards(JwtAuthGuard)
    @Get("category")
    @ApiOperation({ summary: "Classement par catégorie" })
    async getCategoryLeaderboard(
        @Req() req: UserRequest,
        @Query("category") category: string,
        @Query("limit") limit = 10,
        @Query("offset") offset = 0,
        @Query("dateStart") dateStart?: string,
        @Query("dateEnd") dateEnd?: string
    ): Promise<LeaderboardResponse> {
        return this.leaderboardService.getCategoryLeaderboard(
            {
                id: req.user.id,
                username: req.user.pseudo,
            },
            Number(category),
            limit,
            offset,
            dateStart ? new Date(dateStart) : undefined,
            dateEnd ? new Date(dateEnd) : undefined
        );
    }

    @UseGuards(JwtAuthGuard)
    @Get("game")
    @ApiOperation({ summary: "Classement d’un jeu spécifique" })
    async getGameLeaderboard(
        @Req() req: UserRequest,
        @Query("gameId") gameId: number,
        @Query("limit") limit = 10,
        @Query("offset") offset = 0,
        @Query("dateStart") dateStart?: string,
        @Query("dateEnd") dateEnd?: string
    ): Promise<LeaderboardResponse> {
        return this.leaderboardService.getGameLeaderboard(
            {
                id: req.user.id,
                username: req.user.pseudo,
            },
            Number(gameId),
            limit,
            offset,
            dateStart ? new Date(dateStart) : undefined,
            dateEnd ? new Date(dateEnd) : undefined
        );
    }

    @UseGuards(JwtAuthGuard)
    @Get("friends")
    @ApiOperation({ summary: "Classement des amis" })
    async getFriendsLeaderboard(
        @Req() req: UserRequest,
        @Query("limit") limit = 10,
        @Query("offset") offset = 0,
        @Query("dateStart") dateStart?: string,
        @Query("dateEnd") dateEnd?: string
    ): Promise<LeaderboardResponse> {
        return this.leaderboardService.getFriendsLeaderboard(
            {
                id: req.user.id,
                username: req.user.pseudo,
            },
            limit,
            offset,
            dateStart ? new Date(dateStart) : undefined,
            dateEnd ? new Date(dateEnd) : undefined
        );
    }

    @UseGuards(JwtAuthGuard)
    @Get("friends/category")
    @ApiOperation({ summary: "Classement des amis par catégorie" })
    async getFriendsCategoryLeaderboard(
        @Req() req: UserRequest,
        @Query("category") category: string,
        @Query("limit") limit = 10,
        @Query("offset") offset = 0,
        @Query("dateStart") dateStart?: string,
        @Query("dateEnd") dateEnd?: string
    ): Promise<LeaderboardResponse> {
        return this.leaderboardService.getFriendsCategoryLeaderboard(
            {
                id: req.user.id,
                username: req.user.pseudo,
            },
            Number(category),
            limit,
            offset,
            dateStart ? new Date(dateStart) : undefined,
            dateEnd ? new Date(dateEnd) : undefined
        );
    }

    @UseGuards(JwtAuthGuard)
    @Get("friends/game")
    @ApiOperation({ summary: "Classement des amis pour un jeu spécifique" })
    async getFriendsGameLeaderboard(
        @Req() req: UserRequest,
        @Query("gameId") gameId: number,
        @Query("limit") limit = 10,
        @Query("offset") offset = 0,
        @Query("dateStart") dateStart?: string,
        @Query("dateEnd") dateEnd?: string
    ): Promise<LeaderboardResponse> {
        return this.leaderboardService.getFriendsGameLeaderboard(
            {
                id: req.user.id,
                username: req.user.pseudo,
            },
            Number(gameId),
            limit,
            offset,
            dateStart ? new Date(dateStart) : undefined,
            dateEnd ? new Date(dateEnd) : undefined
        );
    }

    @Public()
    @Get("games-and-categories")
    @ApiOperation({ summary: "Récupérer les jeux et catégories" })
    async getGamesAndCategories() {
        return this.leaderboardService.getGamesAndCategories();
    }
}
