"use client"

import { useEffect, useState } from "react"
import GamePlay from "./GamePlay"
import GameTries from "./GameTries"
import GameResultMovie from "./GameResultMovie"
import GameCinema1 from "./GameCinema1"

type GameId = "cinema-1" | "cinema-2" | "cinema-3";

type Props = {
    gameId: GameId
}


const GameInfos = {
    "cinema-1": {
        component: <GameCinema1 gameId="cinema-1" color="red" />,
        tries: 10,
        color: "red" as "primary" | "secondary" | "success" | "danger" | "teal" | "red" | "purple" | "yellow" | "green" | "blue" | "pink"
    },
    "cinema-2": {
        component: <></>,
        tries: 4,
        color: "blue" as "primary" | "secondary" | "success" | "danger" | "teal" | "red" | "purple" | "yellow" | "green" | "blue" | "pink"
    },
    "cinema-3": {
        component: <></>,
        tries: 4,
        color: "green" as "primary" | "secondary" | "success" | "danger" | "teal" | "red" | "purple" | "yellow" | "green" | "blue" | "pink"
    },

}

export default function GameDynamicContent({ gameId }: Props) {
    const [alreadyPlayed, setAlreadyPlayed] = useState<boolean | null>(null)

    useEffect(() => {
        // TODO: remplacer par un vrai appel API
        const checkGameResult = async () => {
            // simulate result check
            const response = await new Promise((resolve) => setTimeout(() => resolve(false), 300))
            setAlreadyPlayed(false)
        }

        checkGameResult()
    }, [gameId])

    if (alreadyPlayed === null) return <p>Chargement du jeu...</p>

    if (alreadyPlayed) {
        return <GameResultMovie gameId={gameId} color={GameInfos[gameId as GameId].color} />
    }
    return (
        <>
            {GameInfos[gameId as GameId].component}
            <GameTries gameId={gameId} />
        </>
    )
}
