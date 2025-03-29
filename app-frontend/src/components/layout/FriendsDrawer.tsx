"use client";

import { useState, useEffect } from "react";
import { X, Check, Plus, Timer, Hourglass, MailPlus, SendHorizonal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { IconButton } from "../ui/icon-button";
import { fetchClientWithAuth } from "@/lib/fetchClientWithAuth";
import { Friend, FriendRequestGroup, FriendRequest, UserMe } from "@/types/user.types";
import OutlineText from "../ui/outline-text";
import Link from "next/link";
import { toast } from "sonner";

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

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const { data: userFriends, error: friendsError } = await fetchClientWithAuth<Friend[]>("/friends");
                const { data: requests, error: requestsError } = await fetchClientWithAuth<FriendRequestGroup>("/friends/requests");

                if (friendsError || !userFriends) {
                    console.error("Erreur récupération amis :", friendsError);
                    return;
                }

                if (requestsError || !requests) {
                    console.error("Erreur récupération des demandes d'amis :", requestsError);
                    return;
                }

                setFriends(userFriends);
                setFriendRequestsSent(requests.sent);
                setFriendRequestsReceived(requests.received);
            } catch (error) {
                console.error("Erreur inattendue :", error);
            } finally {
                setLoading(false);
            }

        };

        fetchData();

    }, []);


    const handleAcceptRequest = async (friendId: string) => {
        try {
            await fetchClientWithAuth(`/friends/${friendId}/accept`, { method: "PATCH" });

            const newFriend = friendRequestsReceived.filter((r) => r.user.id == friendId)[0].user;
            const formattedFriend: Friend = {
                ...newFriend,
                avatarUrl: newFriend.avatarUrl || "", // Ensure avatarUrl is a string
            };
            console.log("Ami formaté :", formattedFriend);
            setFriends((prev) => [...prev, formattedFriend]);
            setFriendRequestsReceived(friendRequestsReceived.filter((r) => r.user.id !== friendId));

            toast.success("Demande d'ami acceptée", {
                className: "toast-base toast-success",
            })

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
            // Afficher un message de succès avec un toast
            toast.success("Demande d'ami envoyée", {
                className: "toast-base toast-success",
            })

            // Realler chercher les demandes
            const { data: requests, error } = await fetchClientWithAuth<FriendRequestGroup>("/friends/requests");

            if (error || !requests) {
                console.error("Erreur lors du fetch des demandes :", error);
                return;
            }

            setFriendRequestsSent(requests.sent);


        } catch (error) {
            console.error("Erreur ajout ami :", error);

            // Afficher un message d'erreur avec un toast
            toast.error("Erreur lors de l'envoi de la demande d'ami", {
                className: "toast-base toast-danger",
            })
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
                    const { data, error } = await fetchClientWithAuth<Friend[]>(
                        `/users/search?query=${encodeURIComponent(value)}`
                    );

                    if (error || !data) {
                        console.error("Erreur API recherche amis :", error);
                        setSearchResults([]);
                        return;
                    }

                    const filteredResults = data
                        .filter((result) => !friends.some((friend) => friend.id === result.id))
                        .filter((result) => result.id !== user?.id)
                        .filter((result) => !friendRequestsSent.some((r) => r.user.id === result.id));

                    setSearchResults(filteredResults);
                } catch (err) {
                    console.error("Erreur réseau recherche amis :", err);
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

    return (

        <>

            <div className="fixed inset-0 bg-black/50 z-40" onClick={onClose} />
            {/* Overlay */}

            <aside className="fixed top-0 right-0 w-full  max-w-[500px] h-full bg-white shadow-xl z-50 flex flex-col  rounded-l-lg">

                <div className="flex justify-between items-center p-4 bg-secondary text-white font-bold text-lg rounded-tl-sm">
                    Amis
                    <button onClick={onClose} className="hover:text-white/80 transition cursor-pointer">
                        <X />
                    </button>
                </div>
                <div className="p-4  flex-1 overflow-y-auto space-y-6 text-foreground flex flex-col">

                    <div className=" max-h-64 overflow-y-auto space-y-6 text-foreground flex flex-col p-4 bg-secondary/5 rounded-lg">
                        {/* Demandes */}
                        <h3 className="font-bold mb-2 text-muted-foreground">Demandes d&quot;amis</h3>
                        <div className="flex flex-col gap-1 max-h-64 overflow-y-auto">
                            {loading ? (
                                <div className="text-sm">Chargement des demandes ...</div>
                            ) : (
                                friendRequestsReceived.map((request, i) => (
                                    <>

                                        {i < friendRequestsSent.length && <div className="border-b border-muted/20 my-0" />}
                                        <div
                                            key={request.id}
                                            className=" p-2 rounded flex items-center justify-between"
                                        >
                                            <div className="flex items-center gap-2">
                                                <MailPlus size={16} className="text-muted-foreground" />
                                                <Link
                                                    href={`/profil/${request.user.id}`} className="text-sm font-medium hover:font-semibold">
                                                    {request.user.pseudo}
                                                </Link>
                                            </div>

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
                                    </>
                                ))
                            )}


                            {/* Afficher la liste des demandes envoyées en attente */}
                            {friendRequestsSent.length > 0 && (<>
                                {friendRequestsSent.map((request, i) => (
                                    <>
                                        {i < friendRequestsSent.length && <div className="border-b border-muted/20 my-0" />}
                                        <div
                                            key={request.id}
                                            className="p-2 rounded flex items-center justify-between"
                                        >

                                            <div className="flex items-center gap-2">
                                                <SendHorizonal size={16} className="text-muted-foreground" />
                                                <Link
                                                    href={`/profil/${request.user.id}`} className="text-sm font-medium hover:font-semibold">
                                                    {request.user.pseudo}
                                                </Link>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs font-medium"> En attente
                                                <Hourglass size={16} />
                                            </div>
                                        </div>
                                    </>
                                ))}</>
                            )}

                            {/* Aucune demande */}

                            {friendRequestsReceived.length === 0 && friendRequestsSent.length === 0 && !loading && (
                                <div className="text-sm text-muted-foreground">
                                    Aucune demande d&apos;ami en attente
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Mes amis */}
                    <div className="flex-1 overflow-y-auto">

                        <div className="flex items-center justify-between mb-2 gap-4">
                            <h3 className="font-bold  text-muted-foreground">Mes amis</h3>
                            <Input
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Rechercher"
                                className=" flex w-auto input-sm"
                            />
                        </div>
                        {friends.length == 0 && !loading || friends
                            .filter((f) => f.pseudo.toLowerCase().includes(searchTerm.toLowerCase())).length == 0 && !loading ? (
                            <div className="text-sm text-muted-foreground my-4">Aucun ami trouvé</div>
                        ) : null}
                        <ul className="space-y-2">
                            {loading && (
                                <div className="text-sm">Chargement des informations ...</div>
                            )}
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
                                                <div className="w-8 h-8 bg-primary rounded" />
                                                <span className="font-semibold">{friend.pseudo}</span>
                                            </div>
                                            <div className="flex items-center gap-2 w-20 justify-between">
                                                <span className="text-xs text-muted-foreground ms-4">Niv. </span>
                                                <OutlineText color="black" text={String(friend.level)} />
                                            </div>
                                        </Link>
                                    </li>
                                ))}


                        </ul>
                    </div>

                    <div className="mt-auto mb-5 relative">
                        {/* Ajouter un ami */}
                        <div >
                            <h3 className="font-bold mb-2 text-muted-foreground">Ajouter un ami</h3>
                            <div className="flex gap-2 relative">
                                <div className="flex-1 relative">
                                    <Input
                                        value={newFriend}
                                        onChange={handleSearchChange}
                                        placeholder="Ex : Michel76"
                                        className="input-sm input-secondary"
                                    />
                                    {searchResults.length > 0 && !selectedFriendId && (
                                        <div className="absolute bottom-full left-0 z-50 w-full bg-white border border-muted/20 rounded shadow mb-2 max-h-48 flex flex-col">
                                            <div className="bg-purple-600 text-white px-3 py-2 text-sm font-semibold rounded-t">
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
                        </div>
                    </div>
                </div>
            </aside>
        </>
    );
}
