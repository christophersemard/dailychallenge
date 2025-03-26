"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

type Props = {
    color: "primary" | "secondary" | "success" | "danger" | "teal" | "red" | "purple" | "yellow" | "green" | "blue" | "pink"
    gameId: string
}

export default function GamePlay({ gameId, color }: Props) {
    const [guess, setGuess] = useState("")
    const [remainingTries, setRemainingTries] = useState(4)

    const handleSubmit = () => {
        if (!guess.trim()) return
        console.log(`[${gameId}] Soumission :`, guess)
        setGuess("")
        setRemainingTries((prev) => Math.max(0, prev - 1))
    }

    const handleSkip = () => {
        console.log(`[${gameId}] Partie passée`)
    }

    return (
        <div className="space-y-2 mt-8">
            <div className="text-sm text-muted-foreground">
                {remainingTries} essais restants
            </div>

            <div className="flex flex-col sm:flex-row gap-2">
                <Input
                    value={guess}
                    onChange={(e) => setGuess(e.target.value)}
                    placeholder="Entrez un nom de film"
                    className="flex-1"
                />
                <div className="flex gap-2">
                    <Button variant={color} onClick={handleSubmit}>
                        Soumettre
                    </Button>
                    <Button variant={"outline-" + color as any} onClick={handleSkip}>
                        Passer
                    </Button>
                </div>
            </div>
        </div>
    )
}
