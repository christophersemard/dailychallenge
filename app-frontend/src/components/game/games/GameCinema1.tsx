// components/game/games/GameCinema1.tsx
"use client"
import Card from "@/components/ui/card"
import GamePlay from "@/components/game/GamePlay"
import GameResultMovie from "@/components/game/GameResultMovie"
import { useEffect, useState } from "react"
import { formatDateLong } from "@/utils/formatDate"

type Props = {
    gameId: string,
    color: "primary" | "secondary" | "success" | "danger" | "teal" | "red" | "purple" | "yellow" | "green" | "blue" | "pink",
    date: Date
}

export default function GameCinema1({ gameId, color, date }: Props) {

    const [gameInfos, setGameInfos] = useState<{ genres: string[], duration: string, releaseDate: string, imdbRating: string, director: string, actors: string, scenario: string } | null | boolean>(null)
    const [gameResult, setGameResult] = useState<boolean | null>(null)
    const [gameTries, setGameTries] = useState<number>(0)

    const titleCard = "Jeu cinéma 1 - " + formatDateLong(date)

    useEffect(() => {
        const checkGameResult = async () => {
            // simulate result check
            const response = await new Promise((resolve) => setTimeout(() => resolve(false), 300))
            setGameResult(response)
        }

        checkGameResult()
    }, [gameId])

    if (gameInfos === null) return (
        <Card title={titleCard} color={color}>
            <div>Chargement des informations ...</div>
        </Card>)

    if (gameInfos === false) return (
        <Card title={titleCard} color={color}>
            <div>Pas de jeu disponible aujourd&apos;hui, revenez un autre jour !</div>
        </Card>)



    if (alreadyPlayed) {
        return <GameResultMovie gameId={gameId} color={color} />
    }

    return (
        <Card title={titleCard} color={color}>
            <h2 className="text-lg font-bold text-danger">🎬 Indices du film</h2>

            <ul className="space-y-2 text-sm">
                <li><strong>Genres :</strong> Action, Science-fiction, Thriller</li>
                <li><strong>Durée :</strong> 2h28</li>
                <li><strong>Date de sortie :</strong> 21 juillet 2010</li>
                <li><strong>Note IMDB :</strong> ???</li>
                <li><strong>Réalisateur :</strong> Christopher Nolan</li>
                <li><strong>Acteurs :</strong> ???</li>
                <li><strong>Scénario :</strong> ???</li>
            </ul>


            <GamePlay gameId={gameId} color={color} />
        </Card>
    )
}
