// app/classement/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { LeaderboardEntry } from "@/types/game.types";
import { getLeaderboardData } from "@/lib/leaderboard/getLeaderboardData";
import LeaderboardFilters from "@/components/leaderboard/LeaderboardFilters";
import LeaderboardUserList from "@/components/leaderboard/LeaderboardUserList";
import LeaderboardPagination from "@/components/leaderboard/LeaderboardPagination";
import { useSession } from "next-auth/react";
import Card from "@/components/ui/card";

export default function ClassementPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const { data: session } = useSession();
    const userId = session?.user?.id;

    const [entries, setEntries] = useState<LeaderboardEntry[]>([]);
    const [loading, setLoading] = useState(true);

    // Filtres extraits des paramètres d’URL
    const type = (searchParams.get("type") || "global") as "global" | "friends";
    const period = (searchParams.get("period") || "week") as
        | "week"
        | "month"
        | "year";
    const category = searchParams.get("category") || "";
    const gameId = searchParams.get("gameId") || "";
    const offset = parseInt(searchParams.get("offset") || "0", 10);

    // Récupération des données à chaque changement de filtre
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const data = await getLeaderboardData({
                type,
                period,
                category,
                gameId,
                offset,
            });

            setEntries(data);
            setLoading(false);
        };

        fetchData();
    }, [type, period, category, gameId, offset]);

    // Fonction pour mettre à jour les filtres dans l’URL
    const updateSearchParam = (newScope: string, newPeriod: string) => {
        console.log("Nouveaux paramètres d’URL :", newScope, newPeriod);
        const newParams = new URLSearchParams(searchParams.toString());
        newParams.set("type", newScope);
        newParams.set("period", newPeriod);

        console.log("Nouveaux paramètres d’URL :", newParams.toString());
        router.push(`/classement?${newParams.toString()}`);

        if (key === "type") {
        }
    };

    return (
        <div className="max-w-5xl mx-auto w-full p-6 space-y-6">
            <Card color="primary" title="Classement">
                <LeaderboardFilters
                    initialScope={type}
                    initialPeriod={period}
                    category={category}
                    gameId={gameId}
                    onChange={(key, value) => updateSearchParam(key, value)}
                />

                <LeaderboardUserList
                    entries={entries}
                    loading={loading}
                    offset={offset}
                    userId={userId}
                />

                <LeaderboardPagination
                    offset={offset}
                    limit={10}
                    totalPages={10}
                    totalPlayers={2540}
                    onChange={(newOffset) =>
                        updateSearchParam("offset", String(newOffset))
                    }
                />
            </Card>
        </div>
    );
}
