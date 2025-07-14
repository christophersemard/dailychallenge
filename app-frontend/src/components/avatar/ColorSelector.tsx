import clsx from "clsx";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { ColorAsset } from "@/types/user.types";
import { memo, useMemo } from "react";
import { Crown } from "lucide-react";
import OutlineText from "@/components/ui/outline-text";

type Props = {
    title: string;
    colors: ColorAsset[];
    selectedId: number | null;
    onSelect: (id: number) => void;
    userLevel: number;
    isVip: boolean;
};

const ColorSelector = ({
    title,
    colors,
    selectedId,
    onSelect,
    userLevel,
    isVip,
}: Props) => {
    const preparedColors = useMemo(
        () =>
            colors.map((color) => {
                const locked = color.level > userLevel || (color.vip && !isVip);
                const selected = selectedId === color.id;
                return { ...color, locked, selected };
            }),
        [colors, selectedId, userLevel, isVip]
    );

    return (
        <div className="mt-4">
            <div className="text-sm mb-2 font-bold text-muted-foreground">{title}</div>

            <TooltipProvider delayDuration={0}>
                <div className="grid grid-cols-8 md:grid-cols-16 gap-2 px-2">
                    {preparedColors.map((color) => (
                        <Tooltip key={color.id}>
                            <TooltipTrigger asChild>
                                <button
                                    onClick={() => onSelect(color.id)}
                                    className={clsx(
                                        "size-6 md:size-8 rounded relative transition duration-200 cursor-pointer border border-light",
                                        color.selected && "ring-2 ring-secondary ring-offset-2",
                                    )}
                                    style={{

                                        background: color.gradientValue
                                            ? `linear-gradient(135deg, ${color.gradientValue})`
                                            : color.value,
                                    }}
                                >
                                    {color.locked && (
                                        <div className="absolute top-0 left-0 inset-0 text-white text-xs flex items-center justify-center">
                                            {color.vip && (
                                                <Crown className="w-4 h-4 text-white" />
                                            )}
                                            {color.level > userLevel && (
                                                <OutlineText
                                                    text={String(color.level)}
                                                    color="black"
                                                    size="sm"
                                                    className=" font-bold mt-0.5"
                                                />
                                            )}
                                        </div>
                                    )}
                                </button>
                            </TooltipTrigger>
                            <TooltipContent>{color.name}</TooltipContent>
                        </Tooltip>
                    ))}
                </div>
            </TooltipProvider>
        </div>
    );
};

export default memo(ColorSelector);
