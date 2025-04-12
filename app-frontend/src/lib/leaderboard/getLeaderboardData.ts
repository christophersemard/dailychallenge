// lib/getLeaderboardData.ts
import { LeaderboardEntry } from "@/types/game.types";
import { fetchClientWithAuth } from "@/lib/fetchClientWithAuth";
import { getDateStr } from "@/lib/formatDate";

export async function getLeaderboardData({
    type,
    userId,
    category,
    gameId,
    period,
    offset = 0,
    limit = 10,
}: {
    type: "global" | "friends";
    userId?: string;
    category?: string;
    gameId?: number;
    period: "week" | "month" | "year";
    offset?: number;
    limit?: number;
}): Promise<LeaderboardEntry[]> {
    const now = new Date();
    let dateStart: Date, dateEnd: Date;

    if (period === "week") {
        const day = now.getDay() || 7;
        dateStart = new Date(now);
        dateStart.setDate(now.getDate() - day + 1);
        dateStart.setHours(0, 0, 0, 0);
        dateEnd = new Date(dateStart);
        dateEnd.setDate(dateStart.getDate() + 6);
    } else if (period === "month") {
        dateStart = new Date(now.getFullYear(), now.getMonth(), 1);
        dateEnd = new Date(now.getFullYear(), now.getMonth() + 1, 0);
    } else {
        dateStart = new Date(now.getFullYear(), 0, 1);
        dateEnd = new Date(now.getFullYear(), 11, 31);
    }

    const params = new URLSearchParams({
        limit: String(limit),
        offset: String(offset),
        dateStart: getDateStr(dateStart),
        dateEnd: getDateStr(dateEnd),
    });

    let url = "/api/leaderboard";

    if (type === "friends") {
        if (category) {
            url += `/friends/category?category=${category}`;
        } else if (gameId) {
            url += `/friends/game?gameId=${gameId}`;
        } else {
            url += "/friends";
        }
    } else {
        if (category) {
            url += `/category?category=${category}`;
        } else if (gameId) {
            url += `/game?gameId=${gameId}`;
        } else {
            url += "/global";
        }
    }

    console.log("URL du leaderboard :", url);
    console.log("Paramètres du leaderboard :", params.toString());
    console.log(`${url}&${params.toString()}`);

    const { data, error } = await fetchClientWithAuth<LeaderboardEntry[]>(
        `${url}?${params.toString()}`
    );

    if (error || !data) {
        console.error("Erreur leaderboard :", error);
        return [];
    }

    return data;
}
