// src/components/layout/Header.tsx
"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { IconButtonWithBadge } from "@/components/ui/icon-button-with-badge"
import { Crown, Users2 } from "lucide-react"
import CategoryDropdown from "./CategoryDropdown"
import UserMenu from "./UserMenu"
import FriendsDrawer from "./FriendsDrawer"
import MobileHeaderActions from "./MobileHeaderActions"
import Image from "next/image"

export default function Header() {
    const isAuthenticated = true // À remplacer par un vrai auth state
    const [showFriends, setShowFriends] = useState(false)

    const user = {
        pseudo: "Michel76",
        level: 52,
        isVIP: true,
        avatarUrl: "",
        pendingFriendRequests: 2,
    }

    return (
        <header className="fixed top-0 w-full z-50 py-2 md:py-4">
            <div className="mx-auto max-w-10xl px-4 py-2 md:py-3 flex items-center justify-between">
                {/* Logo + catégories */}
                <div className="flex items-center gap-6">
                    <Link href="/" className="max-w-[140px] md:max-w-[180px] h-[40px] relative flex items-center">
                        <Image
                            src="/assets/dailychallenge-logo.png"
                            alt="DailyChallenge"
                            width={180}
                            height={50}
                            className="hidden md:block h-auto w-auto"
                        />
                        <Image
                            src="/assets/dailychallenge-logo.png"
                            alt="DailyChallenge"
                            width={140}
                            height={40}
                            className="block md:hidden h-auto w-auto"
                        />
                    </Link>

                    {/* Navigation (desktop uniquement) */}
                    <nav className="ps-4 hidden md:flex gap-8 text-sm font-medium">
                        <CategoryDropdown title="Cinéma" />
                        <CategoryDropdown title="Géographie" />
                        <CategoryDropdown title="Autres" />
                    </nav>
                </div>

                {/* Zone actions */}
                <div className="flex items-center gap-3">
                    {/* Bouton VIP (toujours affiché) */}
                    {isAuthenticated && user.isVIP ? (
                        <Button variant="outline-background" className="gap-2 items-center fill-primary text-primary hidden md:flex">
                            <Crown fill="primary" size={16} />
                            <span className="text-black">VIP</span>
                        </Button>
                    ) : (
                        <Button variant="outline-primary" className="gap-2 items-center hidden md:flex">
                            <Crown size={16} />
                            Devenir VIP
                        </Button>
                    )}

                    {/* --- Zone Desktop --- */}
                    <div className="hidden md:flex items-center gap-3">
                        {!isAuthenticated ? (
                            <>
                                <Link href="/inscription">
                                    <Button variant="secondary">S’inscrire</Button>
                                </Link>
                                <Link href="/connexion">
                                    <Button variant="primary">Se connecter</Button>
                                </Link>
                            </>
                        ) : (
                            <>
                                <UserMenu user={user} />
                                <IconButtonWithBadge
                                    icon={
                                        <Users2
                                            size={16}
                                            className="text-foreground" />
                                    }
                                    variant={"outline-background"}
                                    badgeContent={user.pendingFriendRequests}
                                    onClick={() => setShowFriends(true)}
                                    aria-label="Ouvrir le drawer amis"
                                />
                            </>
                        )}
                    </div>

                    {/* --- Zone Mobile --- */}
                    <MobileHeaderActions />
                </div>
            </div>

            {/* Drawer amis pour desktop aussi */}
            {showFriends && <FriendsDrawer onClose={() => setShowFriends(false)} />}
        </header>
    )
}
