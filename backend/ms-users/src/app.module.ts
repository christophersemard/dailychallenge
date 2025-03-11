import { Module } from "@nestjs/common";
import { AuthController } from "./auth/auth.controller";
import { AuthService } from "./auth/auth.service";
import { UsersService } from "./users/users.service";
import { JwtModule } from "@nestjs/jwt";
import * as dotenv from "dotenv";
import * as path from "path";
import { ConfigModule } from "@nestjs/config";

@Module({
    imports: [
        ConfigModule.forRoot({
            isGlobal: true, // Rend le module global pour toute l'application
            envFilePath: ".env", // Chemin vers votre fichier .env
        }),
        JwtModule.register({
            secret: process.env.JWT_SECRET,
            signOptions: { expiresIn: process.env.JWT_EXPIRES_IN },
        }),
    ],
    controllers: [AuthController],
    providers: [AuthService, UsersService],
})
export class AppModule {}
