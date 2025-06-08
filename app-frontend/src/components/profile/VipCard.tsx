"use client";

import { useState } from "react";
import Card from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { fetchClientWithAuth } from "@/lib/fetchClientWithAuth";
import { Crown, Lock, Repeat, X } from "lucide-react";

type Props = {
    status: "active" | "inactive";
    renewing: boolean;
    until: string | null;
    plan: "monthly" | "yearly" | "manual" | null;
};

export default function VipCard({ status, renewing, until, plan }: Props) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const untilDate = until
        ? new Date(until).toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "long",
            year: "numeric",
        })
        : null;

    const handleSubscribe = () => {
        router.push("/vip");
    };

    const handleCancel = async () => {
        try {
            setLoading(true);
            await fetchClientWithAuth("/api/vip/cancel", { method: "POST" });
            toast.success("Abonnement résilié avec succès !");
            router.refresh();
        } catch (e) {
            toast.error("Erreur lors de la résiliation.");
        } finally {
            setLoading(false);
        }
    };

    const handleReactivate = async () => {
        try {
            setLoading(true);
            await fetchClientWithAuth("/api/vip/reactivate", { method: "POST" });
            toast.success("Renouvellement réactivé !");
            router.refresh();
        } catch (e) {
            toast.error("Erreur lors de la réactivation.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card
            title="Abonnement VIP"
            color="secondary"
            className="w-full flex flex-col items-start gap-4"
        >
            {status === "active" ? (
                <>

                    <div className="flex justify-between items-center gap-2 w-full">
                        <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                            <div className="flex items-center gap-2">
                                <Crown className="size-5 text-yellow-500" />
                                <span>
                                    Tu es{" "}
                                    <strong className="text-foreground">VIP</strong>{" "}
                                    jusqu’au{" "}
                                    <span className="font-bold">{untilDate}</span>{" "}
                                    {plan === "manual" && (
                                        <span className="italic text-xs text-muted-foreground">
                                            (ajouté manuellement)
                                        </span>
                                    )}
                                </span>
                            </div>

                            {plan !== "manual" &&
                                (renewing ? (
                                    <div className="flex items-center gap-2">
                                        <Repeat className="size-4 text-green-600" />
                                        <span>Renouvellement automatique activé</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2 text-red-600">
                                        <X className="size-4" />
                                        <span>Renouvellement désactivé</span>
                                    </div>
                                ))}
                        </div>

                        {plan !== "manual" && (
                            <div className="flex gap-2">
                                {renewing ? (
                                    <Button
                                        size={"sm"}
                                        variant="danger"
                                        onClick={handleCancel}
                                        disabled={loading}
                                    >
                                        Résilier
                                    </Button>
                                ) : (
                                    <Button
                                        variant={"success"}
                                        size={"sm"} onClick={handleReactivate} disabled={loading}>
                                        Réactiver
                                    </Button>
                                )}
                            </div>
                        )}</div>
                </>
            ) : (
                <>
                    <div className="flex flex-col items-center gap-2 text-sm text-muted-foreground">
                        <div className="text-center mb-4">
                            <h1 className="text-3xl font-bold flex items-center justify-center gap-2 mt-4">
                                <Crown className="text-primary size-6" />
                                Deviens VIP
                            </h1>
                            <p className="text-muted-foreground mt-2 text-sm">
                                Accède à encore plus de contenu chaque jour et soutiens le projet
                            </p>
                        </div>

                        <ul className="grid gap-4 text-sm text-muted-foreground mb-10">
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
                    </div>
                    <Button variant={"secondary"} size={"lg"} className="w-full" onClick={handleSubscribe}>
                        Voir les offres
                    </Button>
                </>
            )}
        </Card>
    );
}
