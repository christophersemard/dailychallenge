"use client";

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { fetchClientWithAuth } from "@/lib/fetchClientWithAuth";

type Props = {
    gamePath: string;
    initialStatus: "available" | "coming_soon" | "unavailable";
};

export default function GameStatusCell({ gamePath, initialStatus }: Props) {
    const handleChange = async (newStatus: string) => {
        const res = await fetchClientWithAuth(`/api/admin/game-${gamePath}/status`, {
            method: "PATCH",
            body: JSON.stringify({ status: newStatus }),
        });

        if (res.error) {
            console.error("Erreur mise à jour du statut :", res.error);
            toast.error("Erreur lors de la mise à jour du statut.");
        } else {
            toast.success("Statut mis à jour !");
        }
    };

    return (
        <Select defaultValue={initialStatus} onValueChange={handleChange}>
            <SelectTrigger className="w-32">
                <SelectValue placeholder="Statut" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="available">Disponible</SelectItem>
                <SelectItem value="coming_soon">Bientôt</SelectItem>
                <SelectItem value="unavailable">Indisponible</SelectItem>
            </SelectContent>
        </Select>
    );
}
