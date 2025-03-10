import { IsEmail, IsNotEmpty } from "class-validator";

export class LoginDto {
    @IsEmail({}, { message: "L'email est invalide" })
    email: string;

    @IsNotEmpty({ message: "Le mot de passe est requis" })
    password: string;
}
