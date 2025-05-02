// src/components/avatar/AvatarEditor.tsx

"use client";

import { useState } from "react";
import AvatarPreview from "./AvatarPreview";
import AvatarEditorPanel from "./AvatarEditorPanel";
import { AssetItem } from "./AssetGrid";

export type AvatarConfig = {
    shape: AssetItem | null;
    eyes: AssetItem | null;
    mouth: AssetItem | null;
    pattern: AssetItem | null;
    colorShape: { id: number; value: string } | null;
    colorPattern: { id: number; value: string } | null;
};

export default function AvatarEditor() {
    const [state, setState] = useState<AvatarConfig>({
        shape: null,
        eyes: null,
        mouth: null,
        pattern: null,
        colorShape: null,
        colorPattern: null,
    });

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Aperçu gauche */}
            <div className="flex flex-col items-center gap-4">
                <AvatarPreview config={state} />
                {/* Bouton de validation ici plus tard */}
            </div>

            {/* Panel droit */}
            <div className="space-y-4">
                <AvatarEditorPanel state={state} setState={setState} />
            </div>
        </div>
    );
}