"use client";

import Card from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";

export default function MonComptePage() {
    const [pseudo, setPseudo] = useState("Robert76140");

    return (
        <div className="p-4 sm:p-8 max-w-6xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Mon compte</h1>

            <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-6">
                {/* COLONNE PRINCIPALE */}
                <div className="space-y-6">
                    {/* Bloc Modifier Profil */}
                    <Card title="Profil" color="primary" className="space-y-4">
                        <div>
                            <label className="text-sm font-medium block mb-1">
                                Pseudo
                            </label>
                            <Input
                                value={pseudo}
                                onChange={(e) => setPseudo(e.target.value)}
                            />
                        </div>
                        <Button>Enregistrer</Button>
                    </Card>

                    {/* Bloc Mot de passe */}
                    <Card
                        title="Mot de passe"
                        color="primary"
                        className="space-y-4"
                    >
                        <div>
                            <label className="text-sm font-medium block mb-1">
                                Mot de passe actuel
                            </label>
                            <Input type="password" />
                        </div>
                        <div>
                            <label className="text-sm font-medium block mb-1">
                                Nouveau mot de passe
                            </label>
                            <Input type="password" />
                        </div>
                        <div>
                            <label className="text-sm font-medium block mb-1">
                                Confirmation
                            </label>
                            <Input type="password" />
                        </div>
                        <Button>Modifier mon mot de passe</Button>
                    </Card>
                </div>

                {/* COLONNE SECONDAIRE */}
                <div className="space-y-6">
                    {/* Bloc Email */}
                    <Card
                        title="Adresse email"
                        color="primary"
                        className="space-y-2"
                    >
                        <p className="text-sm text-muted-foreground">
                            Tu peux modifier ton adresse email de connexion.
                        </p>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button>Modifier mon email</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <h2 className="text-lg font-bold mb-4">
                                    Modifier mon email
                                </h2>
                                <div className="space-y-3">
                                    <div>
                                        <label className="text-sm font-medium block mb-1">
                                            Mot de passe actuel
                                        </label>
                                        <Input type="password" />
                                    </div>
                                    <div>
                                        <label className="text-sm font-medium block mb-1">
                                            Nouvel email
                                        </label>
                                        <Input type="email" />
                                    </div>
                                    <Button className="mt-2 w-full">
                                        Valider le changement
                                    </Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </Card>

                    {/* Bloc Suppression compte */}
                    <Card
                        title="Suppression"
                        color="primary"
                        className="space-y-2"
                    >
                        <p className="text-sm text-danger">
                            Cette action est irréversible. Ton compte sera
                            supprimé.
                        </p>
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="danger">
                                    Supprimer mon compte
                                </Button>
                            </DialogTrigger>
                            <DialogContent>
                                <h2 className="text-lg font-bold mb-4 text-danger">
                                    Supprimer mon compte
                                </h2>
                                <div className="space-y-3">
                                    <p className="text-sm text-muted-foreground">
                                        Merci de confirmer avec ton mot de passe
                                        :
                                    </p>
                                    <Input type="password" />
                                    <Button
                                        variant="danger"
                                        className="mt-2 w-full"
                                    >
                                        Supprimer définitivement
                                    </Button>
                                </div>
                            </DialogContent>
                        </Dialog>
                    </Card>
                </div>
            </div>
        </div>
    );
}
