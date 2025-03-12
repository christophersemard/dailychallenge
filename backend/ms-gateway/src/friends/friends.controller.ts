import { Controller, Post, UseGuards, Req, Body, Get } from "@nestjs/common";
import { JwtAuthGuard } from "../auth/auth.guard";
import { FriendsService } from "./friends.service";
import { UserRequest } from "../auth/auth.types";
import {
    FriendResponse,
    FriendRequestPayload,
    FriendsListResponse,
    RespondFriendRequestPayload,
} from "./friends.types";

@Controller("friends")
export class FriendsController {
    constructor(private friendsService: FriendsService) {}

    @UseGuards(JwtAuthGuard)
    @Post("add")
    async addFriend(
        @Req() req: UserRequest,
        @Body() body: FriendRequestPayload
    ): Promise<FriendResponse> {
        return await this.friendsService.addFriend(req.user, body.friendId);
    }

    @UseGuards(JwtAuthGuard)
    @Post("remove")
    async removeFriend(
        @Req() req: UserRequest,
        @Body() body: FriendRequestPayload
    ): Promise<FriendResponse> {
        return await this.friendsService.removeFriend(req.user, body.friendId);
    }

    @UseGuards(JwtAuthGuard)
    @Post("respond")
    async respondFriendRequest(
        @Req() req: UserRequest,
        @Body() body: RespondFriendRequestPayload
    ): Promise<FriendResponse> {
        return await this.friendsService.respondFriendRequest(
            req.user,
            body.friendId,
            body.accept
        );
    }

    @UseGuards(JwtAuthGuard)
    @Get("list")
    async getFriendsList(
        @Req() req: UserRequest
    ): Promise<FriendsListResponse> {
        console.log(
            "🚀 ~ file: friends.controller.ts ~ line 64 ~ FriendsController ~ getFriendsList ~ req.user",
            req.user
        );
        return await this.friendsService.getFriendsList(req.user);
    }
}
