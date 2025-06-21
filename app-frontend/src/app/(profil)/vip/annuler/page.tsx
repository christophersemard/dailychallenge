import { Metadata } from "next";
import { XCircle } from "lucide-react";
import Card from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Abonnement annulé",
};

export default function VipCancelPage() {
    return (
        <div className="max-w-lg mx-auto px-4 py-10 w-full">
            <Card title="" color="red" className="w-full text-center">
                <div className="flex justify-center mb-4">
                    <XCircle className="text-red-500 size-10" />
                </div>
                <h1 className="text-2xl font-bold mb-2">Annulation de l'abonnement</h1>
                <p className="text-muted-foreground mb-6 text-sm">
                    Tu peux souscrire à tout moment pour débloquer les avantages VIP.
                </p>

                <Link href="/vip">
                    <Button variant="secondary">Retour aux offres</Button>
                </Link>
            </Card>
        </div>
    );
}
