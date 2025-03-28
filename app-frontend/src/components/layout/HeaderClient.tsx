// src/components/layout/HeaderClient.tsx
"use client"

import Link from "next/link"
import Image from "next/image"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Crown, Users2 } from "lucide-react"
import { IconButtonWithBadge } from "@/components/ui/icon-button-with-badge"
import CategoryDropdown from "./CategoryDropdown"
import UserMenu from "./UserMenu"
import FriendsDrawer from "./FriendsDrawer"
import MobileHeaderActions from "./MobileHeaderActions"
import { UserMe } from "@/types/user.types"


type Props = {
    isAuthenticated: boolean
    user?: UserMe | null
}

export default function HeaderClient({ isAuthenticated, user }: Props) {
    const [showFriends, setShowFriends] = useState(false)

    const isVip = false;

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


                    {/* Zone Desktop */}
                    <div className="hidden md:flex items-center gap-3">
                        {!isAuthenticated ? (
                            <>
                                <Button variant="secondary" asChild>
                                    <Link href="/inscription">
                                        S’inscrire
                                    </Link>
                                </Button>
                                <Button variant="primary" asChild>
                                    <Link href="/connexion" className="whitespace-nowrap">
                                        Se connecter
                                    </Link>
                                </Button>
                            </>
                        ) : (
                            <>
                                {isVip ? (

                                    <Button variant="ghost-background" className="w-full justify-start text-sm whitespace-nowrap hidden md:flex" asChild>
                                        <Link href="/vip" className="gap-2 items-center fill-primary text-primary">
                                            <Crown fill="primary" size={16} />
                                            <span className="text-black">VIP</span>
                                        </Link>
                                    </Button>
                                ) : (

                                    <Button variant="outline-primary" className="w-full justify-start text-sm whitespace-nowrap hidden md:flex" asChild>
                                        <Link href="/vip" className="gap-2 items-center">
                                            <Crown size={16} />
                                            Devenir VIP
                                        </Link>
                                    </Button>
                                )}
                                <UserMenu user={user!} />
                                <IconButtonWithBadge
                                    icon={<Users2 size={16} className="text-foreground" />}
                                    variant="outline-white"
                                    badgeContent={user?.pendingFriendRequests || 0}
                                    onClick={() => setShowFriends(true)}
                                    aria-label="Ouvrir le drawer amis"
                                />
                            </>
                        )}


                    </div>

                    {/* Zone Mobile */}
                    <MobileHeaderActions user={user!} isAuthenticated={isAuthenticated} />
                </div>
            </div>

            {showFriends && <FriendsDrawer onClose={() => setShowFriends(false)} user={user} />}
        </header >
    )
}
