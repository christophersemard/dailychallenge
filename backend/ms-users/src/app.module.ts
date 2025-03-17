import { Module } from "@nestjs/common";
import { AuthController } from "./auth/auth.controller";
import { AuthService } from "./auth/auth.service";
import { UsersService } from "./users/users.service";
import { JwtModule } from "@nestjs/jwt";
import * as dotenv from "dotenv";
import * as path from "path";
import { ConfigModule } from "@nestjs/config";
import { UsersController } from "./users/users.controller";
import { UserEventsService } from "./user-events/user-events.service";
import { StreakResetJob } from "./jobs/streakReset.cron";
import { ScheduleModule } from "@nestjs/schedule";

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
    controllers: [AuthController, UsersController],
    providers: [AuthService, UsersService, UserEventsService, StreakResetJob],
})
export class AppModule {}
