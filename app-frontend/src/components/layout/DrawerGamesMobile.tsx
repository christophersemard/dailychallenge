"use client"

import { useEffect, useState } from "react"
import { X } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { fetchClientWithAuth } from "@/lib/fetchClientWithAuth"
import { isErrorApi } from "@/lib/typeguards"
import { GameCategory } from "@/types/game.types"
import { Color } from "@/types/colors.types"
import { cn } from "@/lib/utils"
import { Crown } from "lucide-react"
import { Button } from "@/components/ui/button"

type Props = {
    onClose: () => void
}

const colorMap: Record<Color, { bg: string; text: string }> = {
    primary: { bg: "bg-primary/5 hover:bg-primary/7", text: "text-primary fill-primary" },
    secondary: { bg: "bg-secondary/5 hover:bg-secondary/7", text: "text-secondary fill-secondary" },
    success: { bg: "bg-success/5 hover:bg-success/7", text: "text-success fill-success" },
    danger: { bg: "bg-danger/5 hover:bg-danger/7", text: "text-danger fill-danger" },
    teal: { bg: "bg-teal/5 hover:bg-teal/7", text: "text-teal fill-teal" },
    red: { bg: "bg-red/5 hover:bg-red/7", text: "text-red fill-red" },
    purple: { bg: "bg-purple/5 hover:bg-purple/7", text: "text-purple fill-purple" },
    yellow: { bg: "bg-yellow/5 hover:bg-yellow/7", text: "text-yellow fill-yellow" },
    green: { bg: "bg-success/5 hover:bg-success/7", text: "text-success fill-success" },
    blue: { bg: "bg-blue/5 hover:bg-blue/7", text: "text-blue fill-blue" },
    pink: { bg: "bg-pink/5 hover:bg-pink/7", text: "text-pink fill-pink" },
    orange: { bg: "bg-orange/5 hover:bg-orange/7", text: "text-orange fill-orange" },
    black: { bg: "bg-black/5 hover:bg-black/7", text: "text-black fill-black" },
    white: { bg: "bg-white/5 hover:bg-white/7", text: "text-white fill-white" },
    background: { bg: "bg-background/5 hover:bg-background/7", text: "text-background fill-background" },
}

export default function DrawerGamesMobile({ onClose }: Props) {
    const [categories, setCategories] = useState<GameCategory[]>([])
    const [error, setError] = useState(false)

    useEffect(() => {
        const fetch = async () => {
            const { data, error } = await fetchClientWithAuth<GameCategory[]>("/api/leaderboard/games-and-categories")
            if (error || !data) setError(true)
            else setCategories(data)
        }
        fetch()
    }, [])

    const visibleCategories = categories.filter((cat) =>
        cat.games.some((g) => g.status === "available" || g.status === "coming_soon")
    )

    return (
        <aside className="fixed top-0 right-0 w-[320px] h-full bg-white z-50 border-l border-muted/50 shadow-lg flex flex-col">
            <div className="flex justify-between items-center p-4 border-b border-muted/50 font-bold text-lg text-foreground">
                Jeux & Classements
                <button onClick={onClose} className="hover:text-muted transition">
                    <X />
                </button>
            </div>

            {/* Ajout d'un lien vers la page /classement */}
            <div className="p-4">
                <Button variant="secondary" className="w-full justify-center text-sm" asChild>
                    <Link href="/classement">
                        Voir les classements
                    </Link>
                </Button>
            </div>

            <div className="p-4 pt-0 space-y-6 overflow-y-auto flex-1">
                {error ? (
                    <p className="text-sm text-muted-foreground">Erreur lors du chargement des jeux.</p>
                ) : (
                    visibleCategories.map((cat) => (
                        <div key={cat.id}>
                            <h3 className="text-sm font-semibold mb-2 text-muted-foreground">{cat.name}</h3>
                            <ul className="space-y-2">
                                {cat.games
                                    .filter((g) => g.status === "available" || g.status === "coming_soon")
                                    .map((game) => {
                                        const { bg, text } = colorMap[cat.color as Color]

                                        const content = (
                                            <div className={cn("p-2 rounded flex items-center space-x-3 relative", bg)}>
                                                <div className={cn("shrink-0", text)}>
                                                    {game.imgUrl ? (
                                                        <Image src={game.imgUrl} alt={game.name} width={48} height={48} className="w-8 h-8" />
                                                    ) : (
                                                        <Crown className="w-6 h-6 text-muted-foreground" />
                                                    )}
                                                </div>
                                                <div className="flex flex-col items-start">
                                                    <div className="font-bold text-md text-start">{game.name}</div>
                                                    <div className="text-xs text-muted-foreground text-start mb-1">{game.description}</div>
                                                </div>

                                                {game.status === "coming_soon" && (
                                                    <div className="border-2 border-background absolute top-0 right-0 w-full h-full bg-white/80 rounded-md flex items-center justify-center text-black font-bold text-lg">
                                                        <span className="-rotate-4 text-black shadow font-black">BIENTÔT</span>
                                                    </div>
                                                )}
                                            </div>
                                        )

                                        return (
                                            <li key={game.id}>
                                                {game.status === "available" ? (
                                                    <Link href={`/jeu/${game.path}`} onClick={onClose}>
                                                        {content}
                                                    </Link>
                                                ) : (
                                                    content
                                                )}
                                            </li>
                                        )
                                    })}
                            </ul>
                        </div>
                    ))
                )}
            </div>
        </aside>
    )
}
