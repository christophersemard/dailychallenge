import { IsEnum } from "class-validator";
import { IsEmail, IsOptional, IsString, IsBoolean } from "class-validator";
import { IsISO8601 } from "class-validator";

export class UpdateUserAdminDto {
    @IsOptional()
    @IsString()
    pseudo?: string;

    @IsOptional()
    @IsEmail()
    email?: string;

    @IsOptional()
    @IsBoolean()
    isVip?: boolean;

    @IsOptional()
    @IsBoolean()
    isActive?: boolean;

    @IsOptional()
    @IsISO8601()
    vipUntil?: string; // ou Date si tu préfères
}

export class UpdateGameStatusDto {
    @IsEnum(["available", "coming_soon", "unavailable"])
    status: string;
}
