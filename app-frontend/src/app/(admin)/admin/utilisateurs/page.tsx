"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
    MoreVertical,
    ChevronLeft,
    ChevronRight,
    MoreHorizontal,
} from "lucide-react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Card from "@/components/ui/card";
import { fetchClientWithAuth } from "@/lib/fetchClientWithAuth";
import Link from "next/link";
import Image from "next/image";
import OutlineText from "@/components/ui/outline-text";
import { Streak } from "@/components/ui/streak";

type User = {
    id: number;
    pseudo: string;
    email: string;
    xp: number;
    level: number;
    streak: number;
    vip: {
        status: "active" | "cancelled" | "expired" | "custom";
        until: string | null;
        renewing: boolean;
        plan: "monthly" | "yearly" | "manual" | null;
    } | null;

    isActive: boolean;
    avatarUrl: string | null;
};

export default function AdminUsersPage() {
    const [users, setUsers] = useState<User[]>([]);
    const [search, setSearch] = useState("");
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [userToToggle, setUserToToggle] = useState<User | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [total, setTotal] = useState(0);
    const limit = 10;
    const [totalPages, setTotalPages] = useState(0);

    const renderPageButtons = () => {
        const buttons = [];
        const maxVisible = 7;

        if (totalPages <= maxVisible) {
            for (let i = 1; i <= totalPages; i++) {
                buttons.push(i);
            }
        } else {
            buttons.push(1);

            if (currentPage > 4) buttons.push("...");

            const start = Math.max(2, currentPage - 1);
            const end = Math.min(totalPages - 1, currentPage + 1);

            for (let i = start; i <= end; i++) {
                buttons.push(i);
            }

            if (currentPage < totalPages - 3) buttons.push("...");
            buttons.push(totalPages);
        }

        return buttons;
    };

    useEffect(() => {
        const fetchUsers = async () => {
            const res = await fetchClientWithAuth<{
                data: User[];
                meta: {
                    total: number;
                    page: number;
                    limit: number;
                    totalPages: number;
                };
            }>(
                `/api/admin/users?page=${currentPage}&limit=${limit}&search=${encodeURIComponent(
                    search
                )}`
            );

            if (!res.error && res.data) {
                // console.log("Utilisateurs récupérés :", res.data.data);
                setUsers(res.data.data);
                setTotal(res.data.meta.total);
                setTotalPages(res.data.meta.totalPages);
            } else {
                console.error("Erreur récupération utilisateurs :", res.error);
            }
        };

        fetchUsers();
    }, [currentPage, search]);

    const handleUpdate = async (formData: FormData) => {
        if (!selectedUser) return;

        const vipUntilRaw = formData.get("vipUntil") as string;
        const vipUntil = vipUntilRaw
            ? new Date(vipUntilRaw).toISOString()
            : null;

        const updated = {
            pseudo: formData.get("pseudo") as string,
            email: formData.get("email") as string,
            isVip: formData.get("vip") === "on",
            vipUntil,
        };

        const res = await fetchClientWithAuth(
            `/api/admin/users/${selectedUser.id}`,
            {
                method: "PATCH",
                body: JSON.stringify(updated),
            }
        );

        if (!res.error) {
            setSelectedUser(null);
            setUsers((prev) =>
                prev.map((u) =>
                    u.id === selectedUser.id ? { ...u, ...updated } : u
                )
            );
        }
    };

    const handleToggleActive = async () => {
        if (!userToToggle) return;

        const res = await fetchClientWithAuth(
            `/api/admin/users/${userToToggle.id}`,
            {
                method: "PATCH",
                body: JSON.stringify({ isActive: !userToToggle.isActive }),
            }
        );

        if (!res.error) {
            setUsers((prev) =>
                prev.map((u) =>
                    u.id === userToToggle.id
                        ? { ...u, isActive: !u.isActive }
                        : u
                )
            );
            setUserToToggle(null);
        } else {
            console.error("Erreur changement de statut :", res.error);
        }
    };

    return (
        <Card
            className="space-y-6"
            title="Gestion des utilisateurs"
            color="primary"
        >
            <div className="flex justify-end items-center mt-[-1rem] mb-4">
                <Input
                    placeholder="Rechercher par pseudo ou email"
                    value={search}
                    onChange={(e) => {
                        setSearch(e.target.value);
                        setCurrentPage(1);
                    }}
                    className="w-80"
                />
            </div>

            <div className="rounded overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-background text-muted-foreground text-left">
                        <tr>
                            <th className="px-4 py-2">Pseudo</th>
                            <th className="px-4 py-2">Email</th>
                            <th className="px-4 py-2">Niveau</th>
                            <th className="px-4 py-2">Streak</th>
                            <th className="px-4 py-2">VIP</th>
                            <th className="px-4 py-2">Statut</th>
                            <th className="px-4 py-2 text-right"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user) => (
                            <tr
                                key={user.id}
                                className="border-b last:border-none hover:bg-background transition-colors"
                            >
                                <td className="px-4 py-2 font-medium">
                                    <Link
                                        className="flex flex-nowrap gap-2 items-center"
                                        href={`/profil/${user.id}`}
                                    >
                                        <Image
                                            height={32}
                                            width={32}
                                            src={
                                                user.avatarUrl ||
                                                "/assets/default-avatar.webp"
                                            }
                                            alt={user.pseudo}
                                            className="w-6 h-6"
                                        />
                                        <span className="truncate font-semibold">
                                            {user.pseudo}
                                        </span>
                                    </Link>
                                </td>
                                <td className="px-4 py-2">{user.email}</td>
                                <td className="px-4 py-2 text-muted-foreground">
                                    <p className="flex items-center mb-0">
                                        <span className="text-sm ms-4">
                                            Niv.{" "}
                                        </span>
                                        <OutlineText
                                            color="black"
                                            text={String(user.level)}
                                            className="mt-0.5 me-1"
                                        />
                                        <span className="text-xs">
                                            ({user.xp} XP)
                                        </span>
                                    </p>
                                </td>
                                <td className="px-4 py-2">
                                    <p className="flex items-center mb-0 flex-nowrap">
                                        <Streak streak={user.streak} />
                                    </p>
                                </td>
                                <td className="px-4 py-2">
                                    {user.vip?.status === "active" ||
                                    user.vip?.status === "custom" ? (
                                        <Badge className="bg-yellow-400 text-black">
                                            VIP{" "}
                                            {user.vip.status === "custom"
                                                ? "(perso)"
                                                : ""}
                                        </Badge>
                                    ) : (
                                        <span className="text-muted-foreground">
                                            —
                                        </span>
                                    )}
                                </td>

                                <td className="px-4 py-2">
                                    {user.isActive ? (
                                        <Badge className="bg-green-100 text-green-800">
                                            Actif
                                        </Badge>
                                    ) : (
                                        <Badge className="bg-danger/20 text-danger">
                                            Désactivé
                                        </Badge>
                                    )}
                                </td>
                                <td className="px-4 py-2 text-right">
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button size="icon" variant="ghost">
                                                <MoreVertical className="w-4 h-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem
                                                onClick={() =>
                                                    setSelectedUser(user)
                                                }
                                            >
                                                Modifier
                                            </DropdownMenuItem>
                                            <DropdownMenuItem
                                                className="text-red-600"
                                                onClick={() =>
                                                    setUserToToggle(user)
                                                }
                                            >
                                                {user.isActive
                                                    ? "Désactiver"
                                                    : "Réactiver"}
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="flex justify-between items-center gap-4">
                <span className="text-sm text-muted-foreground">
                    {total} utilisateur{total > 1 ? "s" : ""} – Page{" "}
                    {currentPage} sur {totalPages}
                </span>

                <div className="flex items-center gap-1">
                    <Button
                        variant="outline-background"
                        size="sm"
                        disabled={currentPage === 1}
                        onClick={() => setCurrentPage((p) => p - 1)}
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </Button>

                    {renderPageButtons().map((page, i) =>
                        page === "..." ? (
                            <span
                                key={`ellipsis-${i}`}
                                className="px-2 text-muted-foreground text-sm"
                            >
                                <MoreHorizontal className="w-4 h-4" />
                            </span>
                        ) : (
                            <Button
                                key={page}
                                size="sm"
                                variant={
                                    page === currentPage
                                        ? "primary"
                                        : "outline-background"
                                }
                                onClick={() => setCurrentPage(page as number)}
                            >
                                {page}
                            </Button>
                        )
                    )}

                    <Button
                        variant="outline-background"
                        size="sm"
                        disabled={currentPage === totalPages}
                        onClick={() => setCurrentPage((p) => p + 1)}
                    >
                        <ChevronRight className="w-4 h-4" />
                    </Button>
                </div>
            </div>

            <Dialog
                open={!!selectedUser}
                onOpenChange={() => setSelectedUser(null)}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Modifier l’utilisateur</DialogTitle>
                    </DialogHeader>

                    <form action={handleUpdate} className="space-y-4">
                        <div>
                            <label
                                htmlFor="pseudo"
                                className="block font-medium"
                            >
                                Pseudo
                            </label>
                            <Input
                                id="pseudo"
                                name="pseudo"
                                defaultValue={selectedUser?.pseudo}
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="email"
                                className="block font-medium"
                            >
                                Email
                            </label>
                            <Input
                                id="email"
                                name="email"
                                defaultValue={selectedUser?.email}
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <label htmlFor="vip" className="font-medium">
                                VIP
                            </label>
                            <Switch
                                disabled={
                                    selectedUser?.vip?.plan != "manual"
                                        ? true
                                        : false
                                }
                                id="vip"
                                name="vip"
                                defaultChecked={
                                    selectedUser?.vip ? true : false
                                }
                            />
                        </div>
                        <div>
                            <label
                                htmlFor="vipUntil"
                                className="block font-medium"
                            >
                                VIP jusqu’au
                            </label>
                            <Input
                                disabled={
                                    selectedUser?.vip?.plan != "manual"
                                        ? true
                                        : false
                                }
                                id="vipUntil"
                                name="vipUntil"
                                type="date"
                                defaultValue={
                                    selectedUser?.vip?.status === "custom" &&
                                    selectedUser.vip.until
                                        ? selectedUser.vip.until.split("T")[0]
                                        : ""
                                }
                            />
                        </div>

                        <DialogFooter className="pt-4">
                            <Button
                                variant="secondary"
                                type="button"
                                onClick={() => setSelectedUser(null)}
                            >
                                Annuler
                            </Button>
                            <Button type="submit">Enregistrer</Button>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog>

            <Dialog
                open={!!userToToggle}
                onOpenChange={() => setUserToToggle(null)}
            >
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {userToToggle?.isActive
                                ? "Désactiver"
                                : "Réactiver"}{" "}
                            l’utilisateur
                        </DialogTitle>
                    </DialogHeader>
                    <p>
                        Es-tu sûr de vouloir{" "}
                        {userToToggle?.isActive ? "désactiver" : "réactiver"}{" "}
                        <strong>{userToToggle?.pseudo}</strong> ?
                    </p>
                    <DialogFooter className="pt-4">
                        <Button
                            variant="secondary"
                            onClick={() => setUserToToggle(null)}
                        >
                            Annuler
                        </Button>
                        <Button
                            variant={
                                userToToggle?.isActive ? "danger" : "primary"
                            }
                            onClick={handleToggleActive}
                        >
                            Confirmer
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </Card>
    );
}
