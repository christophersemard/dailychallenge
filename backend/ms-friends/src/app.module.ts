import { Module } from "@nestjs/common";
import { FriendsController } from "./friends/friends.controller";
import { FriendsService } from "./friends/friends.service";
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ["../../.env.shared", ".env", ".env.local"], // charge d'abord le partagé, puis local
        }),
    ],
    controllers: [FriendsController],
    providers: [FriendsService],
})
export class AppModule {}
