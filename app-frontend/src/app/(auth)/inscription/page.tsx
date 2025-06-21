"use client"

import { useState, useMemo } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Eye, EyeOff, Check, X } from "lucide-react"
import Card from "@/components/ui/card"
import Link from "next/link"
import clsx from "clsx"
import { fetchClientWithAuth } from "@/lib/fetchClientWithAuth"
import FloatingBackgroundShapes from "@/components/layout/FloatingBackgroundShapes"

export default function Inscription() {
    const [pseudo, setPseudo] = useState("PseudoTest")
    const [email, setEmail] = useState("michel@michelle.com")
    const [password, setPassword] = useState("Azerty123456*")
    const [confirmPassword, setConfirmPassword] = useState("Azerty123456*")
    const [showPassword, setShowPassword] = useState(false)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const router = useRouter()

    const handleRegister = async () => {
        setLoading(true)
        setError("")

        if (password !== confirmPassword) {
            setError("Les mots de passe ne correspondent pas.")
            setLoading(false)
            return
        }

        try {
            const res = await fetchClientWithAuth<{ success: boolean }>("/api/auth/register", {
                method: "POST",
                body: JSON.stringify({ email, password, pseudo }),
                headers: { "Content-Type": "application/json" },
            })

            if (res.error) {
                if (res.error.statusCode === 409) {
                    setError("Cet email est déjà utilisé.")
                } else if (res.error.statusCode === 422) {
                    setError("Pseudo déjà pris.")
                } else if (res.error.statusCode === 500) {
                    setError("Erreur serveur.")
                } else {
                    setError(res.error.message || "Erreur lors de l'inscription.")
                }
            } else {
                router.push("/connexion?registered=true")
            }

        } catch (err) {
            setError("Erreur réseau.")
        } finally {
            setLoading(false)
        }
    }

    const passwordValidations = useMemo(() => ({
        length: password.length >= 8,
        lowercase: /[a-z]/.test(password),
        uppercase: /[A-Z]/.test(password),
        digit: /\d/.test(password),
        special: /[^A-Za-z0-9]/.test(password),
    }), [password])

    const renderRule = (label: string, isValid: boolean) => (
        <li key={label} className={clsx("text-sm flex items-center gap-2", isValid ? "text-success" : "text-danger")}>
            {isValid ? <Check size={16} /> : <X size={16} />}
            {label}
        </li>
    )

    return (
        <div className="flex-1 flex items-center justify-center">

            <FloatingBackgroundShapes variant="purple" />
            <Card color="secondary" title="Inscription">
                <div className="grid md:grid-cols-1 gap-6">
                    <div>
                        <div className="flex flex-col items-center md:flex-row md:justify-between gap-4 md:gap-8 mb-8 md:mb-4">
                            <h2 className="font-bold text-lg text-center md:text-start">Inscrivez-vous pour accéder aux jeux</h2>
                            <Button variant="outline-background" size="xs" asChild>
                                <Link href="/connexion">Déjà un compte ? Connectez-vous</Link>
                            </Button>
                        </div>

                        <div className="space-y-4">
                            <p>Renseigner vos informations</p>

                            <div>
                                <label htmlFor="pseudo" className="block font-semibold mb-1 text-sm">Pseudo</label>
                                <Input
                                    id="pseudo"
                                    placeholder="Michel76"
                                    value={pseudo}
                                    onChange={(e) => setPseudo(e.target.value)}
                                    disabled={loading}
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block font-semibold mb-1 text-sm">Email</label>
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
                                <label htmlFor="password" className="block font-semibold mb-1 text-sm">Mot de passe</label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Mot de passe"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        disabled={loading}
                                        className="pr-10"
                                    />
                                    <Button
                                        variant="ghost-background"
                                        onClick={() => setShowPassword((prev) => !prev)}
                                        className="absolute top-1/2 right-0 transform -translate-y-1/2 text-muted-foreground hover:text-black cursor-pointer"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </Button>
                                </div>

                                {(
                                    <ul className="mt-2 space-y-1 flex gap-2 flex-wrap justify-center md:justify-start">
                                        {renderRule("Au moins 8 caractères", passwordValidations.length)}
                                        {renderRule("Une minuscule", passwordValidations.lowercase)}
                                        {renderRule("Une majuscule", passwordValidations.uppercase)}
                                        {renderRule("Un chiffre", passwordValidations.digit)}
                                        {renderRule("Un caractère spécial", passwordValidations.special)}
                                    </ul>
                                )}
                            </div>

                            <div>
                                <label htmlFor="confirmPassword" className="block font-semibold mb-1 text-sm">
                                    Confirmation de mot de passe
                                </label>
                                <Input
                                    id="confirmPassword"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Mot de passe"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    disabled={loading}
                                    className="pr-10"
                                />
                            </div>


                            <div className="mt-8 md:mt-4 flex flex-col-reverse md:flex-row-reverse gap-2 md:gap-4 items-end md:items-center justify-between">
                                <Button
                                    className="w-full md:w-auto"
                                    variant="secondary"
                                    onClick={handleRegister}
                                    disabled={loading}
                                >
                                    {loading ? "Inscription..." : "S’inscrire"}
                                </Button>

                                {error && <p className="text-danger font-bold text-base text-center md:text-start w-full">{error}</p>}
                            </div>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
    )
}
