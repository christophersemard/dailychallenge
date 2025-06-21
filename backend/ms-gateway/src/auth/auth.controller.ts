import { Controller, Post, Body, Get, Patch } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { RegisterDto } from "../dto/register.dto";
import { LoginDto } from "../dto/login.dto";
import { UserDto } from "../dto/user.dto";
import { ApiOperation, ApiResponse } from "@nestjs/swagger";
import { Public } from "./public.decorator";
import {
    RequestPasswordResetDto,
    ConfirmPasswordResetDto,
    UpdatePasswordDto,
    UpdateEmailDto,
    UserRequest,
    ConfirmPasswordDto,
} from "./auth.types";
import { JwtAuthGuard } from "./auth.guard";
import { UseGuards, Req } from "@nestjs/common";
import { ApiBearerAuth } from "@nestjs/swagger";

@Controller("api/auth")
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post("register")
    @Public()
    @ApiOperation({ summary: "Créer un nouvel utilisateur" })
    @ApiResponse({ status: 201, description: "Utilisateur créé avec succès" })
    @ApiResponse({ status: 400, description: "Données invalides" })
    register(@Body() body: RegisterDto): Promise<UserDto> {
        return this.authService.register(
            body.email,
            body.password,
            body.pseudo
        );
    }

    @Post("login")
    @Public()
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

    @Post("reset-password/request")
    @Public()
    @ApiOperation({ summary: "Demander un reset de mot de passe" })
    @ApiResponse({ status: 200, description: "Email de reset envoyé" })
    requestReset(@Body() body: RequestPasswordResetDto) {
        return this.authService.sendResetPasswordToken(body.email);
    }

    @Post("reset-password/confirm")
    @Public()
    @ApiOperation({
        summary: "Confirmer le reset avec token + nouveau mot de passe",
    })
    @ApiResponse({ status: 200, description: "Mot de passe mis à jour" })
    resetPassword(@Body() body: ConfirmPasswordResetDto) {
        return this.authService.resetPasswordWithToken(body);
    }

    // ✅ 🔐 Mise à jour mot de passe (authentifié)
    @Patch("password")
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: "Changer son mot de passe" })
    updatePassword(@Req() req: UserRequest, @Body() dto: UpdatePasswordDto) {
        return this.authService.updatePassword(req.user.id, dto);
    }

    // ✅ 🔐 Mise à jour email (authentifié)
    @Patch("email")
    @UseGuards(JwtAuthGuard)
    @ApiBearerAuth()
    @ApiOperation({ summary: "Changer son email" })
    updateEmail(@Req() req: UserRequest, @Body() dto: UpdateEmailDto) {
        return this.authService.updateEmail(req.user.id, dto);
    }

    @UseGuards(JwtAuthGuard)
    @Patch("delete")
    @ApiBearerAuth()
    @ApiOperation({
        summary: "Supprimer (soft-delete) le compte de l'utilisateur",
    })
    deleteAccount(@Req() req: UserRequest, @Body() dto: ConfirmPasswordDto) {
        return this.authService.deleteAccount(
            {
                id: req.user.id,
                username: req.user.pseudo,
            },
            dto
        );
    }
}
