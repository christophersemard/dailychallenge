"use client"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { useEffect, useState } from "react"
import { fetchClientWithAuth } from "@/lib/fetchClientWithAuth"

type Game = {
    id: number
    name: string
    description: string
    imgUrl: string | null
    path: string
    status: string
    categoryId: number
}

type Category = {
    id: number
    name: string
    color: string
    games: Game[]
}

type Props = {
    initialCategory: string | null
    initialGame: string | null
    onChange: (categoryId: string | null, gameId: string | null) => void
}

export default function LeaderboardCategorySelector({
    initialCategory = "all",
    initialGame = "all",
    onChange,
}: Props) {
    const [categories, setCategories] = useState<Category[]>([])
    const [selectedCategory, setSelectedCategory] = useState<string>("all")
    const [selectedGame, setSelectedGame] = useState<string>("all")

    useEffect(() => {
        fetchCategories()
    }, [])

    const fetchCategories = async () => {
        const { data, error } = await fetchClientWithAuth<Category[]>(
            "/api/leaderboard/games-and-categories"
        )
        if (error || !data) {
            console.error("Erreur récupération des catégories", error)
            return
        }
        setCategories(data)
    }

    useEffect(() => {
        onChange(
            selectedCategory === "all" ? null : selectedCategory,
            selectedGame === "all" ? null : selectedGame
        )
    }, [selectedCategory, selectedGame])

    const games =
        categories.find((cat) => String(cat.id) === selectedCategory)?.games ?? []

    return (
        <div className="flex flex-wrap gap-4 mb-4">
            <Select
                value={selectedCategory}
                onValueChange={(value) => {
                    setSelectedCategory(value)
                    setSelectedGame("all") // Réinitialiser les jeux
                }}
            >
                <SelectTrigger className="w-56">
                    <SelectValue placeholder="Toutes les catégories" />
                </SelectTrigger>
                <SelectContent>
                    <SelectItem value="all">Toutes les catégories</SelectItem>
                    {categories.map((cat) => (
                        <SelectItem key={cat.id} value={String(cat.id)}>
                            {cat.name}
                        </SelectItem>
                    ))}
                </SelectContent>
            </Select>

            {selectedCategory !== "all" && (
                <Select
                    value={selectedGame}
                    onValueChange={(value) => setSelectedGame(value)}
                >
                    <SelectTrigger className="w-56">
                        <SelectValue placeholder="Tous les jeux" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">Tous les jeux</SelectItem>
                        {games.map((game) => (
                            <SelectItem key={game.id} value={String(game.id)}>
                                {game.name}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            )}
        </div>
    )
}
