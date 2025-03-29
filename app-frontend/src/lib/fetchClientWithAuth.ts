"use client";

// SEULEMENT UTILE POUR NGROK

import { fetchServerAction } from "@/app/actions/fetch-proxy";

export { fetchServerAction as fetchClientWithAuth };

// UTILISATION NORMALE

// import { getSession } from "next-auth/react";

// const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export type ErrorApi = {
    statusCode: number;
    error: string;
    message: string;
};

// // ----------------------
// // Client-side fetch with Auth and error handling
// // ----------------------
// type FetchResponse<T> =
//     | { data: T; error: null }
//     | { data: null; error: ErrorApi };

// export async function fetchClientWithAuth<T>(
//     input: string,
//     init: RequestInit = {}
// ): Promise<FetchResponse<T>> {
//     const session = await getSession();
//     const token = session?.accessToken;
// if (!token && input !== "/auth/login" && input !== "/auth/register") {
//         return {
//             data: null,
//             error: {
//                 statusCode: 401,
//                 error: "Unauthorized",
//                 message: "No token found. Please log in.",
//             },
//         };
//     }

//     const headers: Record<string, string> = {
//         ...(init.headers as Record<string, string>),
//         Authorization: `Bearer ${token}`,
//     };

//     if (init.body && !headers["Content-Type"]) {
//         headers["Content-Type"] = "application/json";
//     }

//     try {
//         const res = await fetch(API_URL + input, {
//             ...init,
//             headers,
//         });

//         if (!res.ok) {
//             const errorMessage = await res.text();
//             let error: ErrorApi;
//             try {
//                 error = JSON.parse(errorMessage);
//             } catch {
//                 error = {
//                     statusCode: res.status,
//                     error: "Unknown error",
//                     message: errorMessage,
//                 };
//             }
//             return { data: null, error };
//         }

//         const result: T = await res.json();
//         return { data: result, error: null };
//     } catch (err) {
//         return {
//             data: null,
//             error: {
//                 statusCode: 500,
//                 error: "Fetch Error",
//                 message: err instanceof Error ? err.message : "Unknown error",
//             },
//         };
//     }
// }
