// src/components/avatar/AvatarEditorPanel.tsx

"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import AssetGrid, { AssetItem } from "./AssetGrid";
import { useEffect, useState } from "react";
import { fetchClientWithAuth } from "@/lib/fetchClientWithAuth";
import ColorSelector from "./ColorSelector";
import { sortColorsByHue } from "@/lib/avatar/sortColors";

import Image from "next/image";

type Props = {
    state: any;
    setState: (s: any) => void;
};

export default function AvatarEditorPanel({ state, setState }: Props) {
    const [assets, setAssets] = useState<{
        shapes: AssetItem[];
        patterns: AssetItem[];
        eyes: AssetItem[];
        mouths: AssetItem[];
        colors: AssetItem[];
    }>({ shapes: [], patterns: [], eyes: [], mouths: [], colors: [] });

    const userLevel = 10;
    const isVip = false;

    useEffect(() => {
        const loadAssets = async () => {
            const { data, error } = await fetchClientWithAuth<{
                shapes: AssetItem[];
                patterns: AssetItem[];
                eyes: AssetItem[];
                mouths: AssetItem[];
                colors: AssetItem[];
            }>("/api/avatar/assets");

            if (error || !data) {
                console.error("Erreur chargement assets avatar :", error);
                return;
            }

            setAssets({
                shapes: data.shapes,
                patterns: data.patterns,
                eyes: data.eyes,
                mouths: data.mouths,
                colors: data.colors,
            });
        };

        loadAssets();
    }, []);

    const getAsset = (id: number | null, list: AssetItem[]) => list.find((a) => a.id === id) ?? null;
    const getColor = (id: number | null) => assets.colors.find((c) => c.id === id) ?? null;

    return (
        <Accordion type="single" collapsible className="w-full" defaultValue="shape">
            <AccordionItem value="shape">
                <AccordionTrigger className="text-lg font-semibold cursor-pointer">
                    <span className="flex gap-2 items-center">
                        {getAsset(state.shape?.id, assets.shapes) && (
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
                        <AssetGrid
                            items={assets.shapes}
                            selectedId={state.shape?.id ?? null}
                            onSelect={(id) => {
                                const selected = getAsset(id, assets.shapes);
                                setState({ ...state, shape: selected });
                            }}
                            userLevel={userLevel}
                            isVip={isVip}
                        />

                        <ColorSelector
                            title="Couleur de la forme"
                            colors={sortColorsByHue(assets.colors)}
                            selectedId={state.colorShape?.id ?? null}
                            onSelect={(id) => {
                                const color = getColor(id);
                                setState({ ...state, colorShape: color });
                            }}
                            userLevel={userLevel}
                            isVip={isVip}
                        />
                    </div>
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="pattern">
                <AccordionTrigger className="text-lg font-semibold cursor-pointer">
                    <span className="flex gap-2 items-center">
                        {getAsset(state.pattern?.id, assets.patterns) && (
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
                                className="text-sm text-muted-foreground underline"
                            >
                                Aucun motif
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
                            isVip={isVip}
                        />

                        {state.pattern && (
                            <ColorSelector
                                title="Couleur du motif"
                                colors={sortColorsByHue(assets.colors)}
                                selectedId={state.colorPattern?.id ?? null}
                                onSelect={(id) => {
                                    const color = getColor(id);
                                    setState({ ...state, colorPattern: color });
                                }}
                                userLevel={userLevel}
                                isVip={isVip}
                            />
                        )}
                    </div>
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="eyes">
                <AccordionTrigger className="text-lg font-semibold cursor-pointer">
                    <span className="flex gap-2 items-center">
                        {getAsset(state.eyes?.id, assets.eyes) && (
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
                    <AssetGrid
                        items={assets.eyes}
                        selectedId={state.eyes?.id ?? null}
                        onSelect={(id) => {
                            const selected = getAsset(id, assets.eyes);
                            setState({ ...state, eyes: selected });
                        }}
                        userLevel={userLevel}
                        isVip={isVip}
                    />
                </AccordionContent>
            </AccordionItem>

            <AccordionItem value="mouth">
                <AccordionTrigger className="text-lg font-semibold cursor-pointer">
                    <span className="flex gap-2 items-center">
                        {getAsset(state.mouth?.id, assets.mouths) && (
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
                    <AssetGrid
                        items={assets.mouths}
                        selectedId={state.mouth?.id ?? null}
                        onSelect={(id) => {
                            const selected = getAsset(id, assets.mouths);
                            setState({ ...state, mouth: selected });
                        }}
                        userLevel={userLevel}
                        isVip={isVip}
                    />
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}