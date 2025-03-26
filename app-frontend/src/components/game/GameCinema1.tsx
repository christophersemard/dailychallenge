// components/game/games/GameCinema1.tsx
import Card from "@/components/ui/card"
import GamePlay from "@/components/game/GamePlay"

type Props = {
    gameId: string,
    color: "primary" | "secondary" | "success" | "danger" | "teal" | "red" | "purple" | "yellow" | "green" | "blue" | "pink"
}

export default function GameCinema1({ gameId, color }: Props) {
    return (
        <Card title="Jeu cinéma 1 - 22 décembre 2024" color={color}>
            <h2 className="text-lg font-bold text-danger">🎬 Indices du film</h2>

            <ul className="space-y-2 text-sm">
                <li><strong>Genres :</strong> Action, Science-fiction, Thriller</li>
                <li><strong>Durée :</strong> 2h28</li>
                <li><strong>Date de sortie :</strong> 21 juillet 2010</li>
                <li><strong>Note IMDB :</strong> ???</li>
                <li><strong>Réalisateur :</strong> Christopher Nolan</li>
                <li><strong>Acteurs :</strong> ???</li>
                <li><strong>Scénario :</strong> ???</li>
            </ul>


            <GamePlay gameId={gameId} color={color} />
        </Card>
    )
}
