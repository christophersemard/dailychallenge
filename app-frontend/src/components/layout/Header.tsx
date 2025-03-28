"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { fetchClientWithAuth } from "@/lib/fetchClientWithAuth";
import { UserMe } from "@/types/user.types"; // Typage UserMe
import HeaderClient from "./HeaderClient";
import { useSession } from "next-auth/react";

export default function Header() {
    const { data: session, status } = useSession();
    const [user, setUser] = useState<UserMe | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    useEffect(() => {
        const fetchUserData = async () => {
            if (status === "authenticated") {

                try {
                    const userData = await fetchClientWithAuth<UserMe>("/users/me");
                    setUser(userData);
                    setIsAuthenticated(true);
                } catch (error) {
                    console.error("Error fetching user data:", error);
                    setUser(null);
                    setIsAuthenticated(false);
                }
            } else {
                setIsAuthenticated(false);
                setUser(null);
            }
        };

        fetchUserData();
    }, [session, status]);

    // return <>   </>
    return <HeaderClient isAuthenticated={isAuthenticated} user={user} />;
}
