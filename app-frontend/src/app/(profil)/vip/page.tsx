"use client";

import { Metadata } from "next";
import { Crown, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import Card from "@/components/ui/card";
import { useState } from "react";
import { toast } from "sonner";
import { fetchClientWithAuth } from "@/lib/fetchClientWithAuth";

// export const metadata: Metadata = {
//     title: "Deviens VIP",
// };

// ⬇️ Associe chaque plan à son priceId Stripe
const PRICE_IDS: Record<"monthly" | "yearly", string> = {
    monthly: "price_1RXUSiCmEo8NdUUqITGwwvid",
    yearly: "price_1RXURQCmEo8NdUUqU1Swho9p",
};

type ApiVipResponse = {
    url: string;
}

export default function VipPage() {
    const [loading, setLoading] = useState<"monthly" | "yearly" | null>(null);

    const createVipSession = async (plan: "monthly" | "yearly") => {
        setLoading(plan);
        try {
            const res = await fetchClientWithAuth<ApiVipResponse>("/api/vip/create", {
                method: "POST",
                body: JSON.stringify({
                    plan,
                    priceId: PRICE_IDS[plan],
                }),
            });

            console.log(res);

            console.log("Response from VIP session creation:", res);

            if (!res.data) {
                toast.error("Erreur lors de la création de la session.");
                return;
            }

            window.location.href = res.data.url;
        } catch (e) {
            toast.error("Une erreur est survenue.");
        } finally {
            setLoading(null);
        }
    };

    return (
        <div className="max-w-4xl mx-auto px-4 py-10 w-full">
            <Card title="" color="yellow" className="w-full">
                <div className="text-center mb-10">
                    <h1 className="text-3xl font-bold flex items-center justify-center gap-2 mt-4">
                        <Crown className="text-primary size-6" />
                        Deviens VIP
                    </h1>
                    <p className="text-muted-foreground mt-2 text-sm">
                        Accède à encore plus de contenu chaque jour et soutiens le projet
                    </p>
                </div>

                <ul className="grid md:grid-cols-2 gap-4 text-sm text-muted-foreground mb-10 px-4 md:px-16">
                    {[
                        "Débloque des cosmétiques exclusifs",
                        "Joue aux jeux des jours précédents",
                        "Un essai supplémentaire pour les jeux",
                        "Soutiens le développement du projet",
                    ].map((b, i) => (
                        <li key={i} className="flex gap-2 items-start">
                            <span className="text-primary text-center">✔️</span> {b}
                        </li>
                    ))}
                </ul>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <div className="border rounded-lg p-6 flex flex-col items-center">
                        <h2 className="text-lg font-semibold mb-1">Abonnement Mensuel</h2>
                        <p className="text-2xl font-black mb-4">1.99€ / mois</p>
                        <Button
                            onClick={() => createVipSession("monthly")}
                            disabled={loading === "monthly"}
                        >
                            {loading === "monthly" ? (
                                <>
                                    <Loader2 className="animate-spin mr-2 size-4" /> Redirection...
                                </>
                            ) : (
                                "Souscrire"
                            )}
                        </Button>
                    </div>

                    <div className="border rounded-lg p-6 flex flex-col items-center">
                        <h2 className="text-lg font-semibold mb-1">Abonnement Annuel</h2>
                        <p className="text-2xl font-black mb-4">19.99€ / an</p>
                        <Button
                            variant="secondary"
                            onClick={() => createVipSession("yearly")}
                            disabled={loading === "yearly"}
                        >
                            {loading === "yearly" ? (
                                <>
                                    <Loader2 className="animate-spin mr-2 size-4" /> Redirection...
                                </>
                            ) : (
                                "Souscrire"
                            )}
                        </Button>
                    </div>
                </div>
            </Card>
        </div>
    );
}
