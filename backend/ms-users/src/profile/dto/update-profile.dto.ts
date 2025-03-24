import { IsOptional, IsString, IsDateString, Length } from "class-validator";

export class UpdateProfileDto {
    @IsOptional()
    @IsString()
    @Length(3, 20)
    pseudo?: string;

    @IsOptional()
    @IsString()
    firstName?: string;

    @IsOptional()
    @IsString()
    lastName?: string;

    @IsOptional()
    @IsDateString()
    birthdate?: string;
}
