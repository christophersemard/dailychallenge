import { Controller, Get, Inject, Req, UseGuards } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";
import { JwtAuthGuard } from "./auth/auth.guard";

@Controller("test")
export class AppController {
    constructor(
        @Inject("LEADERBOARD_SERVICE") private leaderboardClient: ClientProxy,
        @Inject("GAME_CINEMA_1_SERVICE") private cinemaClient: ClientProxy,
        @Inject("FRIENDS_SERVICE") private friendsClient: ClientProxy
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get()
    async protectedRoute(@Req() req) {
        return {
            message: `Bienvenue ${req.user.email}, votre rôle est ${req.user.role}`,
        };
    }

    @Get("leaderboard")
    async testLeaderboard() {
        return lastValueFrom(
            this.leaderboardClient.send("ping_leaderboard", {})
        );
    }

    @Get("cinema")
    async testCinema() {
        return lastValueFrom(this.cinemaClient.send("ping_game_cinema", {}));
    }

    @Get("friends")
    async testFriends() {
        return lastValueFrom(this.friendsClient.send("ping_friends", {}));
    }

    @Get("posts")
    async getPosts() {
        return lastValueFrom(this.friendsClient.send("get_all_posts", {}));
    }
}
