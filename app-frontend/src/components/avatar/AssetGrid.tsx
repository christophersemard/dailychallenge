// src/components/avatar/AssetGrid.tsx

import Image from "next/image";
import clsx from "clsx";
import { Crown } from "lucide-react";
import OutlineText from "../ui/outline-text";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip"
import { AssetItem } from "@/types/user.types";

type Props = {
    items: AssetItem[];
    selectedId: number | null;
    onSelect: (id: number) => void;
    userLevel: number;
    isVip: boolean;
};

export default function AssetGrid({
    items,
    selectedId,
    onSelect,
    userLevel,
    isVip,
}: Props) {
    return (
        <div className="grid  grid-cols-8 md:grid-cols-16 gap-2">
            {items.map((item) => {
                const locked = item.level > userLevel || (item.vipOnly && !isVip);
                const selected = selectedId === item.id;


                return (

                    <TooltipProvider key={item.id}>
                        <Tooltip>
                            <TooltipTrigger>
                                <button
                                    onClick={() => onSelect(item.id)}
                                    className={clsx(
                                        "relative size-8 md:size-10 p-1 rounded border-2 border-transparent overflow-hidden cursor-pointer",
                                        selected && "!border-secondary"
                                    )}
                                >
                                    <Image
                                        src={item.url}
                                        alt={item.name}
                                        width={64}
                                        height={64}
                                        className="object-contain rounded"
                                    />
                                    {locked && (
                                        <div className="absolute inset-0 text-white text-xs flex items-center justify-center">
                                            {item.vipOnly &&
                                                (
                                                    <Crown className="w-4 h-4 text-primary" />
                                                )}

                                            {item.level > userLevel && (
                                                <OutlineText
                                                    text={String(item.level)}
                                                    color="black"
                                                    className="text-xs font-bold mt-1"
                                                />
                                            )}
                                        </div>
                                    )}
                                </button></TooltipTrigger>
                            <TooltipContent>{item.name}

                            </TooltipContent>
                        </Tooltip>
                    </TooltipProvider>
                );
            })}
        </div>
    );
}