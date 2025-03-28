import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty, MinLength } from "class-validator";

export class RegisterDto {
    @ApiProperty({
        example: "user@example.com",
        description: "Email de l'utilisateur",
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        example: "superpassword",
        description: "Mot de passe (min 6 caractères)",
    })
    @IsNotEmpty()
    @MinLength(6)
    password: string;

    @ApiProperty({
        example: "pseudo",
        description: "Pseudo de l'utilisateur",
    })
    @IsNotEmpty()
    pseudo: string;
}
