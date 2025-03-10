"use client";

import { signOut, useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";

export default function Protected() {
    const { data: session } = useSession();

    if (!session) {
        return <p>Accès refusé. Veuillez vous connecter.</p>;
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen">
            <h1 className="text-2xl font-bold">Page protégée</h1>
            <p>Bienvenue, {session.user?.name}!</p>
            <Button onClick={() => signOut()}>Se déconnecter</Button>
        </div>
    );
}
