// app/jeu/[gameId]/page.tsx
import GameLayout from "@/components/game/GameLayout"
import GameDynamicContent from "@/components/game/GameDynamicContent"

interface Props {
    params: {
        gameId: string
    }
}

export default function GamePage({ params }: Props) {
    const { gameId } = params

    return (
        <GameLayout
            gameId={gameId}
            userId={"current-user-id"} // ⚠️ à remplacer quand auth branchée
        >
            <GameDynamicContent gameId={gameId} />
        </GameLayout>
    )
}
