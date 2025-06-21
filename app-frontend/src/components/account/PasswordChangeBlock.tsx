"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { fetchClientWithAuth } from "@/lib/fetchClientWithAuth";
import { toast } from "sonner";

export default function PasswordChangeBlock() {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);

    const handleChange = async () => {
        if (!currentPassword || !newPassword || !confirmPassword) {
            toast.error("Tous les champs sont obligatoires.");
            return;
        }

        if (newPassword.length < 8) {
            toast.error("Le mot de passe doit contenir au moins 8 caractères.");
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error("Les mots de passe ne correspondent pas.");
            return;
        }

        setLoading(true);
        const { error } = await fetchClientWithAuth("/api/auth/password", {
            method: "PATCH",
            body: JSON.stringify({
                currentPassword,
                newPassword,
                confirmPassword,
            }),
        });
        setLoading(false);

        if (error) {
            toast.error(error.message || "Erreur lors du changement de mot de passe.");
            return;
        }

        toast.success("Mot de passe mis à jour !");
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
    };

    return (
        <div className="space-y-4">
            <Input
                type="password"
                placeholder="Mot de passe actuel"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <Input
                type="password"
                placeholder="Nouveau mot de passe"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            />
            <Input
                type="password"
                placeholder="Confirmation"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <div className="flex justify-end">
                <Button onClick={handleChange} disabled={loading}>
                    Modifier mon mot de passe
                </Button>
            </div>
        </div>
    );
}
