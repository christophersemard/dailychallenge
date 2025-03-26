// src/components/layout/DrawerUserMenuMobile.tsx
"use client"

import { LogOut, Settings, UserCircle2, X, Crown } from "lucide-react"
import { Button } from "@/components/ui/button"

type Props = {
    user: {
        pseudo: string
        level: number
        avatarUrl?: string
        isVIP?: boolean
    }
    onClose: () => void
}

export default function DrawerUserMenuMobile({ user, onClose }: Props) {
    return (
        <aside className="fixed top-0 right-0 w-[320px] h-full bg-background z-50 border-l border-muted/20 shadow-lg flex flex-col">
            {/* Header */}
            <div className="flex justify-between items-center p-4 border-b border-muted/20 font-bold text-lg text-foreground">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-primary rounded" />
                    <div>
                        <div>{user.pseudo}</div>
                        <div className="text-sm text-muted-foreground">Niv. {user.level}</div>
                    </div>
                    {user.isVIP && <Crown className="text-primary ml-1" />}
                </div>
                <button onClick={onClose} className="hover:text-muted transition">
                    <X />
                </button>
            </div>

            {/* Liens */}
            <div className="p-4 space-y-2">
                <Button variant="ghost" className="w-full justify-start text-sm">
                    <UserCircle2 className="w-4 h-4 mr-2" /> Voir mon profil
                </Button>
                <Button variant="ghost" className="w-full justify-start text-sm">
                    <Settings className="w-4 h-4 mr-2" /> Gérer mon compte
                </Button>
                <Button variant="ghost" className="w-full justify-start text-sm text-danger">
                    <LogOut className="w-4 h-4 mr-2" /> Me déconnecter
                </Button>
            </div>
        </aside>
    )
}
