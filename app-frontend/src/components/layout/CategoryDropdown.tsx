// src/components/layout/CategoryDropdown.tsx
"use client"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ChevronDown } from "lucide-react"
import { useState } from "react"
import { useDebounce } from "@uidotdev/usehooks";

type CategoryDropdownProps = {
    title: string
}

export default function CategoryDropdown({ title }: CategoryDropdownProps) {
    const [open, setOpen] = useState(false);
    const debouncedOpen = useDebounce(open, 200);

    const handleMouseEnter = () => {
        setOpen(true);
    };

    const handleMouseLeave = () => {
        setOpen(false);
    };


    return (
        <Popover open={debouncedOpen} onOpenChange={setOpen}>
            <PopoverTrigger
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave} className="flex items-center gap-1 font-bold text-base text-foreground dropdown-trigger focus:outline-none" >
                {title} <ChevronDown size={14} />
            </PopoverTrigger>

            <PopoverContent
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave} className="mt-4 w-64 p-2 space-y-1 bg-white border-none  shadow-lg" align="start">
                {Array.from({ length: 3 }).map((_, i) => (
                    <>
                        <div
                            key={i}
                            className="px-3 py-2 hover:bg-background rounded  cursor-pointer text-sm transition"
                        >
                            <div className="font-medium text-foreground">
                                {["🍿", "🎬", "❓"][i]} JEU {title.toUpperCase()} {i + 1}
                            </div>
                            <span className="text-xs text-muted">
                                {[
                                    "Devine le titre du film grâce aux photos",
                                    "Devine le titre du film avec les acteurs",
                                    "Devine selon les indices progressifs",
                                ][i]}
                            </span>
                        </div>
                        {
                            i < 2 && <div className="border-t border-muted/10" />
                        }

                    </>
                ))}
            </PopoverContent>
        </Popover>
    )
}
