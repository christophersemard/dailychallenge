// src/components/avatar/AvatarEditorPanel.tsx

"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import AssetGrid from "./AssetGrid";
import { useEffect, useState } from "react";
import { fetchClientWithAuth } from "@/lib/fetchClientWithAuth";
import ColorSelector from "./ColorSelector";
import { sortColorsByHue } from "@/lib/avatar/sortColors";
import { AssetItem, ColorAsset } from "@/types/user.types";
import Image from "next/image";
import { AvatarConfig } from "./AvatarEditor";

type Props = {
    state: AvatarConfig;
    setState: (s: AvatarConfig) => void;
    userLevel: number;
    userVIPStatus: boolean;
};

export default function AvatarEditorPanel({ state, setState, userLevel, userVIPStatus }: Props) {
    const [assets, setAssets] = useState<{
        shapes: AssetItem[];
        patterns: AssetItem[];
        eyes: AssetItem[];
        mouths: AssetItem[];
        colors: ColorAsset[];
    }>({ shapes: [], patterns: [], eyes: [], mouths: [], colors: [] });

    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        const loadAssets = async () => {
            setIsLoading(true);
            const { data, error } = await fetchClientWithAuth<{
                shapes: AssetItem[];
                patterns: AssetItem[];
                eyes: AssetItem[];
                mouths: AssetItem[];
                colors: ColorAsset[];
            }>("/api/avatar/assets");

            if (error || !data) {
                console.error("Erreur chargement assets avatar :", error);
                setIsLoading(false);
                return;
            }

            setAssets({
                shapes: data.shapes,
                patterns: data.patterns,
                eyes: data.eyes,
                mouths: data.mouths,
                colors: data.colors,
            });

            setIsLoading(false);
        };

        loadAssets();
    }, []);

    const getAsset = (id: number | null | undefined, list: AssetItem[]) => list.find((a) => a.id === id) ?? null;
    const getColor = (id: number | null | undefined) => assets.colors.find((c) => c.id === id) ?? null;

    if (isLoading) {
        return (<>
            <h2 className="text-xl font-bold mt-2 md:mt-8 text-center md:text-start">Personnaliser mon avatar</h2>
            <div className="space-y-4 mt-6 animate-pulse">
                <div className="h-8 w-2/3 rounded bg-background" />
                <div className="h-12 w-full rounded bg-background" />
                <div className="h-32 w-full rounded bg-background" />
                <div className="h-8 w-1/2 rounded bg-background" />
                <div className="h-12 w-full rounded bg-background" />
            </div>
        </>
        );
    }

    return (
        <>
            <h2 className="text-xl font-bold mt-2 md:mt-8 text-center md:text-start">Personnaliser mon avatar</h2>
            <Accordion type="single" collapsible className="w-full" defaultValue="shape">
                <AccordionItem value="shape">
                    <AccordionTrigger className="text-lg font-semibold cursor-pointer">
                        <span className="flex gap-2 items-center">
                            {state.shape && (
                                <Image
                                    src={state.shape.url}
                                    alt={state.shape.name}
                                    width={20}
                                    height={20}
                                    className="inline size-6 object-contain"
                                />
                            )}
                            Forme
                        </span>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 mb-4">
                                <button
                                    onClick={() => setState({ ...state, shape: null, colorShape: null })}
                                    className="text-sm text-muted-foreground underline cursor-pointer"
                                >
                                    Retirer la forme
                                </button>
                            </div>

                            <AssetGrid
                                items={assets.shapes}
                                selectedId={state.shape?.id ?? null}
                                onSelect={(id) => {
                                    const selected = getAsset(id, assets.shapes);
                                    setState({ ...state, shape: selected });
                                }}
                                userLevel={userLevel}
                                isVip={userVIPStatus}
                            />

                            <ColorSelector
                                title="Couleur de la forme"
                                colors={assets.colors}
                                selectedId={state.colorShape?.id ?? null}
                                onSelect={(id) => {
                                    const color = getColor(id);
                                    setState({ ...state, colorShape: color });
                                }}
                                userLevel={userLevel}
                                isVip={userVIPStatus}
                            />
                        </div>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="pattern">
                    <AccordionTrigger className="text-lg font-semibold cursor-pointer">
                        <span className="flex gap-2 items-center">
                            {state.pattern && (
                                <Image
                                    src={state.pattern.url}
                                    alt={state.pattern.name}
                                    width={20}
                                    height={20}
                                    className="inline size-6 object-contain"
                                />
                            )}
                            Motif
                        </span>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => setState({ ...state, pattern: null, colorPattern: null })}
                                    className="text-sm text-muted-foreground underline cursor-pointer"
                                >
                                    Retirer le motif
                                </button>
                            </div>

                            <AssetGrid
                                items={assets.patterns}
                                selectedId={state.pattern?.id ?? null}
                                onSelect={(id) => {
                                    const selected = getAsset(id, assets.patterns);
                                    setState({ ...state, pattern: selected });
                                }}
                                userLevel={userLevel}
                                isVip={userVIPStatus}
                            />

                            {state.pattern && (
                                <ColorSelector
                                    title="Couleur du motif"
                                    colors={assets.colors}
                                    selectedId={state.colorPattern?.id ?? null}
                                    onSelect={(id) => {
                                        const color = getColor(id);
                                        setState({ ...state, colorPattern: color });
                                    }}
                                    userLevel={userLevel}
                                    isVip={userVIPStatus}
                                />
                            )}
                        </div>
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="eyes">
                    <AccordionTrigger className="text-lg font-semibold cursor-pointer">
                        <span className="flex gap-2 items-center">
                            {state.eyes && (
                                <Image
                                    src={state.eyes.url}
                                    alt={state.eyes.name}
                                    width={20}
                                    height={20}
                                    className="inline size-6 object-contain"
                                />
                            )}
                            Yeux
                        </span>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="flex items-center gap-2 mb-4">
                            <button
                                onClick={() => setState({ ...state, eyes: null })}
                                className="text-sm text-muted-foreground underline"
                            >
                                Retirer les yeux
                            </button>
                        </div>
                        <AssetGrid
                            items={assets.eyes}
                            selectedId={state.eyes?.id ?? null}
                            onSelect={(id) => {
                                const selected = getAsset(id, assets.eyes);
                                setState({ ...state, eyes: selected });
                            }}
                            userLevel={userLevel}
                            isVip={userVIPStatus}
                        />
                    </AccordionContent>
                </AccordionItem>

                <AccordionItem value="mouth">
                    <AccordionTrigger className="text-lg font-semibold cursor-pointer">
                        <span className="flex gap-2 items-center">
                            {state.mouth && (
                                <Image
                                    src={state.mouth.url}
                                    alt={state.mouth.name}
                                    width={20}
                                    height={20}
                                    className="inline size-6 object-contain"
                                />
                            )}
                            Bouche
                        </span>
                    </AccordionTrigger>
                    <AccordionContent>
                        <div className="flex items-center gap-2 mb-4">
                            <button
                                onClick={() => setState({ ...state, mouth: null })}
                                className="text-sm text-muted-foreground underline"
                            >
                                Retirer la bouche
                            </button>
                        </div>
                        <AssetGrid
                            items={assets.mouths}
                            selectedId={state.mouth?.id ?? null}
                            onSelect={(id) => {
                                const selected = getAsset(id, assets.mouths);
                                setState({ ...state, mouth: selected });
                            }}
                            userLevel={userLevel}
                            isVip={userVIPStatus}
                        />
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </>
    );
}
