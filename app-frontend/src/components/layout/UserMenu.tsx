// src/components/layout/UserMenu.tsx
"use client"

import { useState } from "react"
import { LogOut, Settings, UserCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useDebounce } from "@uidotdev/usehooks";
import OutlineText from "@/components/ui/outline-text"

type UserMenuProps = {
    user: {
        pseudo: string
        level: number
        avatarUrl?: string
    }
}

export default function UserMenu({ user }: UserMenuProps) {
    const [open, setOpen] = useState(false);
    const debouncedOpen = useDebounce(open, 200);

    const handleMouseEnter = () => {
        setOpen(true);
    };

    const handleMouseLeave = () => {
        setOpen(false);
    };

    return (
        <Popover open={debouncedOpen} onOpenChange={setOpen}>
            <PopoverTrigger asChild
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave} >
                <button className="flex items-center gap-2 px-2 py-1 border-2 bg-white/50 border-black/3 rounded  hover:bg-white transition text-foreground cursor-pointer">
                    <div className="w-6 h-6 bg-primary rounded" />
                    <span className="font-semibold">{user.pseudo}</span>
                    <span className="text-xs text-muted-foreground ms-4">Niv. </span>
                    <OutlineText color="black" text={String(52)}></OutlineText>


                </button>
            </PopoverTrigger>

            <PopoverContent className="w-56 p-2 space-y-1 bg-white border-none shadow-lg" align="end"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}>
                <Button variant="ghost-background" className="w-full justify-start text-sm whitespace-nowrap">
                    <UserCircle2 className="w-4 h-4 mr-2" /> Voir mon profil
                </Button>
                <div className="border-t border-muted/10"></div>
                <Button variant="ghost-background" className="w-full justify-start text-sm whitespace-nowrap">
                    <Settings className="w-4 h-4 mr-2" /> Gérer mon compte
                </Button>
                <div className="border-t border-muted/10"></div>
                <Button variant="ghost-background" className="w-full justify-start text-sm text-danger whitespace-nowrap">
                    <LogOut className="w-4 h-4 mr-2" /> Me déconnecter
                </Button>
            </PopoverContent>
        </Popover>
    )
}
