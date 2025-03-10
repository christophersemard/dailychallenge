import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class RegisterDto {
    @IsEmail({}, { message: "L'email est invalide" })
    email: string;

    @IsNotEmpty({ message: "Le mot de passe est requis" })
    @MinLength(6, {
        message: "Le mot de passe doit contenir au moins 6 caractères",
    })
    password: string;
}
