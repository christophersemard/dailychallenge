// app/admin/page.tsx

import Card from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Crown, Users, Gamepad2, Settings } from "lucide-react";
import { fetchServerAction } from "@/app/actions/fetch-proxy";

export default async function AdminDashboardPage() {
    console.log("[AdminDashboardPage] Fetching summary...");

    const { data: summary, error } = await fetchServerAction<{
        totalUsers: number;
        activeVip: number;
        totalGames: number;
    }>("/api/admin/summary");

    if (error) {
        console.error("Erreur summary admin:", error);
    }

    console.log("Résumé admin:", summary);

    return (
        <div className="space-y-6 p-4">
            <h1 className="text-2xl font-semibold mt-6">Dashboard d'administration</h1>
            <p className="text-muted-foreground">
                Vue d'ensemble de l'activité et accès rapide aux outils de gestion.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
                <Card title="" color="secondary" className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <Users className="w-5 h-5 text-muted-foreground" />
                        <h2 className="font-semibold">Utilisateurs</h2>
                    </div>
                    <p className="text-lg">{summary?.totalUsers ?? "–"}</p>
                    <Link href="/admin/utilisateurs">
                        <Button variant="outline-background" size="sm">
                            Gérer les utilisateurs
                        </Button>
                    </Link>
                </Card>

                <Card title="" color="primary" className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <Crown className="w-5 h-5 text-primary" />
                        <h2 className="font-semibold">VIP actifs</h2>
                    </div>
                    <p className="text-lg">{summary?.activeVip ?? "–"}</p>
                </Card>

                <Card title="" color="teal" className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <Gamepad2 className="w-5 h-5 text-muted-foreground" />
                        <h2 className="font-semibold">Jeux</h2>
                    </div>
                    <p className="text-lg">{summary?.totalGames ?? "–"} disponibles</p>
                    <Link href="/admin/jeux">
                        <Button variant="outline-background" size="sm">
                            Gérer les jeux
                        </Button>
                    </Link>
                </Card>

                <Card title="" color="red" className="flex flex-col gap-2">
                    <div className="flex items-center gap-2">
                        <Settings className="w-5 h-5 text-muted-foreground" />
                        <h2 className="font-semibold">Configuration</h2>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        Gestion des statuts, catégories, contenus.
                    </p>
                    <Button variant="outline-background" size="sm" disabled>
                        À venir
                    </Button>
                </Card>

            </div>
        </div>
    );
}
