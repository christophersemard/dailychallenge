"use client"

import OutlineText from "@/components/ui/outline-text"
import Card from "@/components/ui/card"

type Props = {
    gameId: string,
    color: "primary" | "secondary" | "success" | "danger" | "teal" | "red" | "purple" | "yellow" | "green" | "blue" | "pink"
}

export default function GameResultMovie({ gameId, color }: Props) {
    // TODO: récupérer dynamiquement via API
    const result = {
        title: "Inception",
        status: "success" as "success" | "fail",
        score: 42,
        imdb: "8.8",
        date: "21 juillet 2010",
        director: "Christopher Nolan",
        genres: "Action, Thriller, SF",
    }

    return (
        <Card title="Jeu cinéma 1 - 22 décembre 2024" color={color}>
            <h2 className="text-lg font-bold text-center">
                {result.status === "success" ? "🎉 Bravo !" : "❌ Dommage"}
            </h2>

            <div className="text-center">
                Tu as {result.status === "success" ? "trouvé le film" : "épuisé tous tes essais"} !
            </div>

            <div className="text-center text-2xl font-bold">
                🎬 <span className="underline">{result.title}</span>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
                <div>
                    <span className="text-muted-foreground block text-xs">Genres</span>
                    {result.genres}
                </div>
                <div>
                    <span className="text-muted-foreground block text-xs">Réalisateur</span>
                    {result.director}
                </div>
                <div>
                    <span className="text-muted-foreground block text-xs">Date de sortie</span>
                    {result.date}
                </div>
                <div>
                    <span className="text-muted-foreground block text-xs">Note IMDB</span>
                    {result.imdb}
                </div>
                <div>
                    <span className="text-muted-foreground block text-xs">Score obtenu</span>
                    <OutlineText text={`${result.score} pts`} color="purple" size="lg" />
                </div>
            </div></Card>
    )
}
