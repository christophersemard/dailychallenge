import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { fetchServerAction } from "@/app/actions/fetch-proxy";
import { GameCategory } from "@/types/game.types";
import { Badge } from "@/components/ui/badge";
import Card from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";
import { Gamepad } from "lucide-react";
import GameStatusCell from "@/components/admin/GameStatusCell";

type GameWithStatus = {
    id: number;
    name: string;
    path: string;
    status: string;
    imgUrl: string | null;
    categoryName: string;
    categoryColor: string;
    generationStatus: "implemented" | "not_implemented" | "error";
    missingDays: number;
};

const getMissingDays = async (
    path: string
): Promise<{ generationStatus: GameWithStatus["generationStatus"]; missingDays: number }> => {
    const months = ["2025-06", "2025-07"];
    const days = new Set<string>();

    let is404 = false;

    for (const month of months) {
        const res = await fetchServerAction<{ missingDays: string[] }>(
            `/api/admin/game-${path}/status?month=${month}`
        );


        if (res.error?.statusCode === 404) {
            is404 = true;
            break;
        }

        if (res.data?.missingDays) {
            res.data.missingDays.forEach((d) => days.add(d));
        }
    }

    if (is404) {
        return { generationStatus: "not_implemented", missingDays: 0 };
    }

    const today = new Date();
    const next31 = Array.from({ length: 31 }, (_, i) =>
        new Date(today.getFullYear(), today.getMonth(), today.getDate() + i)
            .toISOString()
            .split("T")[0]
    );

    const count = next31.filter((d) => days.has(d)).length;
    return { generationStatus: "implemented", missingDays: count };
};



export default async function AdminGamesPage() {
    const session = await getServerSession(authOptions);
    if (!session) return <div className="p-4">Non autorisé</div>;

    const { data: categories, error } = await fetchServerAction<GameCategory[]>(
        "/api/leaderboard/games-and-categories"
    );

    if (error || !categories) {
        return (
            <div className="text-center py-12 text-muted-foreground">
                Erreur lors du chargement des jeux.
            </div>
        );
    }

    const allGames: GameWithStatus[] = [];

    for (const category of categories) {
        for (const game of category.games) {
            const { generationStatus, missingDays } = await getMissingDays(game.path);

            allGames.push({
                id: game.id,
                name: game.name,
                path: game.path,
                status: game.status,
                imgUrl: game.imgUrl,
                categoryName: category.name,
                categoryColor: category.color,
                generationStatus,
                missingDays,
            });
        }
    }


    return (
        <div className="p-4 space-y-6">
            <Card className="p-4" title="Jeux" color="primary">
                <table className="w-full text-sm">
                    <thead>
                        <tr className="text-muted-foreground text-left border-b">
                            <th className="py-2">Catégorie</th>
                            <th className="py-2">Nom</th>
                            <th className="py-2">Statut</th>
                            <th className="py-2">Génération</th>
                            <th className="py-2"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {allGames.map((game) => (
                            <tr key={game.id} className="border-b last:border-none">
                                <td className="py-2">
                                    <Badge
                                        variant="outline"
                                        className={`bg-${game.categoryColor} text-white font-bold text-sm`}
                                    >
                                        {game.categoryName}
                                    </Badge>
                                </td>
                                <td className="py-2 font-semibold">
                                    <div className="flex items-center gap-2">
                                        {game.imgUrl ? (
                                            <Image src={game.imgUrl} alt={game.name} width={24} height={24} />
                                        ) : (
                                            <Gamepad className="w-5 h-5 text-muted-foreground" />
                                        )}
                                        {game.name}
                                    </div>
                                </td>

                                <td className="py-2">
                                    {game.generationStatus === "implemented" ? (
                                        <GameStatusCell
                                            gamePath={game.path}
                                            initialStatus={game.status as "available" | "coming_soon" | "unavailable"}
                                        />
                                    ) : (
                                        <span className="text-muted-foreground italic">Non implémenté</span>
                                    )}

                                </td>
                                <td className="py-2">
                                    {game.generationStatus === "not_implemented" ? (
                                        <span className="text-muted-foreground italic">Non implémenté</span>
                                    ) : game.generationStatus === "error" ? (
                                        <span className="text-red-500 italic">Erreur serveur</span>
                                    ) : game.missingDays > 0 ? (
                                        <span className="text-red-600 font-medium">
                                            {game.missingDays} jour(s) manquant(s)
                                        </span>
                                    ) : (
                                        <span className="text-green-600 font-medium">Complet</span>
                                    )}

                                </td>
                                <td className="py-2">
                                    {game.generationStatus === "implemented" && game.missingDays > 0 && (

                                        <Button size="sm" asChild>
                                            <Link href={`/admin/jeux/${game.path}`}>Générer</Link>
                                        </Button>
                                    )}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </Card>
        </div>
    );
}
