// app/jeu/[gameId]/page.tsx
import GameLayout from "@/components/game/GameLayout"
import FloatingBackgroundShapes from "@/components/layout/FloatingBackgroundShapes"
import GameCinema1 from "@/components/game/games/GameCinema1"
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { Color } from "@/types/colors.types"

type GameId = "cinema-1" | "cinema-2" | "cinema-3";

type Props = {
    params: {
        gameId: GameId
        date: string
    }
}

export default async function GamePage({ params }: Props) {
    const { gameId, date } = await params;

    // Si la date n'est pas en format yyyy-mm-dd, on redirige vers la page d'accueil
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
        redirect("/");
    }
    // Si la date est dans le futur, on redirige vers la page d'accueil
    const today = new Date()
    if (new Date(date) > today) {
        redirect("/");
    }

    const dateGame = new Date(date)

    const session = await getServerSession(authOptions);


    const GameInfos = {
        "cinema-1": {
            component: <GameCinema1 gameId="cinema-1" color="red" date={dateGame} />,
            tries: 10,
            color: "red" as Color
        },
        "cinema-2": {
            component: <></>,
            tries: 4,
            color: "blue" as Color
        },
        "cinema-3": {
            component: <></>,
            tries: 4,
            color: "green" as Color
        },
    }

    return (<>
        <FloatingBackgroundShapes variant={GameInfos[gameId as GameId].color} />
        <GameLayout
            gameId={gameId}
            userId={session!.user.id}
            date={dateGame}
            color={GameInfos[gameId as GameId].color}
        >
            {GameInfos[gameId as GameId].component}
        </GameLayout></>
    )
}
