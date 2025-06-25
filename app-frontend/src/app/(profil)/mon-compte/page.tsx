"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { fetchClientWithAuth } from "@/lib/fetchClientWithAuth";
import { toast } from "sonner";
import Card from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { UserMe } from "@/types/user.types";
import PasswordChangeBlock from "@/components/account/PasswordChangeBlock";
import EmailChangeModal from "@/components/account/EmailChangeModal";
import AccountDeleteModal from "@/components/account/AccountDeleteModal";
import { useGameEventStore } from "@/lib/store/useGameEventStore";
import VipManagementBlock from "@/components/account/VipManagementBlock";

export default function MonComptePage() {
    const { data: session, status } = useSession();
    const router = useRouter();

    const [user, setUser] = useState<UserMe | null>(null);
    const [pseudo, setPseudo] = useState("");
    const [loading, setLoading] = useState(false);

    // Chargement des données utilisateur
    useEffect(() => {
        if (status === "unauthenticated") {
            router.push("/connexion");
        } else if (status === "authenticated") {
            fetchClientWithAuth<UserMe>("/api/users/me").then(
                ({ data, error }) => {
                    if (error || !data) {
                        toast.error("Impossible de récupérer ton profil.");
                        return;
                    }
                    // console.log("Données utilisateur récupérées :", data);
                    setUser(data);
                    setPseudo(data.pseudo);
                }
            );
        }
    }, [status]);

    if (!user) return <div className="mt-20" />;

    const handlePseudoChange = async () => {
        if (pseudo.trim().length < 3) {
            toast.error("Ton pseudo doit contenir au moins 3 caractères.");
            return;
        }

        setLoading(true);
        const { data, error } = await fetchClientWithAuth("/api/users/pseudo", {
            method: "PATCH",
            body: JSON.stringify({ pseudo }),
        });
        setLoading(false);

        if (error) {
            toast.error(
                error.message || "Erreur lors de la mise à jour du pseudo."
            );
            return;
        }

        toast.success("Ton pseudo a bien été mis à jour !");
        setUser((prev) => (prev ? { ...prev, pseudo } : prev));
        useGameEventStore.getState().notifyGameCompleted();
    };

    return (
        <div className="p-4 sm:p-8 max-w-6xl mx-auto w-full">
            <div className="grid grid-cols-1 md:grid-cols-[1fr_1fr] gap-8">
                {/* COLONNE PRINCIPALE */}
                <div className="space-y-6 flex flex-col gap-6">
                    {/* Bloc Modifier Profil */}
                    <Card title="Pseudo" color="primary" className="space-y-4">
                        <div>
                            <label className="text-sm font-medium block mb-1">
                                Pseudo
                            </label>
                            <Input
                                value={pseudo}
                                onChange={(e) => setPseudo(e.target.value)}
                            />
                        </div>
                        <div className="flex justify-end">
                            <Button
                                onClick={handlePseudoChange}
                                disabled={loading}
                            >
                                Modifier mon pseudo
                            </Button>
                        </div>
                    </Card>

                    {/* Bloc Mot de passe */}
                    <Card
                        title="Mot de passe"
                        color="primary"
                        className="space-y-4"
                    >
                        <PasswordChangeBlock />
                    </Card>
                </div>

                {/* COLONNE SECONDAIRE */}
                <div className="space-y-6 flex flex-col gap-6">
                    {/* Bloc Email */}
                    <Card
                        title="Adresse email"
                        color="primary"
                        className="space-y-2"
                    >
                        <p className="text-sm text-muted-foreground mb-2">
                            Tu peux modifier ton adresse email de connexion.
                        </p>
                        <div className="flex items-center gap-2">
                            <Input
                                value={user.email}
                                disabled
                                className="flex-1"
                            />
                            <EmailChangeModal />
                        </div>
                    </Card>
                    {/* Bloc Historique VIP */}
                    <VipManagementBlock
                        status={user.vip.status}
                        until={user.vip.until}
                        renewing={user.vip.renewing}
                        plan={user.vip.plan}
                        history={user.vipHistory}
                    />

                    {/* Bloc Suppression compte */}
                    <Card title="" color="danger" className="space-y-2">
                        <AccountDeleteModal />
                    </Card>
                </div>
            </div>
        </div>
    );
}
