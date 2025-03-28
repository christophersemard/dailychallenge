import NextAuth from "next-auth";
import { DefaultSession, DefaultUser } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
    interface Session {
        user: {
            id: string;
            role: "admin" | "user";
        } & DefaultSession["user"];
        accessToken: string;
    }

    interface User extends DefaultUser {
        id: string;
        role: "admin" | "user";
        accessToken: string;
    }
}

declare module "next-auth/jwt" {
    interface JWT {
        id: string;
        email: string;
        name: string;
        role: "admin" | "user";
        accessToken: string;
    }
}
