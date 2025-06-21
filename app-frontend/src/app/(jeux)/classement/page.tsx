// app/classement/page.tsx
"use client";

import { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useSession } from "next-auth/react";
import { getLeaderboardData } from "@/lib/leaderboard/getLeaderboardData";
import LeaderboardFilters from "@/components/leaderboard/LeaderboardFilters";
import LeaderboardUserList from "@/components/leaderboard/LeaderboardUserList";
import LeaderboardPagination from "@/components/leaderboard/LeaderboardPagination";
import LeaderboardCategorySelector from "@/components/leaderboard/LeaderboardCategorySelector";
import Card from "@/components/ui/card";
import { LeaderboardEntry } from "@/types/game.types";

type LeaderboardParams = {
    type: "global" | "friends";
    period: "week" | "month" | "year" | "all";
    category: string;
    gameId: string | null;
    page: number;
};

function ClassementClient() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { data: session } = useSession();
    const userId = session?.user?.id;
    const limit = 3;

    const [params, setParams] = useState<LeaderboardParams | null>(null);
    const [players, setPlayers] = useState<LeaderboardEntry[]>([]);
    const [player, setPlayer] = useState<LeaderboardEntry | null>(null);
    const [numberOfPlayers, setNumberOfPlayers] = useState(0);
    const [loading, setLoading] = useState(true);
    const [title, setTitle] = useState("Classement");

    useEffect(() => {
        const type = (searchParams.get("type") || "global") as LeaderboardParams["type"];
        const period = (searchParams.get("period") || "all") as LeaderboardParams["period"];
        const category = searchParams.get("category") || "";
        const gameId = searchParams.get("gameId") || null;
        const page = Number(searchParams.get("page")) || 1;

        // Redirection initiale si vide
        if (!searchParams.get("type") && !searchParams.get("period") && !searchParams.get("page")) {
            const defaults = new URLSearchParams({ type: "global", period: "all", page: "1" });
            router.replace(`/classement?${defaults.toString()}`);
            return;
        }

        const newParams: LeaderboardParams = { type, period, category, gameId, page };
        setParams(newParams);

        setLoading(true);

        getLeaderboardData({
            ...newParams,
            offset: page === 1 ? 0 : page * limit - limit,
            limit,
        }).then(({ players, player, numberOfPlayers }) => {
            setPlayers(players);
            setPlayer(player);
            setNumberOfPlayers(numberOfPlayers);
            setLoading(false);
        });

        // Mise à jour du titre
        let newTitle = "Classement";
        if (type === "global") newTitle = "Classement global";
        if (type === "friends") newTitle = "Classement amis";
        if (period === "week") newTitle += " de la semaine en cours";
        if (period === "month") newTitle += " du mois de " + new Date().toLocaleString("default", { month: "long" });
        if (period === "year") newTitle += " de l'année " + new Date().getFullYear();
        if (period === "all") newTitle += " de tous les temps";
        setTitle(newTitle);
    }, [searchParams, router]);

    const updateSearchParam = (type: string, period: string, newPage: number) => {
        const newParams = new URLSearchParams(window.location.search);
        newParams.set("type", type);
        newParams.set("period", period);
        newParams.set("page", String(newPage));
        router.push(`/classement?${newParams.toString()}`);
    };

    if (!params) {
        return <div className="max-w-5xl mx-auto w-full p-6">Chargement...</div>;
    }

    return (
        <div className="max-w-5xl mx-auto w-full p-6 space-y-6">
            <Card color="primary" title={title}>
                <LeaderboardCategorySelector
                    initialCategory={params.category}
                    initialGame={params.gameId}
                    onChange={(cat, game) => {
                        const newParams = new URLSearchParams(window.location.search);
                        if (cat) newParams.set("category", cat);
                        else newParams.delete("category");

                        if (game) newParams.set("gameId", game);
                        else newParams.delete("gameId");

                        router.push(`/classement?${newParams.toString()}`);
                    }}
                />

                <LeaderboardFilters
                    initialScope={params.type}
                    initialPeriod={params.period}
                    onChange={(type, period) => updateSearchParam(type, period, params.page)}
                />

                <LeaderboardUserList
                    entries={players}
                    loading={loading}
                    offset={params.page * limit - limit}
                    userId={userId}
                    userEntry={player}
                />

                <LeaderboardPagination
                    initialPage={params.page}
                    limit={limit}
                    totalPlayers={numberOfPlayers}
                    totalPages={Math.ceil(numberOfPlayers / limit)}
                    onChange={(newPage) => updateSearchParam(params.type, params.period, newPage)}
                />
            </Card>
        </div>
    );
}

export default function ClassementPage() {
    return (
        <Suspense fallback={<div className="max-w-5xl mx-auto w-full p-6">Chargement classement...</div>}>
            <ClassementClient />
        </Suspense>
    );
}
