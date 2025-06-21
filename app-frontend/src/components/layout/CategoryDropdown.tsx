"use client"

import { useEffect, useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { ChevronDown, Crown } from "lucide-react"
import { fetchClientWithAuth } from "@/lib/fetchClientWithAuth"
import Link from "next/link"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { useDebounce } from "@uidotdev/usehooks"

type Game = {
    id: number
    name: string
    description: string
    imgUrl: string | null
    path: string
    status: string
}

type Category = {
    id: number
    name: string
    color: string
    games: Game[]
}

export default function CategoryDropdown() {
    const [categories, setCategories] = useState<Category[]>([])
    const [openCategory, setOpenCategory] = useState<number | null>(null)
    const debouncedOpen = useDebounce(openCategory, 200)

    useEffect(() => {
        fetchCategories()
    }, [])

    const fetchCategories = async () => {
        const { data, error } = await fetchClientWithAuth<Category[]>("/api/leaderboard/games-and-categories")
        if (error || !data) {
            console.error("Erreur récupération des catégories", error)
            return
        }
        setCategories(data)
    }

    return (
        <>
            {categories.map((category) => {
                const hasVisibleGames = category.games.length > 0 &&
                    category.games.some(
                        (game) => game.status === "available" || game.status === "coming_soon"
                    );

                if (!hasVisibleGames) return null;

                return (
                    <Popover
                        key={category.id}
                        open={debouncedOpen === category.id}
                        onOpenChange={(open) => setOpenCategory(open ? category.id : null)}
                    >
                        <PopoverTrigger
                            onMouseEnter={() => setOpenCategory(category.id)}
                            onMouseLeave={() => setOpenCategory(null)}
                            className="flex items-center gap-1 font-bold text-base text-foreground dropdown-trigger focus:outline-none"
                        >
                            {category.name} <ChevronDown size={14} />
                        </PopoverTrigger>

                        <PopoverContent
                            onMouseEnter={() => setOpenCategory(category.id)}
                            onMouseLeave={() => setOpenCategory(null)}
                            className="mt-4 w-72 p-2 space-y-1 bg-white border-none shadow-lg"
                            align="start"
                        >
                            {category.games.map((game, i) => {
                                if (
                                    game.status !== "available" &&
                                    game.status !== "coming_soon"
                                ) return null;

                                return (
                                    <div key={game.id}>
                                        {game.status === "available" ? (
                                            <Link
                                                href={`/jeu/${game.path}`}
                                                className="px-2 py-2 hover:bg-background rounded flex items-center space-x-5 text-sm transition"
                                            >
                                                <div>
                                                    {game.imgUrl ? (
                                                        <Image
                                                            height={32}
                                                            width={32}
                                                            src={game.imgUrl}
                                                            alt={game.name}
                                                        />
                                                    ) : (
                                                        <Crown className="w-8 h-8" />
                                                    )}
                                                </div>
                                                <div className="flex flex-col items-start">
                                                    <div className="font-bold text-lg">{game.name}</div>
                                                    <div className="text-xs text-muted-foreground">
                                                        {game.description}
                                                    </div>
                                                </div>
                                            </Link>
                                        ) : (
                                            <div className="px-2 py-2 rounded flex items-center space-x-5 text-sm relative cursor-default">
                                                <div>
                                                    {game.imgUrl ? (
                                                        <Image
                                                            height={32}
                                                            width={32}
                                                            src={game.imgUrl}
                                                            alt={game.name}
                                                        />
                                                    ) : (
                                                        <Crown className="w-8 h-8" />
                                                    )}
                                                </div>
                                                <div className="flex flex-col items-start">
                                                    <div className="font-bold text-lg">{game.name}</div>
                                                    <div className="text-xs text-muted-foreground">
                                                        {game.description}
                                                    </div>
                                                </div>
                                                <div className="absolute top-0 right-0 w-full h-full bg-white/50 rounded-md flex items-center justify-center text-black font-bold text-lg">
                                                    <span className="-rotate-2">BIENTÔT DISPONIBLE</span>
                                                </div>
                                            </div>
                                        )}

                                        {i < category.games.length - 1 && (
                                            <div className="border-t border-muted/10" />
                                        )}
                                    </div>
                                );
                            })}
                        </PopoverContent>
                    </Popover>
                );
            })}

        </>
    )
}
