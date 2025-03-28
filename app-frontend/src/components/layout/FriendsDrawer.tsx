"use client";

import { useState, useEffect } from "react";
import { X, Check, Plus, Timer, Hourglass } from "lucide-react";
import { Input } from "@/components/ui/input";
import { IconButton } from "../ui/icon-button";
import { fetchClientWithAuth } from "@/lib/fetchClientWithAuth";
import { Friend, FriendRequestGroup, FriendRequest, UserMe } from "@/types/user.types";
import OutlineText from "../ui/outline-text";
import Link from "next/link";

type FriendsDrawerProps = {
    onClose: () => void;
    user?: UserMe | null;
};

export default function FriendsDrawer({ onClose, user }: FriendsDrawerProps) {
    const [friends, setFriends] = useState<Friend[]>([]);
    const [friendRequestsSent, setFriendRequestsSent] = useState<FriendRequest[]>([]);
    const [friendRequestsReceived, setFriendRequestsReceived] = useState<FriendRequest[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [newFriend, setNewFriend] = useState("");
    const [loading, setLoading] = useState(false);
    const [searchResults, setSearchResults] = useState<Friend[]>([]);
    const [selectedFriendId, setSelectedFriendId] = useState<string | null>(null);
    const [searchTimeout, setSearchTimeout] = useState<NodeJS.Timeout | null>(null);
    const [validationAddFriendMessage, setValidationAddFriendMessage] = useState(false);
    const [errorAddFriendMessage, setErrorAddFriendMessage] = useState<string | boolean>(false);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const userFriends = await fetchClientWithAuth<Friend[]>("/friends");
                const requests = await fetchClientWithAuth<FriendRequestGroup>("/friends/requests");
                setFriends(userFriends);
                setFriendRequestsSent(requests.sent);
                setFriendRequestsReceived(requests.received);
            } catch (error) {
                console.error("Erreur récupération amis :", error);
            } finally {
                setLoading(false);
            }
        };

        fetchData();

    }, []);


    const handleAcceptRequest = async (friendId: string) => {
        try {
            await fetchClientWithAuth(`/friends/${friendId}/accept`, { method: "PATCH" });

            console.log("Ami accepté :", friendId);
            const newFriend = friendRequestsReceived.filter((r) => r.user.id == friendId)[0].user;
            console.log("Nouvel ami :", newFriend);
            const formattedFriend: Friend = {
                ...newFriend,
                avatarUrl: newFriend.avatarUrl || "", // Ensure avatarUrl is a string
            };
            console.log("Ami formaté :", formattedFriend);
            setFriends((prev) => [...prev, formattedFriend]);
            setFriendRequestsReceived(friendRequestsReceived.filter((r) => r.user.id !== friendId));


        } catch (error) {
            console.error("Erreur acceptation :", error);
        }
    };

    const handleRejectRequest = async (friendId: string) => {
        try {
            await fetchClientWithAuth(`/friends/${friendId}/reject`, { method: "PATCH" });
            setFriendRequestsReceived(friendRequestsReceived.filter((r) => r.user.id !== friendId));
        } catch (error) {
            console.error("Erreur rejet :", error);
        }
    };

    const handleAddFriend = async () => {
        if (!selectedFriendId) return;
        try {
            await fetchClientWithAuth("/friends/" + selectedFriendId + "/request", {
                method: "POST",
            });
            setNewFriend("");
            setSelectedFriendId(null);
            setSearchResults([]);
            setValidationAddFriendMessage(true);

            // Realler chercher les demandes
            const requests = await fetchClientWithAuth<FriendRequestGroup>("/friends/requests");
            setFriendRequestsSent(requests.sent);



        } catch (error) {
            console.error("Erreur ajout ami :", error);
            setErrorAddFriendMessage("Erreur lors de l'envoi de la demande d'ami.");
        }
    };

    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setNewFriend(value);
        setSelectedFriendId(null);

        if (value == "") {
            setSearchResults([]);
            return;
        }

        if (searchTimeout) clearTimeout(searchTimeout);

        const timeout = setTimeout(async () => {
            if (value.trim().length > 0) {
                try {
                    const results = await fetchClientWithAuth<Friend[]>(
                        `/users/search?query=${encodeURIComponent(value)}`
                    );
                    // Enlever les amis déjà dans la liste
                    const filteredResults = results.filter(
                        (result) => !friends.some((friend) => friend.id === result.id)
                    );
                    // S'enlever soi même de la liste
                    const filteredResults2 = filteredResults.filter(
                        (result) => result.id !== user?.id
                    );
                    // Enlever les amis déjà dans la liste des demandes envoyées
                    const filteredResults3 = filteredResults2.filter(
                        (result) => !friendRequestsSent.some((friend) => friend.user.id === result.id)
                    );
                    setSearchResults(filteredResults3);
                } catch (err) {
                    console.error("Erreur recherche amis :", err);
                    setSearchResults([]);
                }
            } else {
                setSearchResults([]);
            }
        }, 300);

        setSearchTimeout(timeout);
    };

    const handleSelectSuggestion = (friend: Friend) => {
        setNewFriend(friend.pseudo);
        setSelectedFriendId(friend.id);
        setSearchResults([]);
    };

    useEffect(() => {
        console.log("RERENDU FRIENDS DRAWER")
    }, [, friends, friendRequestsSent, friendRequestsReceived]);

    // Efface les messages après 2 secondes
    useEffect(() => {
        if (validationAddFriendMessage || errorAddFriendMessage) {
            const timeout = setTimeout(() => {
                setValidationAddFriendMessage(false);
                setErrorAddFriendMessage(false);
            }, 2000);

            return () => clearTimeout(timeout); // Nettoyage
        }
    }, [validationAddFriendMessage, errorAddFriendMessage]);


    return (
        <aside className="fixed top-0 right-0 w-[320px] h-full bg-background shadow-xl z-50 flex flex-col border-l border-muted/20 rounded-l-lg">
            <div className="flex justify-between items-center p-4 bg-secondary text-white font-bold text-lg rounded-tl-sm">
                Amis
                <button onClick={onClose} className="hover:text-white/80 transition cursor-pointer">
                    <X />
                </button>
            </div>

            <div className="p-4 flex-1 overflow-y-auto space-y-6 text-foreground flex flex-col">
                {/* Demandes */}
                <h3 className="text-sm font-semibold mb-2 text-muted-foreground">Demandes en attente</h3>
                <div className="flex flex-col gap-1 max-h-64 overflow-y-auto">
                    {loading ? (
                        <div>Loading...</div>
                    ) : (
                        friendRequestsReceived.map((request) => (
                            <div
                                key={request.id}
                                className="bg-secondary/10 p-2 rounded flex items-center justify-between"
                            >
                                <Link
                                    href={`/profil/${request.user.id}`} className="text-sm font-medium hover:font-semibold">
                                    {request.user.pseudo}
                                </Link>
                                <div className="flex gap-2">
                                    <IconButton
                                        icon={<Check />}
                                        variant="success"
                                        size="xs"
                                        onClick={() => handleAcceptRequest(request.user.id)}
                                    />
                                    <IconButton
                                        icon={<X />}
                                        variant="danger"
                                        size="xs"
                                        onClick={() => handleRejectRequest(request.user.id)}
                                    />
                                </div>
                            </div>
                        ))
                    )}


                    {/* Afficher la liste des demandes envoyées en attente */}
                    {friendRequestsSent.length > 0 && (<>
                        {friendRequestsSent.map((request) => (
                            <div
                                key={request.id}
                                className="bg-secondary/10 p-2 rounded flex items-center justify-between"
                            >
                                <Link
                                    href={`/profil/${request.user.id}`} className="text-sm font-medium hover:font-semibold">
                                    {request.user.pseudo}
                                </Link>
                                <Hourglass size={16} />
                            </div>
                        ))}</>
                    )}

                    {/* Aucune demande */}

                    {friendRequestsReceived.length === 0 && friendRequestsSent.length === 0 && !loading && (
                        <div className="text-sm text-muted-foreground">
                            Aucune demande d&apos;ami en attente
                        </div>
                    )}
                </div>

                {/* Mes amis */}
                <div className="flex-1 overflow-y-auto">
                    <h3 className="text-sm font-semibold mb-2 text-muted-foreground">Mes amis</h3>
                    <Input
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        placeholder="Rechercher"
                        className="mb-2"
                    />
                    <ul className="space-y-1">
                        {friends
                            .filter((f) => f.pseudo.toLowerCase().includes(searchTerm.toLowerCase())).sort((a, b) => {
                                return a.pseudo.localeCompare(b.pseudo);
                            }
                            )
                            .map((friend) => (
                                <li key={friend.id}>
                                    <Link
                                        href={`/profil/${friend.id}`}
                                        className="flex items-center justify-between gap-2 px-2 py-1 border-2 bg-white/50 border-black/3 rounded hover:bg-white transition text-foreground cursor-pointer"
                                    >
                                        <div className="flex items-center gap-2">
                                            <div className="w-6 h-6 bg-primary rounded" />
                                            <span className="font-semibold">{friend.pseudo}</span>
                                        </div>
                                        <div className="flex items-center gap-2 w-20 justify-between">
                                            <span className="text-xs text-muted-foreground ms-4">Niv. </span>
                                            <OutlineText color="black" text={String(friend.level)} />
                                        </div>
                                    </Link>
                                </li>
                            ))}
                        {friends.length === 0 || friends
                            .filter((f) => f.pseudo.toLowerCase().includes(searchTerm.toLowerCase())).length == 0 && !loading && (
                                <div className="text-sm text-muted-foreground text-center my-4">Aucun ami trouvé</div>
                            )}
                    </ul>
                </div>

                {/* Ajouter un ami */}
                <div className="mt-auto mb-5 relative">
                    <h3 className="text-sm font-semibold mb-2 text-muted-foreground">Ajouter un ami</h3>
                    <div className="flex gap-2 relative">
                        <div className="flex-1 relative">
                            <Input
                                value={newFriend}
                                onChange={handleSearchChange}
                                placeholder="Ex : Michel76"
                            />
                            {searchResults.length > 0 && !selectedFriendId && (
                                <div className="absolute bottom-full left-0 z-50 w-full bg-white border border-muted/20 rounded shadow mb-2 max-h-48 flex flex-col">
                                    <div className="bg-purple-600 text-white px-3 py-1 text-xs font-bold rounded-t">
                                        Suggestions
                                    </div>
                                    <ul className="overflow-y-auto flex-1">
                                        {searchResults.map((user) => (
                                            <li
                                                key={user.id}
                                                className="px-3 py-2 text-sm border border-black/5 hover:bg-muted/10 cursor-pointer"
                                                onClick={() => handleSelectSuggestion(user)}
                                            >
                                                {user.pseudo}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {searchResults.length === 0 && !selectedFriendId && newFriend.length > 0 ? (
                                <div className="absolute bottom-full left-0 z-50 w-full bg-white border border-muted/20 rounded shadow mb-2 max-h-48 flex flex-col">
                                    <div className="bg-purple-600 text-white px-3 py-1 text-xs font-bold rounded-t">
                                        Suggestions
                                    </div>
                                    <ul className="overflow-y-auto flex-1">
                                        <li
                                            className="px-3 py-2 text-sm hover:bg-muted/10 "
                                        >
                                            Aucun joueur trouvé
                                        </li>
                                    </ul>
                                </div>
                            )
                                : null
                            }
                        </div>
                        <IconButton
                            icon={<Plus />}
                            variant="secondary"
                            size="sm"
                            onClick={handleAddFriend}
                            disabled={!selectedFriendId}
                        />
                    </div>
                    {validationAddFriendMessage && (
                        <div className="w-full bg-success text-white p-2 rounded mt-2">
                            Demande d&apos;ami envoyée !
                        </div>
                    )}
                    {errorAddFriendMessage && (
                        <div className="w-full bg-danger text-white p-2 rounded mt-2">
                            {errorAddFriendMessage}
                        </div>
                    )}
                </div>
            </div>
        </aside>
    );
}
