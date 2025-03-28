"use client"

import { signIn } from "next-auth/react"
import { useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

export default function Connexion() {
    const [email, setEmail] = useState("user1@test.com")
    const [password, setPassword] = useState("securepassword")
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const router = useRouter()
    const searchParams = useSearchParams()

    const callbackUrl = searchParams.get("callbackUrl") || "/"

    const handleLogin = async () => {
        setLoading(true)
        setError("")

        const result = await signIn("credentials", {
            email,
            password,
            redirect: false,
        })

        setLoading(false)

        if (result?.ok) {
            router.push(callbackUrl)
        } else {
            setError("Email ou mot de passe invalide.")
        }
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen px-4">
            <h1 className="text-2xl font-bold mb-6">Connexion</h1>
            <div className="w-full max-w-sm space-y-4">
                <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={loading}
                />
                <Input
                    type="password"
                    placeholder="Mot de passe"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={loading}
                />

                {error && <p className="text-red-600 text-sm">{error}</p>}

                <Button onClick={handleLogin} disabled={loading} className="w-full">
                    {loading ? "Connexion..." : "Se connecter"}
                </Button>
            </div>
        </div>
    )
}
