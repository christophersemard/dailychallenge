// app/(protected)/mon-profil/page.tsx

import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { redirect } from "next/navigation";
import { fetchServerWithAuth } from "@/lib/fetchServerWithAuth";
import MyProfile from "@/components/profile/MyProfile";
import { UserMe } from "@/types/user.types";
import { useGameEventStore } from "@/lib/store/useGameEventStore";

export default async function MonProfilPage() {
    const session = await getServerSession(authOptions);

    if (!session) redirect("/connexion");

    const { data: user, error } = await fetchServerWithAuth<UserMe>(
        "/api/users/me"
    );
    console.log("Profil utilisateur :", user);

    if (!user) {
        console.error("Erreur récupération du profil utilisateur :", error);
        redirect("/connexion");
    }

    return (
        <div className="p-4 sm:p-8">
            <MyProfile user={user} />
        </div>
    );
}
