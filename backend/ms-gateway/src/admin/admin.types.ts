import { IsEnum } from "class-validator";
import { IsEmail, IsOptional, IsString, IsBoolean } from "class-validator";

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
}

export class UpdateGameStatusDto {
    @IsEnum(["available", "coming_soon", "unavailable"])
    status: string;
}
