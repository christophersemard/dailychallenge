import {
    Controller,
    Post,
    UseGuards,
    Req,
    Param,
    Patch,
    Delete,
    Get,
} from "@nestjs/common";
import { JwtAuthGuard } from "../auth/auth.guard";
import { FriendsService } from "./friends.service";
import { UserRequest } from "../auth/auth.types";
import {
    ApiBearerAuth,
    ApiOperation,
    ApiResponse,
    ApiTags,
} from "@nestjs/swagger";
import { FriendResponse, FriendsListResponse } from "./friends.types";

@ApiTags("Friends")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("friends")
export class FriendsController {
    constructor(private friendsService: FriendsService) {}

    @Post(":friendId/request")
    @ApiOperation({ summary: "Envoyer une demande d’ami" })
    @ApiResponse({ status: 201, description: "Demande envoyée." })
    async sendFriendRequest(
        @Req() req: UserRequest,
        @Param("friendId") friendId: number
    ): Promise<FriendResponse> {
        return this.friendsService.addFriend(req.user, friendId);
    }

    @Patch(":friendId/accept")
    @ApiOperation({ summary: "Accepter une demande d’ami" })
    @ApiResponse({ status: 200, description: "Demande acceptée." })
    async acceptFriendRequest(
        @Req() req: UserRequest,
        @Param("friendId") friendId: number
    ): Promise<FriendResponse> {
        return this.friendsService.respondFriendRequest(
            req.user,
            friendId,
            true
        );
    }

    @Patch(":friendId/decline")
    @ApiOperation({ summary: "Refuser une demande d’ami" })
    @ApiResponse({ status: 200, description: "Demande refusée." })
    async declineFriendRequest(
        @Req() req: UserRequest,
        @Param("friendId") friendId: number
    ): Promise<FriendResponse> {
        return this.friendsService.respondFriendRequest(
            req.user,
            friendId,
            false
        );
    }

    @Delete(":friendId")
    @ApiOperation({ summary: "Supprimer un ami" })
    @ApiResponse({ status: 200, description: "Ami supprimé." })
    async removeFriend(
        @Req() req: UserRequest,
        @Param("friendId") friendId: number
    ): Promise<FriendResponse> {
        return this.friendsService.removeFriend(req.user, friendId);
    }

    @Get()
    @ApiOperation({ summary: "Liste des amis" })
    @ApiResponse({
        status: 200,
        description: "Liste des amis de l’utilisateur.",
    })
    async getFriendsList(
        @Req() req: UserRequest
    ): Promise<FriendsListResponse> {
        return this.friendsService.getFriendsList(req.user);
    }

    @Get("requests")
    @ApiOperation({ summary: "Liste des demandes d'amis en attente" })
    @ApiResponse({
        status: 200,
        description: "Demandes en attente récupérées.",
    })
    async getFriendRequests(
        @Req() req: UserRequest
    ): Promise<FriendsListResponse> {
        return this.friendsService.getFriendRequests(req.user);
    }
}
