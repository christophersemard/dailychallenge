import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
    providers: [
        CredentialsProvider({
            name: "Credentials",
            credentials: {
                email: { label: "Email", type: "email" },
                password: { label: "Mot de passe", type: "password" },
            },
            async authorize(credentials) {
                // Simuler une connexion (à remplacer avec l'appel à un microservice plus tard)
                if (
                    credentials?.email === "test@example.com" &&
                    credentials?.password === "password"
                ) {
                    return {
                        id: "1",
                        name: "Test User",
                        email: "test@example.com",
                    };
                }
                return null;
            },
        }),
    ],
    pages: {
        signIn: "/connexion",
    },
    session: {
        strategy: "jwt",
    },
    secret: process.env.NEXTAUTH_SECRET,
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
