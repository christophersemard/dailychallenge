import { Controller, Get, Query, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/auth.guard";
import { LeaderboardService } from "./leaderboard.service";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { LeaderboardResponse } from "./leaderboard.types";
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
            req.user.id,
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
            req.user.id,
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
        console.log("getGameLeaderboard", {
            userId: req.user.id,
            gameId,
            limit,
            offset,
            dateStart,
            dateEnd,
        });
        return this.leaderboardService.getGameLeaderboard(
            req.user.id,
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
            req.user.id,
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
            req.user.id,
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
            req.user.id,
            Number(gameId),
            limit,
            offset,
            dateStart ? new Date(dateStart) : undefined,
            dateEnd ? new Date(dateEnd) : undefined
        );
    }

    @Get("games-and-categories")
    @ApiOperation({ summary: "Récupérer les jeux et catégories" })
    async getGamesAndCategories() {
        return this.leaderboardService.getGamesAndCategories();
    }
}
