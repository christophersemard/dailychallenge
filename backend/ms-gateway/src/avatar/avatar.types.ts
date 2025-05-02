import { AvatarAssetDto } from "./dto/avatar-asset.dto";
import { ColorDto } from "./dto/color.dto";

export interface AvatarAssetsResponse {
    assets: AvatarAssetDto[];
    colors: ColorDto[];
}

export interface GeneratedAvatarResponse {
    id: number;
    url: string;

    shapeId: number;
    eyesId: number;
    mouthId: number;
    patternId?: number;

    colorShapeId: number;
    colorPatternId?: number;
}
