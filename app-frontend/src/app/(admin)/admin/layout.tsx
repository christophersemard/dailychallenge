import Link from "next/link";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";
import Card from "@/components/ui/card";
import { Home, Gamepad, Users, BarChart, Settings } from "lucide-react";

const links = [
    { href: "/admin", label: "Dashboard", icon: <Home className="w-4 h-4 mr-2" /> },
    { href: "/admin/jeux", label: "Jeux", icon: <Gamepad className="w-4 h-4 mr-2" /> },
    { href: "/admin/utilisateurs", label: "Utilisateurs", icon: <Users className="w-4 h-4 mr-2" /> },
    // Ajouter un lien vers les statistiques et configurations mais desactiver pour l'instant
    { href: "/admin/statistiques", label: "Statistiques", icon: <BarChart className="w-4 h-4 mr-2" />, disabled: true },
    { href: "/admin/configurations", label: "Configurations", icon: <Settings className="w-4 h-4 mr-2" />, disabled: true },
];

export default function AdminLayout({ children }: { children: ReactNode }) {
    return (
        <div className="flex gap-8 p-4 sm:p-8">
            {/* Sidebar sticky */}
            <Card title="" color="primary" className="sticky top-0 !mt-6 self-start w-64 bg-white !m-0  ">
                <h2 className="text-lg font-semibold mb-4">Admin</h2>
                <nav className="flex flex-col gap-2">
                    {links.map((link) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "text-sm px-3 py-2 rounded font-medium transition-colors hover:bg-accent hover:text-accent-foreground"
                            )}
                            aria-disabled={link.disabled}
                            style={{ pointerEvents: link.disabled ? "none" : "auto", opacity: link.disabled ? 0.6 : 1 }}
                        >
                            <div className="flex items-center">
                                {link.icon}
                                {link.label}
                            </div>
                        </Link>
                    ))}
                </nav>
            </Card>

            {/* Contenu principal */}
            <main className="flex-1">{children}</main>
        </div>
    );
}
