import { Controller, Post, Body, Get } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "../dto/register.dto";
import { LoginDto } from "../dto/login.dto";
import { UserDto } from "../dto/user.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";

@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("register")
    @ApiOperation({ summary: "Créer un nouvel utilisateur" })
    @ApiResponse({ status: 201, description: "Utilisateur créé avec succès" })
    @ApiResponse({ status: 400, description: "Données invalides" })
    register(@Body() body: RegisterDto): Promise<UserDto> {
        return this.authService.register(body.email, body.password);
    }

    @Post("login")
    @ApiOperation({ summary: "Se connecter" })
    @ApiResponse({ status: 200, description: "Connexion réussie" })
    @ApiResponse({ status: 400, description: "Données invalides" })
    login(@Body() body: LoginDto): Promise<{ token: string }> {
        return this.authService.login(body.email, body.password);
    }

    @Get("users")
    @ApiOperation({ summary: "Récupérer tous les utilisateurs" })
    @ApiResponse({ status: 200, description: "Liste des utilisateurs" })
    getUsers(): Promise<UserDto[]> {
        return this.authService.getUsers();
    }
}
