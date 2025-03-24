import { Module } from "@nestjs/common";
import { FriendsController } from "./friends/friends.controllers";
import { FriendsService } from "./friends/friends.service";

@Module({
    imports: [],
    controllers: [FriendsController],
    providers: [FriendsService],
})
export class AppModule {}
