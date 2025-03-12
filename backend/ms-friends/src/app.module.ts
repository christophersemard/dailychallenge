import { Module } from "@nestjs/common";
import { FriendsController } from "./friends/friends.controllers";

@Module({
    imports: [],
    controllers: [FriendsController],
    providers: [],
})
export class AppModule {}
