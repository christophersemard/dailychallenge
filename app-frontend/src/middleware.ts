import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

const PUBLIC_ROUTES = ["/", "/connexion", "/inscription", "/api"];
const USER_ROUTES = ["/profil", "/jeu", "/amis"];
const ADMIN_ROUTES = ["/admin", "/dashboard"];

export async function middleware(req: NextRequest) {
    const { pathname } = req.nextUrl;

    console.log("Middleware", pathname);

    if (
        PUBLIC_ROUTES.some(
            (r) => r === pathname || pathname.startsWith(r + "/")
        )
    ) {
        console.log("Public route", pathname);
        return NextResponse.next();
    }

    const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });

    console.log("Token", token);

    if (!token) {
        const loginUrl = new URL("/connexion", req.url);
        loginUrl.searchParams.set("callbackUrl", pathname);
        return NextResponse.redirect(loginUrl);
    }

    if (ADMIN_ROUTES.some((r) => pathname.startsWith(r))) {
        if (token.role !== "admin") {
            return NextResponse.redirect(new URL("/", req.url));
        }
    }

    if (USER_ROUTES.some((r) => pathname.startsWith(r))) {
        if (token.role !== "user" && token.role !== "admin") {
            return NextResponse.redirect(new URL("/", req.url));
        }
    }

    return NextResponse.next();
}
export const config = {
    matcher: [
        "/profil",
        "/amis",
        "/jeu/:path*",
        "/admin/:path*",
        "/dashboard/:path*",
    ],
};
