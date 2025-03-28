// src/components/layout/CategoryDropdown.tsx
"use client"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ChevronDown } from "lucide-react"
import { useState } from "react"
import { useDebounce } from "@uidotdev/usehooks";
import Link from "next/link";

type CategoryTitle = "Cinéma" | "Géographie" | "Autres";

type CategoryDropdownProps = {
    title: CategoryTitle;
};


export default function CategoryDropdown({ title }: CategoryDropdownProps) {
    const [open, setOpen] = useState(false);
    const debouncedOpen = useDebounce(open, 200);

    const handleMouseEnter = () => {
        setOpen(true);
    };

    const handleMouseLeave = () => {
        setOpen(false);
    };

    const games: Record<string, { name: string; description: string; url: string; icon: string; status: string }[]> = {
        "Cinéma": [{
            name: "Jeu 1",
            description: "Trouve le film grâce aux indices",
            url: "/jeu/cinema-1",
            icon: "🍿",
            status: "available"
        },
        {
            name: "Jeu 2",
            description: "Trouve le film grâce aux photos",
            url: "/jeu/cinema-2",
            icon: "🎞️",
            status: "coming_soon"
        },
        {
            name: "Jeu 3",
            description: "Trouve le film grâce aux acteurs",
            url: "/jeu/cinema-3",
            icon: "🎬",
            status: "coming_soon"
        }],
        "Géographie": [

        ],
        "Autres": [

        ]
    }


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
                {games[title].map((game, i) => (
                    <>

                        {game.status === "available" ?
                            <Link href={game.url}
                                key={i}
                                className="px-3 py-2 hover:bg-background rounded block cursor-pointer text-sm transition"
                            >
                                <div className="font-medium text-foreground">
                                    {game.icon} {game.name}
                                </div>
                                <span className="text-xs text-muted">
                                    {game.description}
                                </span>
                            </Link>
                            :
                            <div
                                key={i}
                                className="px-3 py-2  rounded block  text-sm transition relative"
                            >
                                <div className="font-medium text-foreground">
                                    {game.icon} {game.name}
                                </div>
                                <span className="text-xs text-muted">
                                    {game.description}
                                </span>
                                <div className="absolute top-0 right-0 w-full h-full bg-white/50 rounded-md flex items-center justify-center text-black font-bold text-lg">
                                    <span className="-rotate-2">BIENTOT DISPONIBLE</span>
                                </div>
                            </div>

                        }

                        {
                            i < 2 && <div className="border-t border-muted/10" />
                        }
                    </>


                ))}
            </PopoverContent>
        </Popover>
    )
}
