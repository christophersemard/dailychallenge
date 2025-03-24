import { IsInt, IsPositive, IsOptional } from "class-validator";

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

    @IsInt()
    @IsPositive()
    colorEyesId: number;

    @IsInt()
    @IsPositive()
    colorMouthId: number;

    @IsOptional()
    @IsInt()
    @IsPositive()
    colorPatternId?: number;
}
