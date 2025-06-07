import { IsEnum } from "class-validator";

export class UpdateGameStatusDto {
    @IsEnum(["available", "coming_soon", "unavailable"])
    status: string;
}
