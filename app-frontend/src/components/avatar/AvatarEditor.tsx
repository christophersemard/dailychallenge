// src/components/avatar/AvatarEditor.tsx

"use client";

import { useState } from "react";
import AvatarPreview from "./AvatarPreview";
import AvatarEditorPanel from "./AvatarEditorPanel";

import { AssetItem, ColorAsset } from "@/types/user.types";

export type AvatarConfig = {
    shape: AssetItem | null;
    eyes: AssetItem | null;
    mouth: AssetItem | null;
    pattern: AssetItem | null;
    colorShape: ColorAsset | null;
    colorPattern: ColorAsset | null;
};

export default function AvatarEditor({
    config,
    userLevel,
    userVIPStatus,
}: {
    config: AvatarConfig;
    userLevel: number;
    userVIPStatus: boolean;
}) {
    const [state, setState] = useState<AvatarConfig>(config);

    return (
        <div className="grid grid-cols-1 md:grid-cols-[400px_1px_1fr] gap-8 relative">
            {/* Aperçu gauche */}
            <div className="flex flex-col items-center gap-4">
                <AvatarPreview
                    config={state}
                    userLevel={userLevel}
                    userVIPStatus={userVIPStatus}
                />
                {/* Bouton de validation ici plus tard */}
            </div>

            <div className="hidden md:block border-l border-gray-200 h-full"></div>
            {/* Barre de séparation */}

            {/* Panel droit */}
            <div className="space-y-4">
                <AvatarEditorPanel
                    state={state}
                    setState={setState}
                    userLevel={userLevel}
                    userVIPStatus={userVIPStatus}
                />
            </div>
        </div>
    );
}
