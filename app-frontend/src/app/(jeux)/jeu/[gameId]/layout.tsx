// app/jeu/[gameId]/layout.tsx
import GameLayout from "@/components/game/GameLayout";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { fetchServerAction } from "@/app/actions/fetch-proxy";
import { Color } from "@/types/colors.types";
import { Game, GameCategory } from "@/types/game.types";

export default async function GameLayoutWrapper({
    children,
    params,
}: {
    children: React.ReactNode;
    params: { gameId: string };
}) {
    const { gameId } = await params;

    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/");
    }

    // Récupérer les jeux sur l'api
    const { data: gameInfos, error } = await fetchServerAction<GameCategory[]>(
        "/api/leaderboard/games-and-categories"
    );


    if (error || !gameInfos) {
        redirect("/");
    }

    // Trouver le jeu correspondant à gameId
    let info = null;
    for (const category of gameInfos) {
        const game = category.games.find((g: Game) => g.path === gameId);
        if (game) {
            info = {
                color: category.color as Color,
                urlGame: "game-" + game.path,
                leaderboardId: game.id,
            };
            break;
        }
    }

    const today = new Date();
    const localDate = new Date(
        today.getTime() - today.getTimezoneOffset() * 60000
    );

    return (
        <GameLayout
            gameId={gameId}
            userId={session.user.id}
            date={localDate}
            color={info!.color}
            urlGame={info!.urlGame}
            leaderboardId={info!.leaderboardId}
        >
            {children}
        </GameLayout>
    );
}
