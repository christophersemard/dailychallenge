import Link from "next/link";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

const links = [
    { href: "/admin", label: "Dashboard" },
    { href: "/admin/jeux", label: "Jeux" },
    { href: "/admin/utilisateurs", label: "Utilisateurs" },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex gap-8 p-4 sm:p-8">
            {/* Sidebar sticky */}
            <aside className="sticky top-[88px] self-start w-64 bg-white  rounded p-4">
                <h2 className="text-lg font-semibold mb-4">Admin</h2>
                <nav className="flex flex-col gap-2">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "text-sm px-3 py-2 rounded transition-colors hover:bg-accent hover:text-accent-foreground"
                            )}
                        >
                            {link.label}
                        </Link>
                    ))}
                </nav>
            </aside>

            {/* Contenu principal */}
            <main className="flex-1">{children}</main>
        </div>
    );
}
