"use client";

import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchClientWithAuth } from "@/lib/fetchClientWithAuth";
import { toast } from "sonner";
import { signOut } from "next-auth/react";

export default function AccountDeleteModal() {
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleDelete = async () => {
        if (!password) {
            toast.error("Mot de passe requis.");
            return;
        }

        setLoading(true);
        const { error } = await fetchClientWithAuth("/api/auth/delete", {
            method: "PATCH",
            body: JSON.stringify({ currentPassword: password }),
        });
        setLoading(false);

        if (error) {
            toast.error(error.message || "Erreur lors de la suppression.");
            return;
        }

        toast.success("Ton compte a été supprimé.");
        await signOut({ callbackUrl: "/" });
    };

    return (
        <Dialog>
            <DialogTrigger asChild>
                <Button variant="danger" className="mt-2">
                    Supprimer mon compte
                </Button>
            </DialogTrigger>
            <DialogContent>
                <h2 className="text-lg font-bold text-danger mb-2">
                    Supprimer mon compte
                </h2>
                <p className="text-sm text-muted-foreground mb-4">
                    Cette action supprimera définitivement ton compte. Merci de
                    confirmer avec ton mot de passe :
                </p>
                <Input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <Button variant="danger" className="w-full mt-2" onClick={handleDelete} disabled={loading}>
                    Supprimer définitivement
                </Button>
            </DialogContent>
        </Dialog>
    );
}
