import { Request } from "express";
import { IsEmail } from "class-validator";
import { IsString, Length } from "class-validator";

export interface UserPayload {
    id: number;
    email: string;
    role: string;
    pseudo: string;
}

export interface UserRequest extends Request {
    user: UserPayload;
}

export class RequestPasswordResetDto {
    @IsEmail()
    email: string;
}

export class ConfirmPasswordResetDto {
    @IsString()
    token: string;

    @IsString()
    @Length(8, 100)
    newPassword: string;

    @IsString()
    confirmPassword: string;
}

export class UpdatePasswordDto {
    @IsString()
    currentPassword: string;

    @IsString()
    @Length(8, 100)
    newPassword: string;

    @IsString()
    confirmPassword: string;
}

export class UpdateEmailDto {
    @IsString()
    currentPassword: string;

    @IsEmail()
    newEmail: string;
}

export class ConfirmPasswordDto {
    @IsString()
    currentPassword: string;
}
