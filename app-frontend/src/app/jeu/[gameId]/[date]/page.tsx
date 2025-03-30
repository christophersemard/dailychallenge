// app/jeu/[gameId]/[date]/page.tsx
import GameCinema1 from "@/components/game/games/GameCinema1"
import { redirect } from "next/navigation"
import { Color } from "@/types/colors.types"

export default async function GamePage({
    params,
}: {
    params: { gameId: string; date: string }
}) {
    const { gameId, date } = await params

    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        redirect("/")
    }

    const today = new Date()
    const dateObj = new Date(date)
    if (dateObj > today) redirect("/")

    const colorMap: Record<string, Color> = {
        "cinema-1": "red",
        "cinema-2": "red",
        "cinema-3": "red",
        "geographie-1": "teal",
        "geographie-2": "teal",
        "geographie-3": "teal",
        "autres-1": "blue",
        "autres-2": "blue",
        "autres-3": "blue",
    }

    const color = colorMap[gameId]
    if (!color) redirect("/")

    if (gameId === "cinema-1") {
        return <GameCinema1 gameId={gameId} color={color} date={dateObj} />
    }

    return <div>Jeu pas encore disponible.</div>
}
