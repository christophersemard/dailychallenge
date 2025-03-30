import { Controller, Get, Query, Req, UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/auth.guard";
import { LeaderboardService } from "./leaderboard.service";
import { ApiTags, ApiOperation } from "@nestjs/swagger";
import { LeaderboardEntry } from "./leaderboard.types";
import { UserRequest } from "../auth/auth.types";

@ApiTags("Leaderboard")
@Controller("api/leaderboard")
export class LeaderboardController {
    constructor(private leaderboardService: LeaderboardService) {}

    @UseGuards(JwtAuthGuard)
    @Get("global")
    @ApiOperation({ summary: "Classement global" })
    async getGlobalLeaderboard(
        @Query("limit") limit = 10,
        @Query("offset") offset = 0,
        @Query("dateStart") dateStart?: string,
        @Query("dateEnd") dateEnd?: string
    ): Promise<LeaderboardEntry[]> {
        return await this.leaderboardService.getGlobalLeaderboard(
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
        @Query("category") category: string,
        @Query("limit") limit = 10,
        @Query("offset") offset = 0,
        @Query("dateStart") dateStart?: string,
        @Query("dateEnd") dateEnd?: string
    ): Promise<LeaderboardEntry[]> {
        return await this.leaderboardService.getCategoryLeaderboard(
            category,
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
        @Query("gameId") gameId: number,
        @Query("limit") limit = 10,
        @Query("offset") offset = 0,
        @Query("dateStart") dateStart?: string,
        @Query("dateEnd") dateEnd?: string
    ): Promise<LeaderboardEntry[]> {
        return await this.leaderboardService.getGameLeaderboard(
            gameId,
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
    ): Promise<LeaderboardEntry[]> {
        return await this.leaderboardService.getFriendsLeaderboard(
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
    ): Promise<LeaderboardEntry[]> {
        return await this.leaderboardService.getFriendsCategoryLeaderboard(
            req.user.id,
            category,
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
    ): Promise<LeaderboardEntry[]> {
        return await this.leaderboardService.getFriendsGameLeaderboard(
            req.user.id,
            gameId,
            limit,
            offset,
            dateStart ? new Date(dateStart) : undefined,
            dateEnd ? new Date(dateEnd) : undefined
        );
    }
}
