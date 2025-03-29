"use client"

import { useEffect, useRef, useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Color } from "@/types/colors.types"
import { ButtonVariant } from "@/components/ui/button"
import { fetchClientWithAuth } from "@/lib/fetchClientWithAuth"

type Suggestion = {
    id: string
    name: string
    originalName: string
    otherInfo: string
}

type Props = {
    color: Color
    maxTries: number
    triesLeft: number
    loading: boolean
    onSubmit: (movieId: number) => void
    onSkip: () => void
    searchUrl: string
}

export default function GamePlay({
    color,
    maxTries,
    triesLeft,
    loading,
    onSubmit,
    onSkip,
    searchUrl,
}: Props) {
    const [input, setInput] = useState("")
    const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null)
    const [suggestions, setSuggestions] = useState<Suggestion[]>([])
    const [selectedMovieId, setSelectedMovieId] = useState<number | null>(null)
    const [isSuggestionOpen, setIsSuggestionOpen] = useState(false)

    const skipNextSearchRef = useRef(false)
    const inputRef = useRef<HTMLInputElement>(null)
    const containerRef = useRef<HTMLDivElement>(null)

    // Fermer les suggestions en cliquant à l'extérieur
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
                setSuggestions([])
                setIsSuggestionOpen(false)
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [])

    // Gérer la recherche
    useEffect(() => {
        if (skipNextSearchRef.current) {
            skipNextSearchRef.current = false
            return
        }

        if (input.trim() === "") {
            setSuggestions([])
            setSelectedMovieId(null)
            setIsSuggestionOpen(false)
            return
        }

        if (searchTimeout) clearTimeout(searchTimeout)

        const timeout = setTimeout(async () => {
            try {
                const { data, error } = await fetchClientWithAuth<Suggestion[]>(
                    `${searchUrl}${encodeURIComponent(input.trim())}`
                )

                if (error || !data) {
                    console.error("Erreur API suggestions :", error)
                    setSuggestions([])
                } else {
                    setSuggestions(data)
                }

                setIsSuggestionOpen(true)
            } catch (err) {
                console.error("Erreur réseau suggestions :", err)
                setSuggestions([])
                setIsSuggestionOpen(true)
            }
        }, 300)

        setSearchTimeout(timeout)
    }, [input, searchUrl])

    const handleSubmit = () => {
        if (selectedMovieId) {
            onSubmit(selectedMovieId)
            setInput("")
            setSelectedMovieId(null)
            setSuggestions([])
            setIsSuggestionOpen(false)
        }
    }

    const handleSelect = (suggestion: Suggestion) => {
        inputRef.current?.blur()
        inputRef.current?.focus()
        skipNextSearchRef.current = true
        setInput(suggestion.name)
        setSelectedMovieId(Number(suggestion.id))
        setSuggestions([])
        setIsSuggestionOpen(false)
    }

    const showSuggestions = useMemo(() => {
        return isSuggestionOpen
    }, [isSuggestionOpen])

    return (
        <div className="space-y-2 mt-8 relative">
            <div className="text-sm text-muted-foreground">
                {triesLeft} essais restants
            </div>

            <div className="flex flex-col sm:flex-row gap-2 relative z-10">
                <div ref={containerRef} className="flex-1 relative">
                    <Input
                        ref={inputRef}
                        value={input}
                        onChange={(e) => {
                            setInput(e.target.value)
                            setSelectedMovieId(null)
                        }}
                        placeholder="Entrez un nom de film"
                        className={"input-" + color}
                        disabled={loading || triesLeft <= 0}
                    />

                    {showSuggestions && (
                        <div className="absolute bottom-full left-0 z-50 w-full bg-white border border-muted/20 rounded shadow-xl mb-2 max-h-56 flex flex-col overflow-hidden">
                            <div className={`bg-${color} text-white px-3 py-2  font-semibold`}>
                                Suggestions
                            </div>
                            <ul className="overflow-y-auto flex-1">
                                {suggestions.length > 0 ? (
                                    suggestions.map((sugg) => (
                                        <li
                                            key={sugg.id}
                                            className="px-3 py-2 text-md font-medium hover:bg-muted/10 cursor-pointer border-b border-muted/10"
                                            onClick={() => handleSelect(sugg)}
                                        >
                                            {sugg.name} {sugg.otherInfo && (<>{" - " + sugg.otherInfo}</>)}
                                            {sugg.originalName && sugg.originalName !== sugg.name && (
                                                <span className="text-muted-foreground text-xs italic ml-2">
                                                    ({sugg.originalName})
                                                </span>
                                            )}
                                        </li>
                                    ))
                                ) : (
                                    <li className="px-3 py-2 text-sm text-muted-foreground italic">
                                        Aucune suggestion trouvée
                                    </li>
                                )}
                            </ul>
                        </div>
                    )}
                </div>

                <div className="flex flex-col md:flex-row gap-6 md:gap-2">
                    <Button
                        variant={color as ButtonVariant}
                        onClick={handleSubmit}
                        disabled={loading || triesLeft <= 0 || !selectedMovieId}
                    >
                        Soumettre
                    </Button>
                    <Button
                        variant={`outline-${color}` as ButtonVariant}
                        onClick={onSkip}
                        disabled={loading || triesLeft <= 0}
                    >
                        Passer
                    </Button>
                </div>
            </div>
        </div>
    )
}
