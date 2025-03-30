// components/game/GameLayout.tsx
import { ReactNode } from "react"
import GameLeaderboard from "./GameLeaderboard"
import GameHistory from "./GameHistory"
import { Color } from "@/types/colors.types"
import FloatingBackgroundShapes from "@/components/layout/FloatingBackgroundShapes"

interface Props {
    children: ReactNode
    gameId: string
    userId: string
    date: Date
    color: Color
    urlGame: string
    leaderboardId: number
}

export default function GameLayout({ children, gameId, userId, date, color, urlGame, leaderboardId }: Props) {
    return (
        <>
            <FloatingBackgroundShapes variant={color} />
            <div className="w-full max-w-7xl mx-auto py-4 md:py-4 grid grid-cols-1 xl:grid-cols-[1fr_350px] gap-8">
                <div className="flex flex-col gap-8 ">
                    {children}
                </div>

                <div className="flex flex-col gap-8 ">
                    <GameLeaderboard gameId={gameId} userId={userId} color={color} leaderboardId={leaderboardId} />
                    <GameHistory gameId={gameId} userId={userId} date={date} color={color} urlGame={urlGame} />
                </div>
            </div></>
    )
}
