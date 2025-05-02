import prisma from "../prisma/prisma.service";
import * as path from "path";
import * as fs from "fs";
import * as sharp from "sharp";
import { CreateOrUpdateAvatarDto } from "./dto/create-avatar.dto";
import { RpcException } from "@nestjs/microservices";

const USE_RANDOM_AVATAR = false; // ou false

export class AvatarService {
    async getAvatarAssets() {
        const [assets, colors] = await Promise.all([
            prisma.avatarAsset.findMany({
                orderBy: [{ level: "asc" }, { name: "asc" }],
            }),
            prisma.color.findMany({
                orderBy: [{ level: "asc" }, { name: "asc" }],
            }),
        ]);

        return {
            shapes: assets.filter((a) => a.type === "shape"),
            patterns: assets.filter((a) => a.type === "pattern"),
            eyes: assets.filter((a) => a.type === "eyes"),
            mouths: assets.filter((a) => a.type === "mouth"),
            colors,
        };
    }

    async createOrUpdateAvatar(userId: number, dto: CreateOrUpdateAvatarDto) {
        let infos;
        // for (let index = 0; index < 30; index++) {
        const finalDto = USE_RANDOM_AVATAR
            ? await this.getRandomAvatarDto()
            : dto;

        await this.validateAvatarAccess(userId, finalDto);
        const fileName = await this.generateAvatarImage(userId, finalDto);
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { avatarId: true },
        });

        const data = {
            url: `/avatars/${fileName}`,
            shapeId: finalDto.shapeId,
            eyesId: finalDto.eyesId,
            mouthId: finalDto.mouthId,
            patternId: finalDto.patternId ?? null,
            colorShapeId: finalDto.colorShapeId,
            colorPatternId: finalDto.colorPatternId ?? null,
        };
        infos = user?.avatarId
            ? prisma.avatar.update({ where: { id: user.avatarId }, data })
            : prisma.avatar.create({
                  data: { ...data, user: { connect: { id: userId } } },
              });
        // }

        return infos;
    }

    private async validateAvatarAccess(
        userId: number,
        dto: CreateOrUpdateAvatarDto
    ) {
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                userStats: {
                    select: { level: true },
                },
                isVip: true,
            },
        });

        if (!user) throw new Error("Utilisateur introuvable");

        const assetIds = [
            dto.shapeId,
            dto.eyesId,
            dto.mouthId,
            dto.patternId,
        ].filter(Boolean);

        const colorIds = [dto.colorShapeId, dto.colorPatternId].filter(Boolean);

        const [assets, colors] = await Promise.all([
            prisma.avatarAsset.findMany({
                where: { id: { in: assetIds as number[] } },
            }),
            prisma.color.findMany({
                where: { id: { in: colorIds as number[] } },
            }),
        ]);

        for (const asset of assets) {
            if (asset.level > user.userStats!.level) {
                throw new RpcException(
                    `L'asset "${asset.name}" nécessite le niveau ${asset.level}`
                );
            }
            if (asset.vipOnly && !user.isVip) {
                throw new RpcException(
                    `L'asset "${asset.name}" est réservé aux VIP`
                );
            }
        }

        for (const color of colors) {
            if (color.level > user.userStats!.level) {
                throw new RpcException(
                    `La couleur "${color.name}" nécessite le niveau ${color.level}`
                );
            }
            if (color.vip && !user.isVip) {
                throw new RpcException(
                    `La couleur "${color.name}" est réservée aux VIP`
                );
            }
        }
    }

    private async getRandomAvatarDto(): Promise<CreateOrUpdateAvatarDto> {
        const [shapes, eyes, mouths, patterns, colors] = await Promise.all([
            prisma.avatarAsset.findMany({ where: { type: "shape" } }),
            prisma.avatarAsset.findMany({ where: { type: "eyes" } }),
            prisma.avatarAsset.findMany({ where: { type: "mouth" } }),
            prisma.avatarAsset.findMany({ where: { type: "pattern" } }),
            prisma.color.findMany(),
        ]);

        const getRandom = <T>(arr: T[]) =>
            arr[Math.floor(Math.random() * arr.length)];

        return {
            shapeId: getRandom(shapes).id,
            eyesId: getRandom(eyes).id,
            mouthId: getRandom(mouths).id,
            patternId: getRandom(patterns).id,
            colorShapeId: getRandom(colors).id,
            colorPatternId: getRandom(colors).id,
        };
    }

    private async generateAvatarImage(
        userId: number,
        dto: CreateOrUpdateAvatarDto
    ): Promise<string> {
        const randomNumber = Math.floor(Math.random() * 10000);
        const fileName = `avatar_user_${randomNumber}.png`;
        const outputPath = path.join(
            __dirname,
            "..",
            "..",
            "src",
            "avatar",
            "avatars",
            fileName
        );

        const assets = await this.loadAndPrepareAssets(dto);

        const finalImage = await this.buildAvatarComposite({
            shape: assets.shape!,
            shapeMask: assets.shapeMask!,
            eyes: assets.eyes!,
            mouth: assets.mouth!,
            stroke: assets.stroke,
            pattern: assets.pattern,
            colorShape: assets.colorShape,
            colorPattern: assets.colorPattern,
        });
        await finalImage.png().toFile(outputPath);
        return fileName;
    }
    private async buildAvatarComposite(assets: {
        shape: Buffer;
        shapeMask: Buffer;
        eyes: Buffer;
        mouth: Buffer;
        stroke?: Buffer;
        pattern?: Buffer;
        colorShape: string;
        colorPattern?: string;
    }) {
        // ✅ 1. Recolorise la forme
        const coloredShape = await sharp(assets.shape)
            .ensureAlpha()
            .resize(500, 500)
            .composite([
                {
                    input: Buffer.from(
                        `<svg width="500" height="500">
                    <rect width="500" height="500" fill="${assets.colorShape}" />
                </svg>`
                    ),
                    blend: "in",
                },
            ])
            .toBuffer();

        // ✅ 2. Recolorise + masque le pattern
        let patternMasked: Buffer | undefined;
        if (assets.pattern && assets.colorPattern) {
            const recoloredPattern = await sharp(assets.pattern)
                .ensureAlpha()
                .resize(500, 500)
                .composite([
                    {
                        input: Buffer.from(
                            `<svg width="500" height="500">
                      <rect width="500" height="500" fill="${assets.colorPattern}" />
                  </svg>`
                        ),
                        blend: "in",
                    },
                ])
                .toBuffer();

            const resizedMask = await sharp(assets.shapeMask)
                .ensureAlpha()
                .resize(500, 500)
                .toBuffer();

            patternMasked = await sharp(recoloredPattern)
                .composite([{ input: resizedMask, blend: "dest-in" }])
                .toBuffer();
        }

        // ✅ 3. Redimensionne tous les autres assets
        const stroke = assets.stroke
            ? await sharp(assets.stroke).resize(500, 500).toBuffer()
            : undefined;

        const eyes = await this.buildEyesLayer(assets.eyes);
        const mouth = await this.buildMouthLayer(assets.mouth);

        // ✅ 5. Composite final
        const compositeLayers = [
            { input: coloredShape },
            ...(patternMasked ? [{ input: patternMasked }] : []),
            ...(stroke ? [{ input: stroke }] : []),
            { input: eyes },
            { input: mouth },
        ];

        return sharp({
            create: {
                width: 500,
                height: 500,
                channels: 4,
                background: { r: 0, g: 0, b: 0, alpha: 0 },
            },
        }).composite(compositeLayers);
    }

    async buildEyesLayer(eyesBuffer: Buffer): Promise<Buffer> {
        const svg = Buffer.from(`
            <svg width="500" height="500" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
              <image 
                href="data:image/png;base64,${eyesBuffer.toString("base64")}"
                x="110" y="120" 
                width="280" height="130"
                preserveAspectRatio="xMidYMid meet"
              />
            </svg>
          `);

        return sharp(svg).png().toBuffer();
    }

    async buildMouthLayer(mouthBuffer: Buffer): Promise<Buffer> {
        const svg = Buffer.from(`
            <svg width="500" height="500" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg">
              <image 
                href="data:image/png;base64,${mouthBuffer.toString("base64")}"
                x="140" y="275" 
                width="220" height="130"
                preserveAspectRatio="xMidYMid meet"
              />
            </svg>
          `);

        return sharp(svg).png().toBuffer();
    }

    private async loadAndPrepareAssets(dto: CreateOrUpdateAvatarDto) {
        const [
            shapeAsset,
            eyesAsset,
            mouthAsset,
            patternAsset,
            colorShape,
            colorPattern,
        ] = await Promise.all([
            prisma.avatarAsset.findUnique({ where: { id: dto.shapeId } }),
            prisma.avatarAsset.findUnique({ where: { id: dto.eyesId } }),
            prisma.avatarAsset.findUnique({ where: { id: dto.mouthId } }),
            dto.patternId
                ? prisma.avatarAsset.findUnique({
                      where: { id: dto.patternId },
                  })
                : null,
            prisma.color.findUnique({ where: { id: dto.colorShapeId } }),
            dto.colorPatternId
                ? prisma.color.findUnique({ where: { id: dto.colorPatternId } })
                : null,
        ]);

        if (!shapeAsset || !eyesAsset || !mouthAsset || !colorShape) {
            throw new Error("Un ou plusieurs assets sont manquants");
        }

        const getPath = (url: string): string => {
            // url = "/assets/avatar/shapes/heart.png" → on enlève le slash initial
            const cleaned = url.replace(/^\/+/, "");
            return path.join(__dirname, "..", "..", "src", "avatar", cleaned);
        };

        console.log("Assets à charger :");
        console.log("Shape:", shapeAsset.url);
        console.log("Eyes:", eyesAsset.url);
        console.log("Mouth:", mouthAsset.url);
        console.log("Pattern:", patternAsset?.url ?? "none");
        console.log("Color shape:", colorShape.name);
        console.log("Color pattern:", colorPattern?.name ?? "none");
        console.log(
            "Stroke:",
            shapeAsset.url.replace("/shapes", "/shapes/stroke")
        );

        return {
            shape: await this.loadAssetBuffer(getPath(shapeAsset.url)),
            shapeMask: await this.loadAssetBuffer(getPath(shapeAsset.url)),
            eyes: await this.loadAssetBuffer(getPath(eyesAsset.url)),
            mouth: await this.loadAssetBuffer(getPath(mouthAsset.url)),
            stroke: await this.loadAssetBuffer(
                getPath(shapeAsset.url.replace("/shapes", "/shapes/stroke")),
                true
            ),
            pattern: patternAsset
                ? await this.loadAssetBuffer(getPath(patternAsset.url))
                : undefined,
            colorShape: colorShape.value,
            colorPattern: colorPattern?.value,
        };
    }

    private loadAssetBuffer(
        fullPath: string,
        optional = false
    ): Buffer | undefined {
        try {
            const file = fs.readFileSync(fullPath);

            return file;
        } catch (err) {
            if (!optional) {
                console.error("Erreur : fichier introuvable", fullPath);
                throw new Error(`Fichier manquant : ${fullPath}`);
            }
            return undefined;
        }
    }
}
