"use client";

import { getSession } from "next-auth/react";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// ----------------------
// Client-side fetch with Auth and error handling
// ----------------------
export async function fetchClientWithAuth<T>(
    input: string,
    init: RequestInit = {}
): Promise<T> {
    // Récupérer la session du côté client
    const session = await getSession();

    // Si la session est absente ou si le token n'est pas trouvé, lancer une erreur
    const token = session?.accessToken;
    if (!token) {
        throw new Error("No token found. Please log in.");
    }

    // Construire les headers avec le token d'authentification
    const headers: Record<string, string> = {
        ...(init.headers as Record<string, string>),
        Authorization: `Bearer ${token}`, // Ajouter l'Authorization avec le token
    };

    // Ajouter le Content-Type si nécessaire
    if (init.body && !headers["Content-Type"]) {
        headers["Content-Type"] = "application/json";
    }

    try {
        const res = await fetch(API_URL + input, {
            ...init,
            headers,
        });

        // Vérifier si la réponse est OK
        if (!res.ok) {
            const errorMessage = await res.text();
            console.error("API ERROR:", errorMessage);
            throw new Error(`API Error: ${errorMessage}`);
        }

        // Si tout va bien, retourner la réponse JSON
        const result: T = await res.json();
        return result;
    } catch (error) {
        // Gestion des erreurs de fetch ou de traitement
        console.error("Request failed:", error);
        throw new Error(
            `Request failed: ${
                error instanceof Error ? error.message : "Unknown error"
            }`
        );
    }
}
