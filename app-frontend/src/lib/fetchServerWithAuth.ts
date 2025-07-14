import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

export type ErrorApi = {
    statusCode: number;
    error: string;
    message: string;
};

type FetchResponse<T> =
    | { data: T; error: null }
    | { data: null; error: ErrorApi };

export async function fetchServerWithAuth<T>(
    input: string,
    init: RequestInit = {}
): Promise<FetchResponse<T>> {
    const session = await getServerSession(authOptions);
    const token = session?.accessToken;

    console.log("Token dans fetchServerWithAuth :", token);

    if (!token) {
        return {
            data: null,
            error: {
                statusCode: 401,
                error: "Unauthorized",
                message: "Aucun token trouvé dans la session.",
            },
        };
    }

    const headers: Record<string, string> = {
        ...(init.headers as Record<string, string>),
        Authorization: `Bearer ${token}`,
    };

    if (init.body && !headers["Content-Type"]) {
        headers["Content-Type"] = "application/json";
    }

    try {
        const IS_DOCKER = process.env.IS_DOCKER === "true";
        console.log("IS_DOCKER :", IS_DOCKER);
        const API_URL = IS_DOCKER
            ? process.env.NEXT_PUBLIC_API_URL || "https://api.dailychallenge.fr"
            : "http://localhost:3000";
        console.log("API URL DANS FETCH SERVER :", API_URL);
        const res = await fetch(`${API_URL}${input}`, {
            ...init,
            headers,
            cache: "no-store",
        });

        if (!res.ok) {
            const text = await res.text();
            let error: ErrorApi;
            try {
                error = JSON.parse(text);
            } catch {
                error = {
                    statusCode: res.status,
                    error: "Unknown error",
                    message: text,
                };
            }
            return { data: null, error };
        }

        const result: T = await res.json();

        // console.log("Résultat de la requête :", result);

        return { data: result, error: null };
    } catch (err) {
        console.error("Erreur lors de la requête :", err);
        return {
            data: null,
            error: {
                statusCode: 500,
                error: "Fetch Error",
                message: err instanceof Error ? err.message : "Unknown error",
            },
        };
    }
}
