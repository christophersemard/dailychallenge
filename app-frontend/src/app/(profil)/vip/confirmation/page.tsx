import { Metadata } from "next";
import { Crown } from "lucide-react";
import Card from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Abonnement confirmé",
};

export default function VipConfirmationPage() {
    return (
        <div className="max-w-lg mx-auto px-4 py-10 w-full">
            <Card title="" color="yellow" className="w-full text-center">
                <div className="flex justify-center mb-4">
                    <Crown className="text-yellow-500 size-10" />
                </div>
                <h1 className="text-2xl font-bold mb-2">Bienvenue parmi les VIP</h1>
                <p className="text-muted-foreground mb-6 text-sm">
                    Ton abonnement a bien été pris en compte.
                </p>

                <Link href="/">
                    <Button>Retour à l’accueil</Button>
                </Link>
            </Card>
        </div>
    );
}
