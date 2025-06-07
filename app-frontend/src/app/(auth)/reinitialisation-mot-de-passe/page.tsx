"use client";

import {
    useRouter,
    useSearchParams
} from "next/navigation";
import {
    useEffect,
    useMemo,
    useState,
    Suspense
} from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { fetchClientWithAuth } from "@/lib/fetchClientWithAuth";
import { toast } from "sonner";
import { useSession } from "next-auth/react";
import Card from "@/components/ui/card";
import FloatingBackgroundShapes from "@/components/layout/FloatingBackgroundShapes";
import { Eye, EyeOff, Check, X } from "lucide-react";
import clsx from "clsx";

function TokenHandler({ onTokenReady }: { onTokenReady: (token: string | null) => void }) {
    const searchParams = useSearchParams();

    useEffect(() => {
        const token = searchParams.get("token");
        onTokenReady(token);
    }, [searchParams]);

    return null;
}

export default function ResetPasswordPage() {
    const router = useRouter();
    const { data: session, status } = useSession();

    const [token, setToken] = useState<string | null>(null);
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (status === "authenticated") {
            router.push("/");
        }
    }, [status]);

    const handleReset = async () => {
        if (!token) {
            toast.error("Lien invalide ou expiré.");
            return;
        }

        if (!newPassword || !confirmPassword) {
            toast.error("Tous les champs sont obligatoires.");
            return;
        }

        if (newPassword !== confirmPassword) {
            toast.error("Les mots de passe ne correspondent pas.");
            return;
        }

        if (Object.values(passwordValidations).some((v) => !v)) {
            toast.error("Le mot de passe ne respecte pas les critères de sécurité.");
            return;
        }

        setLoading(true);
        const { error } = await fetchClientWithAuth("/api/auth/reset-password/confirm", {
            method: "POST",
            body: JSON.stringify({ token, newPassword, confirmPassword }),
        });
        setLoading(false);

        if (error) {
            toast.error(error.message || "Erreur lors de la réinitialisation.");
            return;
        }

        toast.success("Mot de passe mis à jour !");
        router.push("/connexion?reset=true");
    };

    const passwordValidations = useMemo(() => ({
        length: newPassword.length >= 8,
        lowercase: /[a-z]/.test(newPassword),
        uppercase: /[A-Z]/.test(newPassword),
        digit: /\d/.test(newPassword),
        special: /[^A-Za-z0-9]/.test(newPassword),
    }), [newPassword]);

    const renderRule = (label: string, isValid: boolean) => (
        <li
            key={label}
            className={clsx("text-sm flex items-center gap-2", isValid ? "text-success" : "text-danger")}
        >
            {isValid ? <Check size={16} /> : <X size={16} />}
            {label}
        </li>
    );

    if (token === null && status !== "authenticated") {
        return null;
    }

    return (
        <div className="flex-1 flex items-center justify-center">
            <FloatingBackgroundShapes variant="yellow" />

            <Suspense fallback={null}>
                <TokenHandler onTokenReady={setToken} />
            </Suspense>

            <Card color="yellow" title="Réinitialisation mot de passe">
                <div className="grid md:grid-cols-1 gap-6">
                    {!token ? (
                        <p className="text-danger text-center">
                            Lien invalide ou expiré.
                        </p>
                    ) : (
                        <div className="space-y-4">
                            <p className="text-sm text-muted-foreground">
                                Renseignez votre nouveau mot de passe.
                            </p>

                            <div>
                                <label htmlFor="newPassword" className="block font-semibold mb-1 text-sm">
                                    Mot de passe
                                </label>
                                <div className="relative">
                                    <Input
                                        id="newPassword"
                                        type={showPassword ? "text" : "password"}
                                        value={newPassword}
                                        onChange={(e) => setNewPassword(e.target.value)}
                                        disabled={loading}
                                        className="pr-10"
                                    />
                                    <Button
                                        variant="ghost-background"
                                        onClick={() => setShowPassword((prev) => !prev)}
                                        className="absolute top-1/2 right-0 transform -translate-y-1/2 text-muted-foreground hover:text-black"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </Button>
                                </div>

                                <ul className="mt-2 space-y-1 flex gap-2 flex-wrap justify-center md:justify-start">
                                    {renderRule("Au moins 8 caractères", passwordValidations.length)}
                                    {renderRule("Une minuscule", passwordValidations.lowercase)}
                                    {renderRule("Une majuscule", passwordValidations.uppercase)}
                                    {renderRule("Un chiffre", passwordValidations.digit)}
                                    {renderRule("Un caractère spécial", passwordValidations.special)}
                                </ul>
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className="block font-semibold mb-1 text-sm">
                                    Confirmation
                                </label>
                                <Input
                                    id="confirmPassword"
                                    type={showPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    disabled={loading}
                                    className="pr-10"
                                />
                            </div>

                            <div className="flex justify-end mt-4">
                                <Button
                                    onClick={handleReset}
                                    disabled={loading}
                                    className="w-full md:w-auto"
                                >
                                    {loading ? "Réinitialisation..." : "Réinitialiser mon mot de passe"}
                                </Button>
                            </div>
                        </div>
                    )}
                </div>
            </Card>
        </div>
    );
}
