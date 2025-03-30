// src/components/layout/CategoryDropdown.tsx
"use client"

import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ChevronDown } from "lucide-react"
import { useState } from "react"
import { useDebounce } from "@uidotdev/usehooks";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils"
import { Crown } from "lucide-react";

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
            name: "IndiCiné",
            description: "Trouve le film grâce aux indices",
            url: "/jeu/cinema-1",
            icon: "/assets/game-icons/cinema-1.png",
            status: "available"
        },
        {
            name: "Jeu 2",
            description: "Trouve le film grâce aux photos",
            url: "/jeu/cinema-2",
            icon: "/assets/game-icons/cinema-2.png",
            status: "coming_soon"
        },
        {
            name: "Jeu 3",
            description: "Trouve le film grâce aux acteurs",
            url: "/jeu/cinema-3",
            icon: "/assets/game-icons/cinema-2.png",
            status: "coming_soon"
        }],
        "Géographie": [

            {
                name: "Jeu 1",
                description: "Trouve le pays grâce aux indices",
                url: "/jeu/geographie-1",
                icon: "/assets/game-icons/cinema-2.png",
                status: "coming_soon"
            },
            {
                name: "Jeu 2",
                description: "Trouve la capitale grâce aux photos",
                url: "/jeu/geographie-2",
                icon: "/assets/game-icons/cinema-2.png",
                status: "coming_soon"
            },
            {
                name: "Jeu 3",
                description: "Trouve le pays grâce aux drapeaux",
                url: "/jeu/geographie-3",
                icon: "/assets/game-icons/cinema-2.png",
                status: "coming_soon"
            }
        ],
        "Autres": [
            {
                name: "Jeu 1",
                description: "Je sais pas encore",
                url: "/jeu/autres-1",
                icon: "/assets/game-icons/cinema-2.png",
                status: "coming_soon"
            },
            {
                name: "Jeu 2",
                description: "Je sais pas encore",
                url: "/jeu/autres-2",
                icon: "/assets/game-icons/cinema-2.png",
                status: "coming_soon"
            },
            {
                name: "Jeu 3",
                description: "Je sais pas encore",
                url: "/jeu/autres-3",
                icon: "/assets/game-icons/cinema-2.png",
                status: "coming_soon"
            }

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
                onMouseLeave={handleMouseLeave} className="mt-4 w-72 p-2 space-y-1 bg-white border-none  shadow-lg" align="start">
                {games[title].map((game, i) => (
                    <>

                        {game.status === "available" ?
                            <Link href={game.url}
                                key={i}
                                className="px-2 py-1 hover:bg-background  rounded flex items-center space-x-5  cursor-pointer text-sm transition"
                            >
                                <div className={cn("")}>
                                    {game.icon ? <Image height={32} width={32} src={game.icon} alt={title} className="" /> : <Crown className="w-8 h-8" />}
                                </div>

                                <div className="flex flex-col items-start">
                                    <div className="font-bold text-lg text-start">{game.name}</div>
                                    <div className="text-xs text-muted-foreground text-start mb-1">{game.description}</div>
                                </div>
                            </Link>
                            :
                            <div
                                key={i}
                                className="px-2 py-1  rounded flex items-center space-x-5  text-sm transition relative"
                            >

                                <div className={cn("")}>
                                    {game.icon ? <Image height={32} width={32} src={game.icon} alt={title} className="" /> : <Crown className="w-8 h-8" />}
                                </div>

                                <div className="flex flex-col items-start">
                                    <div className="font-bold text-lg text-start">{game.name}</div>
                                    <div className="text-xs text-muted-foreground text-start mb-1">{game.description}</div>
                                </div>
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
