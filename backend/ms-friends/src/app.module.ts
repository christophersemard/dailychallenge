import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { FriendsController } from "./friends/friends.controllers";

@Module({
    imports: [],
    controllers: [AppController, FriendsController],
    providers: [],
})
export class AppModule {}
