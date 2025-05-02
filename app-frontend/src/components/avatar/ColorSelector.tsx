// src/components/avatar/ColorSelector.tsx

import clsx from "clsx";

type Color = {
    id: number;
    name: string;
    value: string;
    level: number;
    vipOnly: boolean;
};

type Props = {
    title: string;
    colors: Color[];
    selectedId: number | null;
    onSelect: (id: number) => void;
    userLevel: number;
    isVip: boolean;
};

export default function ColorSelector({
    title,
    colors,
    selectedId,
    onSelect,
    userLevel,
    isVip,
}: Props) {
    return (
        <div className="mt-4 p-1">
            <div className="text-sm mb-2 font-bold text-muted-foreground">{title}</div>
            <div className="flex flex-wrap gap-2">
                {colors.map((color) => {
                    const locked = color.level > userLevel || (color.vipOnly && !isVip);
                    const selected = selectedId === color.id;

                    return (
                        <button
                            key={color.id}
                            onClick={() => onSelect(color.id)}
                            disabled={locked}
                            className={clsx(
                                "w-6 h-6 rounded border border-light",
                                locked && "opacity-40 cursor-not-allowed",
                                selected && "ring-2 ring-primary ring-offset-2"
                            )}
                            style={{ backgroundColor: color.value }}
                            title={color.name}
                        />
                    );
                })}
            </div>
        </div>
    );
}
