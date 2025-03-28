import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";

// ----------------------
// Server-side fetch
// ----------------------
export async function fetchServerWithAuth<T>(
    input: string,
    init: RequestInit = {}
): Promise<T> {
    // Récupérer la session actuelle
    const session = await getServerSession(authOptions);

    // Vérifier que le token existe dans la session
    const token = session?.accessToken;

    if (!token) {
        throw new Error("No token found");
    }

    // Construire les headers avec le token d'authentification
    const headers: Record<string, string> = {
        ...(init.headers as Record<string, string>), // Fusionner les headers existants
        Authorization: `Bearer ${token}`, // Ajouter l'Authorization avec le token
    };

    // Ajouter le type de contenu si nécessaire
    if (init.body && !headers["Content-Type"]) {
        headers["Content-Type"] = "application/json";
    }

    // Faire la requête API
    const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000"}${input}`,
        {
            ...init,
            headers, // Inclure les headers construits
            cache: "no-store", // Peut être configuré comme nécessaire
        }
    );

    if (!res.ok) {
        const error = await res.text();
        console.error("API ERROR:", error);
        throw new Error(`Erreur lors du fetch de ${input}`);
    }

    // Retourner la réponse JSON
    const result: T = await res.json();
    return result;
}
