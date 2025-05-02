import { IsInt, IsOptional, IsPositive } from "class-validator";

export class CreateOrUpdateAvatarDto {
    @IsInt()
    @IsPositive()
    shapeId: number;

    @IsInt()
    @IsPositive()
    eyesId: number;

    @IsInt()
    @IsPositive()
    mouthId: number;

    @IsOptional()
    @IsInt()
    @IsPositive()
    patternId?: number;

    @IsInt()
    @IsPositive()
    colorShapeId: number;

    @IsOptional()
    @IsInt()
    @IsPositive()
    colorPatternId?: number;
}
