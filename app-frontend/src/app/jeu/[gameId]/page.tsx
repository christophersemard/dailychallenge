// app/jeu/[gameId]/[date]/page.tsx
import GameCinema1 from "@/components/game/games/GameCinema1";
import GameCinema2 from "@/components/game/games/GameCinema2";
import { redirect } from "next/navigation";
import { Color } from "@/types/colors.types";

export default async function GamePage({
    params,
}: {
    params: { gameId: string };
}) {
    const { gameId } = await params;

    const today = new Date();
    // Convertir la date au fuseau horaire local
    const localDate = new Date(
        today.getTime() - today.getTimezoneOffset() * 60000
    );

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
    };
    const color = colorMap[gameId];
    if (!color) redirect("/");

    if (gameId === "cinema-1") {
        return <GameCinema1 gameId={gameId} color={color} date={localDate} />;
    }
    if (gameId === "cinema-2") {
        return <GameCinema2 gameId={gameId} color={color} date={localDate} />;
    }

    return <div>Jeu pas encore disponible.</div>;
}
