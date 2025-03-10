import { Controller, Get, Inject } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { lastValueFrom } from "rxjs";

@Controller("test")
export class AppController {
    constructor(
        @Inject("LEADERBOARD_SERVICE") private leaderboardClient: ClientProxy,
        @Inject("GAME_CINEMA_1_SERVICE") private cinemaClient: ClientProxy,
        @Inject("FRIENDS_SERVICE") private friendsClient: ClientProxy
    ) {}

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
}
