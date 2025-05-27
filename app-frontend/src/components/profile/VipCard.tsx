"use client";

import Card from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Crown, Lock, Repeat, X } from "lucide-react";

type Props = {
    status: "active" | "inactive";
    renewing: boolean;
    until: string | null;
};

export default function VipCard({ status, renewing, until }: Props) {
    const untilDate = until
        ? new Date(until).toLocaleDateString("fr-FR", {
              day: "numeric",
              month: "long",
              year: "numeric",
          })
        : null;

    return (
        <Card
            title="Abonnement VIP"
            color="yellow"
            className="w-full flex flex-col items-start gap-4"
        >
            {status === "active" ? (
                <>
                    <div className="flex flex-col gap-2 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                            <Crown className="size-5 text-yellow-500" />
                            <span>
                                Tu es{" "}
                                <strong className="text-foreground">VIP</strong>{" "}
                                jusqu’au{" "}
                                <span className="font-bold">{untilDate}</span>
                            </span>
                        </div>
                        {renewing ? (
                            <div className="flex items-center gap-2">
                                <Repeat className="size-4 text-green-600" />
                                <span>Renouvellement automatique activé</span>
                            </div>
                        ) : (
                            <div className="flex items-center gap-2 text-red-600">
                                <X className="size-4" />
                                <span>Renouvellement désactivé</span>
                            </div>
                        )}
                    </div>

                    <div className="flex gap-2">
                        {renewing ? (
                            <Button variant="danger">Résilier</Button>
                        ) : (
                            <Button variant="secondary">Réactiver</Button>
                        )}
                    </div>
                </>
            ) : (
                <>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Lock className="size-5 text-gray-500" />
                        <span>
                            Tu n’as pas encore souscrit à l’abonnement{" "}
                            <strong className="text-foreground">VIP</strong>.
                        </span>
                    </div>
                    <Button variant="secondary">Souscrire</Button>
                </>
            )}
        </Card>
    );
}
