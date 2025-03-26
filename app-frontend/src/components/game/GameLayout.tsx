// components/game/GameLayout.tsx
import { ReactNode } from "react"
import GameLeaderboard from "./GameLeaderboard"
import GameHistory from "./GameHistory"

interface Props {
    children: ReactNode
    gameId: string
    userId: string
}

export default function GameLayout({ children, gameId, userId }: Props) {
    return (
        <div className="max-w-7xl mx-auto px-4 py-8 grid grid-cols-1 xl:grid-cols-[1fr_300px] gap-8">
            <div className="flex flex-col gap-8 ">
                {children}
            </div>

            <div className="flex flex-col gap-8 ">
                <GameLeaderboard gameId={gameId} userId={userId} />
                <GameHistory gameId={gameId} userId={userId} />
            </div>
        </div>
    )
}
