"use client";

import { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { fetchClientWithAuth } from "@/lib/fetchClientWithAuth";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Card from "@/components/ui/card";
import FloatingBackgroundShapes from "@/components/layout/FloatingBackgroundShapes";

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState("");
    const [sent, setSent] = useState(false);
    const [loading, setLoading] = useState(false);
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        if (status === "authenticated") {
            router.push("/");
        }
    }, [status]);

    const handleRequest = async () => {
        if (!email) {
            toast.error("Veuillez entrer votre email.");
            return;
        }

        setLoading(true);
        await fetchClientWithAuth("/api/auth/reset-password/request", {
            method: "POST",
            body: JSON.stringify({ email }),
        });
        setLoading(false);
        setSent(true);
    };

    return (
        <div className="flex-1 flex items-center justify-center">
            <FloatingBackgroundShapes variant="yellow" />

            <Card color="primary" title="Mot de passe oublié ?" className="max-w-xl w-full">
                <div className="space-y-6">
                    <p className="text-sm text-muted-foreground text-center">
                        Renseigne ton adresse email. Si un compte existe, tu
                        recevras un lien de réinitialisation.
                    </p>

                    {sent ? (
                        <div className="text-xl text-center text-green-600 font-bold ">
                            Un email de réinitialisation a été envoyé si ce compte existe.
                        </div>
                    ) : (
                        <>
                            <Input
                                type="email"
                                placeholder="Ton adresse email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <Button
                                onClick={handleRequest}
                                disabled={loading}
                                className="w-full"
                            >
                                Envoyer le lien de réinitialisation
                            </Button>
                        </>
                    )}
                </div>
            </Card>
        </div>
    );
}
