// src/components/avatar/AvatarPreview.tsx

"use client";

import { useEffect, useRef } from "react";
import { AvatarConfig } from "./AvatarEditor";

type Props = {
    config: AvatarConfig;
};

export default function AvatarPreview({ config }: Props) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        ctx.clearRect(0, 0, 500, 500);

        const loadImage = async (url: string): Promise<HTMLImageElement> => {
            return new Promise((resolve, reject) => {
                const img = new Image();
                img.crossOrigin = "anonymous";
                img.src = url;
                img.onload = () => resolve(img);
                img.onerror = (err) => reject(err);
            });
        };

        const drawCenteredFit = (
            img: HTMLImageElement,
            x: number,
            y: number,
            w: number,
            h: number
        ) => {
            const ratio = Math.min(w / img.width, h / img.height);
            const newW = img.width * ratio;
            const newH = img.height * ratio;
            const offsetX = x + (w - newW) / 2;
            const offsetY = y + (h - newH) / 2;
            ctx.drawImage(img, offsetX, offsetY, newW, newH);
        };

        const draw = async () => {
            try {
                // 1. Forme de base
                if (config.shape) {
                    const shapeImg = await loadImage(config.shape.url);
                    ctx.drawImage(shapeImg, 0, 0, 500, 500);

                    if (config.colorShape) {
                        ctx.globalCompositeOperation = "source-atop";
                        ctx.fillStyle = config.colorShape.value;
                        ctx.fillRect(0, 0, 500, 500);
                        ctx.globalCompositeOperation = "source-over";
                    }
                }

                // 2. Pattern recolorisé et masqué
                if (config.pattern && config.colorPattern) {
                    const patternImg = await loadImage(config.pattern.url);

                    const temp = document.createElement("canvas");
                    temp.width = 500;
                    temp.height = 500;
                    const tctx = temp.getContext("2d");
                    if (!tctx) return;

                    tctx.clearRect(0, 0, 500, 500);
                    tctx.drawImage(patternImg, 0, 0, 500, 500);
                    tctx.globalCompositeOperation = "source-atop";
                    tctx.fillStyle = config.colorPattern.value;
                    tctx.fillRect(0, 0, 500, 500);

                    if (config.shape) {
                        const mask = await loadImage(config.shape.url);
                        tctx.globalCompositeOperation = "destination-in";
                        tctx.drawImage(mask, 0, 0, 500, 500);
                    }

                    ctx.drawImage(temp, 0, 0);
                }

                // 3. Contour
                if (config.shape) {
                    const strokeUrl = config.shape.url.replace("/shapes", "/shapes/stroke");
                    try {
                        const stroke = await loadImage(strokeUrl);
                        ctx.drawImage(stroke, 0, 0, 500, 500);
                    } catch { }
                }

                // 4. Yeux
                if (config.eyes) {
                    const eyes = await loadImage(config.eyes.url);
                    drawCenteredFit(eyes, 110, 120, 280, 130);
                }

                // 5. Bouche
                if (config.mouth) {
                    const mouth = await loadImage(config.mouth.url);
                    drawCenteredFit(mouth, 140, 275, 220, 130);
                }
            } catch (err) {
                console.error("Erreur de rendu avatar:", err);
            }
        };

        draw();
    }, [config]);

    return (
        <canvas
            ref={canvasRef}
            width={500}
            height={500}
            className=" w-[250px] h-[250px] object-contain mt-8"
        />
    );
}