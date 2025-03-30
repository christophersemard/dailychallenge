// app/jeu/[gameId]/layout.tsx
import GameLayout from "@/components/game/GameLayout"
import { getServerSession } from "next-auth"
import { authOptions } from "@/lib/auth"
import { redirect } from "next/navigation"
import { Color } from "@/types/colors.types"

export default async function GameLayoutWrapper({
    children,
    params,
}: {
    children: React.ReactNode
    params: { gameId: string }
}) {

    const { gameId } = await params

    const session = await getServerSession(authOptions)

    if (!session) {
        redirect("/")
    }

    const gameInfos: Record<string, { color: Color, urlGame: string, leaderboardId: number }> = {
        "cinema-1": { color: "red", urlGame: "/api/game-cinema-1", leaderboardId: 1 },
        "cinema-2": { color: "red", urlGame: "/api/game-cinema-2", leaderboardId: 2 },
        "cinema-3": { color: "red", urlGame: "/api/game-cinema-3", leaderboardId: 3 },
        "geographie-1": { color: "teal", urlGame: "/api/game-geo-1", leaderboardId: 4 },
        "geographie-2": { color: "teal", urlGame: "/api/game-geo-2", leaderboardId: 5 },
        "geographie-3": { color: "teal", urlGame: "/api/game-geo-3", leaderboardId: 6 },
        "autres-1": { color: "blue", urlGame: "/api/game-autres-1", leaderboardId: 7 },
        "autres-2": { color: "blue", urlGame: "/api/game-autres-2", leaderboardId: 8 },
        "autres-3": { color: "blue", urlGame: "/api/game-autres-3", leaderboardId: 9 },
    }

    const info = gameInfos[gameId]

    if (!info) redirect("/")

    const today = new Date()
    const localDate = new Date(today.getTime() - today.getTimezoneOffset() * 60000)

    return (
        <GameLayout
            gameId={gameId}
            userId={session.user.id}
            date={localDate}
            color={info.color}
            urlGame={info.urlGame}
            leaderboardId={info.leaderboardId}
        >
            {children}
        </GameLayout>
    )
}
