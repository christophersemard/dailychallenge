"use client";

import { useState } from "react";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { fetchClientWithAuth } from "@/lib/fetchClientWithAuth";
import { toast } from "sonner";
import { redirect } from "next/navigation"

export default function EmailChangeModal() {
    const [open, setOpen] = useState(false);
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!email || !password) {
            toast.error("Tous les champs sont obligatoires.");
            return;
        }

        setLoading(true);
        const { error } = await fetchClientWithAuth("/api/auth/email", {
            method: "PATCH",
            body: JSON.stringify({ currentPassword: password, newEmail: email }),
        });
        setLoading(false);

        if (error) {
            toast.error(error.message || "Erreur lors de la mise à jour de l’email.");
            return;
        }

        toast.success("Email mis à jour !");
        setEmail("");
        setPassword("");
        setOpen(false);     // ✅ fermeture
        redirect("/mon-profil"); // ✅ redirection vers la page de profil
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                <Button variant="secondary">Modifier</Button>
            </DialogTrigger>
            <DialogContent>
                <h2 className="text-lg font-bold mb-4">Modifier mon email</h2>
                <div className="space-y-3">
                    <Input
                        type="password"
                        placeholder="Mot de passe actuel"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Input
                        type="email"
                        placeholder="Nouvel email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <Button onClick={handleSubmit} className="w-full" disabled={loading}>
                        Valider le changement
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
