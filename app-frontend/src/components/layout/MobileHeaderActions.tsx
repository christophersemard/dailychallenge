// src/components/layout/MobileHeaderActions.tsx
"use client"

import { useState } from "react"
import { LogIn, LogInIcon, Menu, User, Users2 } from "lucide-react"
import DrawerUserMenuMobile from "./DrawerUserMenuMobile"
import DrawerGamesMobile from "./DrawerGamesMobile"
import FriendsDrawer from "./FriendsDrawer"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { IconButton } from "@/components/ui/icon-button"
import { IconButtonWithBadge } from "@/components/ui/icon-button-with-badge"

export default function MobileHeaderActions() {
    const isAuthenticated = false // ⚠️ à remplacer dynamiquement plus tard

    const [openFriends, setOpenFriends] = useState(false)
    const [openUser, setOpenUser] = useState(false)
    const [openMenu, setOpenMenu] = useState(false)

    const user = {
        pseudo: "Michel76",
        level: 52,
        isVIP: true,
        avatarUrl: "",
        pendingFriendRequests: 2,
    }

    if (!isAuthenticated) {
        return (
            <div className="flex md:hidden gap-2">
                <Link href="/inscription">
                    <Button variant="secondary" size={"sm"}>S&apos;inscrire</Button>
                </Link>
                <Link href="/connexion">
                    <IconButton icon={<User />} aria-label="Se connecter" size="sm" variant="primary" />
                </Link>
            </div>
        )
    }

    return (
        <div className="flex md:hidden items-center gap-2">


            {/* Avatar drawer */}
            <button
                onClick={() => setOpenUser(true)}
                className="w-10 h-8 p-0 flex items-center justify-center rounded hover:opacity-90 transition"
                aria-label="Ouvrir le menu utilisateur"
            >
                <div className="w-8 h-8 rounded bg-primary" />
            </button>

            {/* Icône amis avec badge */}
            <IconButtonWithBadge
                icon={<Users2 />}
                badgeContent={user.pendingFriendRequests}
                onClick={() => setOpenFriends(true)}
                aria-label="Ouvrir le drawer amis"
                variant="ghost"
                size="lg"
            />

            {/* Hamburger */}
            <IconButton
                icon={<Menu size={32} />}
                onClick={() => setOpenMenu(true)}
                aria-label="Ouvrir le menu jeux"
                size="lg"
                variant="ghost"
            />


            {openFriends && <FriendsDrawer onClose={() => setOpenFriends(false)} />}
            {openUser && <DrawerUserMenuMobile user={user} onClose={() => setOpenUser(false)} />}
            {openMenu && <DrawerGamesMobile onClose={() => setOpenMenu(false)} />}
        </div>
    )
}
