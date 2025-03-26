// src/components/layout/FriendsDrawer.tsx
"use client"

import { X, Check, Plus } from "lucide-react"
import { Input } from "@/components/ui/input"
import { IconButton } from "../ui/icon-button"

type FriendsDrawerProps = {
    onClose: () => void
}

export default function FriendsDrawer({ onClose }: FriendsDrawerProps) {
    return (
        <aside className="fixed top-0 right-0 w-[320px] h-full bg-background shadow-xl z-50 flex flex-col border-l border-muted/20 rounded-l-lg">
            {/* Header */}
            <div className="flex justify-between items-center p-4 bg-secondary text-secondary-foreground font-bold text-lg rounded-tl-sm">
                Amis
                <button onClick={onClose} className="hover:text-muted transition">
                    <X />
                </button>
            </div>

            {/* Contenu */}
            <div className="p-4 flex-1 overflow-y-auto space-y-6 text-foreground">
                {/* Demandes */}
                <div>
                    <h3 className="text-sm font-semibold mb-2 text-muted-foreground">Demandes</h3>
                    <div className="bg-secondary/10 p-2 rounded flex items-center justify-between">
                        <span className="text-sm">Michel76 — Niv. 52</span>
                        <div className="flex gap-2">
                            <IconButton icon={<Check />} variant="success" size="xs" />
                            <IconButton icon={<X />} variant="danger" size="xs" />
                        </div>
                    </div>
                </div>

                {/* Mes amis */}
                <div>
                    <h3 className="text-sm font-semibold mb-2 text-muted-foreground">Mes amis</h3>
                    <Input placeholder="Rechercher" className="mb-2" />
                    <ul className="space-y-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                            <li
                                key={i}
                                className="flex justify-between items-center p-2 border border-muted/30 rounded text-sm"
                            >
                                Robert76140 — Niv. 52
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Ajouter un ami */}
                <div className="mt-4">
                    <h3 className="text-sm font-semibold mb-2 text-muted-foreground">Ajouter un ami</h3>
                    <div className="flex gap-2">
                        <Input placeholder="Ex : Michel76" />
                        <IconButton icon={<Plus />} variant="secondary" size="sm" />
                    </div>
                </div>
            </div>
        </aside>
    )
}
