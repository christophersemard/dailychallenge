import { Module } from "@nestjs/common";
import { AuthController } from "./auth/auth.controller";
import { AuthService } from "./auth/auth.service";
import { JwtModule } from "@nestjs/jwt";
import * as dotenv from "dotenv";
import * as path from "path";
import { ConfigModule } from "@nestjs/config";
import { UsersController } from "./users/users.controller";
import { UserEventsService } from "./user-events/user-events.service";
import { StreakResetJob } from "./jobs/streakReset.cron";
import { ScheduleModule } from "@nestjs/schedule";
import { UserGameService } from "./user-game/user-game.service";
import { UserGameController } from "./user-game/user-game.controller";
import { EventCleanupJob } from "./jobs/eventCleanUp.cron";
import { ProfileController } from "./profile/profile.controller";
import { ProfileService } from "./profile/profile.service";
import { AvatarService } from "./avatar/avatar.service";
import { AvatarController } from "./avatar/avatar.controller";
import { UsersService } from "./users/users.service";

@Module({
    imports: [
        ScheduleModule.forRoot(),
        ConfigModule.forRoot({
            isGlobal: true, // Rend le module global pour toute l'application
            envFilePath: ".env", // Chemin vers votre fichier .env
        }),
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
        }),
    ],
    controllers: [
        AuthController,
        UsersController,
        UserGameController,
        ProfileController,
        AvatarController,
    ],
    providers: [
        AuthService,
        UserEventsService,
        StreakResetJob,
        EventCleanupJob,
        UserGameService,
        ProfileService,
        AvatarService,
        UsersService,
    ],
})
export class AppModule {}
