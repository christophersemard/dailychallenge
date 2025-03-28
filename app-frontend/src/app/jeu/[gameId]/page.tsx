// app/jeu/[gameId]/page.tsx
import GameLayout from "@/components/game/GameLayout"
import FloatingBackgroundShapes from "@/components/layout/FloatingBackgroundShapes"
import GameCinema1 from "@/components/game/games/GameCinema1"

type GameId = "cinema-1" | "cinema-2" | "cinema-3";

type Props = {
    params: {
        gameId: GameId
    }
}


const GameInfos = {
    "cinema-1": {
        component: <GameCinema1 gameId="cinema-1" color="red" date={new Date()} />,
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

export default async function GamePage({ params }: Props) {
    const { gameId } = await params

    return (<>
        <FloatingBackgroundShapes variant="red" />
        <GameLayout
            gameId={gameId}
            userId={"current-user-id"} // ⚠️ à remplacer quand auth branchée
        >
            {GameInfos[gameId as GameId].component}
        </GameLayout></>
    )
}
