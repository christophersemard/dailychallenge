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
import { SupabaseService } from "./supabase/supabase.service";

@Module({
    imports: [
        ScheduleModule.forRoot(),
        ConfigModule.forRoot({
            isGlobal: true,
            envFilePath: ["../../.env.shared", ".env", ".env.local"], // charge d'abord le partagé, puis local
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
        SupabaseService,
        AuthService,
        UserEventsService,
        StreakResetJob,
        EventCleanupJob,
        UserGameService,
        ProfileService,
        AvatarService,
        UsersService,
    ],
    exports: [SupabaseService],
})
export class AppModule {}
