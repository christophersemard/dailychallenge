"use client";

import { useState } from "react";
import Card from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { fetchClientWithAuth } from "@/lib/fetchClientWithAuth";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Crown, Repeat, X } from "lucide-react";

type VipStatus = "active" | "inactive";
type VipPlan = "monthly" | "yearly" | "manual" | null;
type VipHistoryItem = {
    startDate: string;
    endDate: string | null;
    status: VipStatus | "cancelled" | "expired";
    plan: VipPlan;
};

type Props = {
    status: VipStatus;
    until: string | null;
    renewing: boolean;
    plan: VipPlan;
    history: VipHistoryItem[];
};

const statusLabel: Record<VipStatus | "cancelled" | "expired", string> = {
    active: "Actif",
    inactive: "Inactif",
    cancelled: "Annulé",
    expired: "Expiré",
};

const statusColor: Record<VipStatus | "cancelled" | "expired", string> = {
    active: "bg-green-200 text-green-900",
    inactive: "bg-muted text-muted-foreground",
    cancelled: "bg-orange-200 text-orange-900",
    expired: "bg-gray-100 text-gray-500",
};

const planLabel: Record<Exclude<VipPlan, null> | "null", string> = {
    monthly: "Mensuel",
    yearly: "Annuel",
    manual: "Manuel",
    null: "—",
};


export default function VipManagementBlock({
    status,
    until,
    renewing,
    plan,
    history,
}: Props) {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const untilFormatted = until
        ? new Date(until).toLocaleDateString("fr-FR", {
            day: "numeric",
            month: "long",
            year: "numeric",
        })
        : null;

    const handleCancel = async () => {
        try {
            setLoading(true);
            await fetchClientWithAuth("/api/vip/cancel", { method: "POST" });
            toast.success("Abonnement résilié avec succès !");
            router.refresh();
        } catch {
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
        } catch {
            toast.error("Erreur lors de la réactivation.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <Card title="VIP" color="secondary" className="space-y-6">

            <div className="flex flex-nowrap justify-between items-center gap-2">
                <div className="text-sm space-y-2">
                    {status === "active" ? (
                        <>
                            <div className="flex items-center gap-2">
                                <Crown className="text-yellow-500 size-5" />
                                <span>
                                    Tu es <strong className="text-foreground">VIP</strong> jusqu’au{" "}
                                    <strong>{untilFormatted}</strong>{" "}
                                    {plan === "manual" && (
                                        <span className="italic text-xs text-muted-foreground">
                                            (ajouté manuellement)
                                        </span>
                                    )}
                                </span>
                            </div>

                            {plan !== "manual" &&
                                (renewing ? (
                                    <div className="flex items-center gap-2 text-green-600">
                                        <Repeat className="size-4" />
                                        <span>Renouvellement automatique activé</span>
                                    </div>
                                ) : (
                                    <div className="flex items-center gap-2 text-red-600">
                                        <X className="size-4" />
                                        <span>Renouvellement désactivé</span>
                                    </div>
                                ))}
                        </>
                    ) : (
                        <div className="text-muted-foreground">Tu n’as actuellement aucun abonnement VIP actif.</div>
                    )}
                </div>

                {plan !== "manual" && status === "active" && (
                    <div className="flex gap-2">
                        {renewing ? (
                            <Button variant="danger" size="sm" onClick={handleCancel} disabled={loading}>
                                Résilier
                            </Button>
                        ) : (
                            <Button onClick={handleReactivate} size="sm" disabled={loading}>
                                Réactiver
                            </Button>
                        )}
                    </div>
                )}
            </div>

            <hr></hr>

            <div className="">
                <h3 className="text-sm font-semibold text-foreground mb-2">Historique des abonnements</h3>
                {history.length === 0 ? (
                    <p className="text-sm text-muted-foreground">Aucun abonnement VIP passé.</p>
                ) : (
                    <table className="w-full text-sm">
                        <thead>
                            <tr className="text-muted-foreground text-left">
                                <th className="py-1">Début</th>
                                <th className="py-1">Fin</th>
                                <th className="py-1">Plan</th>
                                <th className="py-1">Statut</th>
                            </tr>
                        </thead>
                        <tbody>
                            {history.map((sub, i) => (
                                <tr key={i} className="border-t last:border-b">
                                    <td className="py-1 pe-2">
                                        {new Date(sub.startDate).toLocaleDateString("fr-FR")}
                                    </td>
                                    <td className="py-1 pe-2">
                                        {sub.endDate
                                            ? new Date(sub.endDate).toLocaleDateString("fr-FR")
                                            : "—"}
                                    </td><td className="py-1 pe-2">{planLabel[sub.plan ?? "null"]}</td>

                                    <td className="py-1 pe-2">
                                        <Badge className={statusColor[sub.status]}>
                                            {statusLabel[sub.status]}
                                        </Badge>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </Card>
    );
}
