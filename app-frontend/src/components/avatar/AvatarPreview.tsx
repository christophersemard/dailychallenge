// src/components/avatar/AvatarPreview.tsx

"use client";

import { useEffect, useRef, useState } from "react";
import { AvatarConfig } from "./AvatarEditor";
import { Button } from "@/components/ui/button";
import { AssetItem, ColorAsset } from "@/types/user.types";
import { fetchClientWithAuth } from "@/lib/fetchClientWithAuth";
import { toast } from "sonner";
import { useGameEventStore } from "@/lib/store/useGameEventStore";
import { redirect } from "next/navigation";

type Props = {
    config: AvatarConfig;
    userLevel: number;
    userVIPStatus: boolean;
};

export default function AvatarPreview({
    config,
    userLevel,
    userVIPStatus,
}: Props) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const notifyGameCompleted =
        useGameEventStore.getState().notifyGameCompleted;
    const [isComplete, setIsComplete] = useState(false);
    const [isLocked, setIsLocked] = useState(false);
    const [isColorLocked, setIsColorLocked] = useState(false);
    const [isSaving, setIsSaving] = useState(false);

    const createGradientFromString = (
        ctx: CanvasRenderingContext2D,
        gradientStr: string
    ): CanvasGradient => {
        const colors = gradientStr.split(",").map((c) => c.trim());
        const grad = ctx.createLinearGradient(0, 0, 500, 500);
        const step = 1 / (colors.length - 1);

        colors.forEach((color, index) => {
            grad.addColorStop(index * step, color);
        });

        return grad;
    };

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
                if (config.shape) {
                    const shapeImg = await loadImage(config.shape.url);
                    ctx.drawImage(shapeImg, 0, 0, 500, 500);

                    if (config.colorShape) {
                        ctx.globalCompositeOperation = "source-atop";
                        ctx.fillStyle = config.colorShape.gradientValue
                            ? createGradientFromString(
                                  ctx,
                                  config.colorShape.gradientValue
                              )
                            : config.colorShape.value;
                        ctx.fillRect(0, 0, 500, 500);
                        ctx.globalCompositeOperation = "source-over";
                    }
                }

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
                    tctx.fillStyle = config.colorPattern.gradientValue
                        ? createGradientFromString(
                              tctx,
                              config.colorPattern.gradientValue
                          )
                        : config.colorPattern.value;
                    tctx.fillRect(0, 0, 500, 500);

                    if (config.shape) {
                        const mask = await loadImage(config.shape.url);
                        tctx.globalCompositeOperation = "destination-in";
                        tctx.drawImage(mask, 0, 0, 500, 500);
                    }

                    ctx.drawImage(temp, 0, 0);
                }

                if (config.shape) {
                    const strokeUrl = config.shape.url.replace(
                        "/shapes",
                        "/shapes/stroke"
                    );
                    try {
                        const stroke = await loadImage(strokeUrl);
                        ctx.drawImage(stroke, 0, 0, 500, 500);
                    } catch {}
                }

                if (config.eyes) {
                    const eyes = await loadImage(config.eyes.url);
                    drawCenteredFit(eyes, 110, 120, 280, 130);
                }

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

    useEffect(() => {
        const checkCompletion = () => {
            const { shape, eyes, mouth } = config;
            setIsComplete(!!(shape && eyes && mouth));
        };

        const checkLocked = () => {
            const items = [
                config.shape,
                config.eyes,
                config.mouth,
                config.pattern,
            ].filter(Boolean) as AssetItem[];
            const locked = items.some(
                (item) =>
                    item.level > userLevel || (item.vipOnly && !userVIPStatus)
            );
            setIsLocked(locked);
        };

        const checkColorLocked = () => {
            const colors = [config.colorShape, config.colorPattern].filter(
                Boolean
            ) as ColorAsset[];
            const locked = colors.some(
                (color) =>
                    color.level > userLevel || (color.vip && !userVIPStatus)
            );
            setIsColorLocked(locked);
        };

        checkCompletion();
        checkLocked();
        checkColorLocked();
    }, [config, userLevel, userVIPStatus]);

    const handleSave = async () => {
        if (
            !config.shape ||
            !config.eyes ||
            !config.mouth ||
            !config.colorShape
        )
            return;
        setIsSaving(true);

        const body = {
            shapeId: config.shape.id,
            eyesId: config.eyes.id,
            mouthId: config.mouth.id,
            patternId: config.pattern?.id ?? null,
            colorShapeId: config.colorShape.id,
            colorPatternId: config.colorPattern?.id ?? null,
        };

        const { data, error } = await fetchClientWithAuth(
            "/api/avatar/generate",
            {
                method: "POST",
                body: JSON.stringify(body),
            }
        );

        setIsSaving(false);

        if (error) {
            toast.error(
                error.message || "Erreur lors de la sauvegarde de l'avatar"
            );
        } else {
            toast.success("Avatar mis à jour avec succès !");
            notifyGameCompleted();
            redirect("/mon-profil");
        }
    };

    return (
        <>
            <h2 className="text-xl font-bold mt-2 md:mt-8 ">
                Aperçu de l&apos;avatar
            </h2>

            {!config.shape &&
            !config.eyes &&
            !config.mouth &&
            !config.pattern ? (
                <div className="text-sm text-muted-foreground mt-4 h-[250px] flex items-center justify-center">
                    Sélectionnez un élément pour voir l&apos;aperçu
                </div>
            ) : (
                <canvas
                    ref={canvasRef}
                    width={500}
                    height={500}
                    className="w-[250px] h-[250px] object-contain mt-4"
                />
            )}

            <div className="flex flex-col items-center justify-center mt-4 mb-2 md:mb-8">
                <Button
                    variant="secondary"
                    size="lg"
                    disabled={
                        !isComplete || isLocked || isSaving || isColorLocked
                    }
                    className="w-full max-w-[300px]"
                    onClick={handleSave}
                >
                    {isSaving
                        ? "Sauvegarde en cours..."
                        : "Sauvegarder mon avatar"}
                </Button>

                {isLocked && (
                    <div className="text-sm font-bold text-danger ml-4 text-center mt-4">
                        Certains éléments ne sont pas débloqués pour vous.{" "}
                        <br /> Veuillez vérifier votre niveau ou votre statut
                        VIP.
                    </div>
                )}

                {isColorLocked && (
                    <div className="text-sm font-bold text-danger ml-4 text-center mt-4">
                        Certaines couleurs ne sont pas débloquées pour vous.{" "}
                        <br /> Veuillez vérifier votre niveau ou votre statut
                        VIP.
                    </div>
                )}

                {!isComplete && (
                    <div className="text-sm font-bold text-danger ml-4 text-center mt-4">
                        Votre avatar n&apos;est pas complet. Veuillez
                        sélectionner tous les éléments requis.
                    </div>
                )}
            </div>
        </>
    );
}
