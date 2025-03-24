export class AvatarAssetDto {
    id: number;
    type: "shape" | "eyes" | "mouth" | "pattern";
    name: string;
    url: string;
    level: number;
    vipOnly: boolean;
}
