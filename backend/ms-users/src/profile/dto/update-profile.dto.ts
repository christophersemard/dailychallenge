import { IsOptional, IsString, IsDateString, Length } from "class-validator";

export class UpdateProfileDto {
    @IsOptional()
    @IsString()
    @Length(3, 20)
    pseudo?: string;
}
