"use client";

import { useState, useEffect, Suspense, useRef } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, EyeOff } from "lucide-react";
import Card from "@/components/ui/card";
import Link from "next/link";
import { toast } from "sonner";
import FloatingBackgroundShapes from "@/components/layout/FloatingBackgroundShapes";
import { useSearchParams } from "next/navigation";

function SearchParamHandler() {
    const searchParams = useSearchParams();

    useEffect(() => {
        if (searchParams.get("registered") === "true") {
            toast.success(
                "Compte créé avec succès ! Connectez-vous maintenant",
                {
                    className: "toast-base toast-success",
                }
            );
        }
        if (searchParams.get("reset") === "true") {
            toast.success("Mot de passe réinitialisé avec succès !", {
                className: "toast-base toast-success",
            });
        }
    }, [searchParams]);

    return null;
}

export default function Connexion() {
    const [email, setEmail] = useState("michel@michelle.com");
    const [password, setPassword] = useState("Azerty123456*");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const router = useRouter();

    const callbackUrlRef = useRef("/");

    useEffect(() => {
        if (typeof window !== "undefined") {
            const sp = new URLSearchParams(window.location.search);
            callbackUrlRef.current = sp.get("callbackUrl") || "/";
        }
    }, []);

    const handleLogin = async () => {
        setLoading(true);
        setError("");

        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        });

        setLoading(false);

        if (result?.ok) {
            router.push(callbackUrlRef.current);
        } else {
            setError("Email ou mot de passe invalide.");
        }
    };

    return (
        <div className="flex-1 flex items-center justify-center">
            <FloatingBackgroundShapes variant="yellow" />
            <Suspense>
                <SearchParamHandler />
            </Suspense>
            <Card color="primary" title="Connexion">
                <div className="grid md:grid-cols-1 gap-6">
                    <div>
                        <div className="flex flex-col items-center md:flex-row md:justify-between gap-4 md:gap-8 mb-8 md:mb-4">
                            <h2 className="font-bold text-lg text-center md:text-start">
                                Connectez-vous pour accéder à votre compte
                            </h2>
                            <Button
                                variant="outline-background"
                                size="xs"
                                asChild
                            >
                                <Link href="/inscription">
                                    Pas encore de compte ? Inscrivez-vous
                                </Link>
                            </Button>
                        </div>

                        <div className="space-y-4">
                            <p>Renseignez vos informations de connexion</p>

                            <div>
                                <label
                                    htmlFor="email"
                                    className="block font-semibold mb-1 text-sm"
                                >
                                    Email
                                </label>
                                <Input
                                    id="email"
                                    type="email"
                                    placeholder="exemple@exemple.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    disabled={loading}
                                />
                            </div>

                            <div>
                                <label
                                    htmlFor="password"
                                    className="block font-semibold mb-1 text-sm"
                                >
                                    Mot de passe
                                </label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        placeholder="Mot de passe"
                                        value={password}
                                        onChange={(e) =>
                                            setPassword(e.target.value)
                                        }
                                        disabled={loading}
                                        className="pr-10"
                                    />
                                    <Button
                                        variant="ghost-background"
                                        onClick={() =>
                                            setShowPassword((prev) => !prev)
                                        }
                                        className="absolute top-1/2 right-0 transform -translate-y-1/2 text-muted-foreground hover:text-black cursor-pointer"
                                    >
                                        {showPassword ? (
                                            <EyeOff size={18} />
                                        ) : (
                                            <Eye size={18} />
                                        )}
                                    </Button>
                                </div><div className="text-end text-sm mt-4">
                                    <Link
                                        href="/mot-de-passe-oublie"
                                        className="text-muted-foreground hover:underline"
                                    >
                                        Mot de passe oublié ?
                                    </Link>
                                </div>
                            </div>

                            <div className="mt-8 md:mt-4 flex flex-col-reverse md:flex-row-reverse gap-2 md:gap-4 items-end md:items-center justify-between">
                                <Button
                                    onClick={handleLogin}
                                    disabled={loading}
                                    className="w-full md:w-auto"
                                >
                                    {loading ? "Connexion..." : "Se connecter"}
                                </Button>
                                {error && (
                                    <p className="text-red-600 text-sm">
                                        {error}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    );
}
