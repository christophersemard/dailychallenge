import { type AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";
import { fetchServerAction } from "@/app/actions/fetch-proxy";

interface DecodedJwt {
    exp: number;
    [key: string]: unknown;
}

export const authOptions: AuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Mot de passe", type: "password" },
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    throw new Error("Email et mot de passe requis.");
                }

              

                // const res = await fetch(
                //     `${
                //         process.env.NEXT_PUBLIC_API_URL ||
                //         "https://api.dailychallenge.fr"
                //     }/api/auth/login`,
                //     {
                //         method: "POST",
                //         headers: { "Content-Type": "application/json" },
                //         body: JSON.stringify({
                //             email: credentials.email,
                //             password: credentials.password,
                //         }),
                //     }
                // );
                const { data, error } = await fetchServerAction<{
                    token: string;
                    user: {
                        id: number;
                        email: string;
                        pseudo: string;
                        role: string;
                    };
                }>("/api/auth/login", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        email: credentials.email,
                        password: credentials.password,
                    }),
                });

                if (error) {
                    console.error("Erreur lors de la connexion :", error);
                    return null;
                }

                if (!data || !data.token || !data.user) {
                    console.error("Données de connexion invalides :", data);
                    return null;
                }

                const { token, user } = data;
                const { id, email, pseudo, role } = user;

          

                return {
                    id: id.toString(),
                    email: email as string,
                    name: pseudo as string,
                    role,
                    accessToken: token,
                };
            },
        }),
    ],

    pages: {
        signIn: "/connexion",
    },

    session: {
        strategy: "jwt",
    },

    callbacks: {
        async jwt({ token, user }) {
            if (user) {
                token.id = user.id;
                token.email = user.email ?? "";
                token.name = user.name ?? "";
                token.role = user.role;
                token.accessToken = user.accessToken;
            }

            const decoded = jwtDecode<DecodedJwt>(token.accessToken);
            token.accessTokenExp = decoded.exp * 1000; // ms
            // Ajoute cette vérif d’expiration (si présente dans le token)
            const now = Math.floor(Date.now() / 1000); // en secondes

            if (token.exp && now > Number(token.accessTokenExp)) {
                console.warn("⚠️ Token expiré, déconnexion forcée");
                // Tu peux soit ne rien renvoyer (session invalidée), soit forcer un signOut() client
                // Si dans un middleware : return null;
            }

            return token;
        },
        async session({ session, token }) {
            if (token && session.user) {
                session.user.id = token.id;
                session.user.email = token.email;
                session.user.name = token.name;
                session.user.role = token.role;
                session.accessToken = token.accessToken;
            }
            return session;
        },
    },

    secret: process.env.NEXTAUTH_SECRET,
};
