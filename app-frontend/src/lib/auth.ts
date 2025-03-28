import { type AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

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

        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
        });

        const data = await res.json();

        if (!res.ok || !data?.token || !data?.user) {
          console.error("Erreur d'authentification :", data);
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
        token.id = user.id
        token.email = user.email ?? ""
        token.name = user.name ?? ""
        token.role = user.role
        token.accessToken = user.accessToken
      }
      return token
    },
  
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id
        session.user.email = token.email
        session.user.name = token.name
        session.user.role = token.role
        session.accessToken = token.accessToken
      }
      return session
    }
  },
  

  secret: process.env.NEXTAUTH_SECRET,
};
