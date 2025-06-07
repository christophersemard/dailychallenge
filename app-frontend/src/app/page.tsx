// app/page.tsx
import FloatingBackgroundShapes from "@/components/layout/FloatingBackgroundShapes";
import PageTitle from "@/components/ui/page-title";
import PageSubtitle from "@/components/ui/page-subtitle";
import { Button } from "@/components/ui/button";
import CategoryCard from "@/components/ui/card";
import GameItem from "@/components/ui/game-item";
import Link from "next/link";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { fetchServerAction } from "@/app/actions/fetch-proxy";
import { Color } from "@/types/colors.types";
import { GameCategory } from "@/types/game.types";


export default async function Page() {
    const session = await getServerSession(authOptions);

    const { data: categories, error } = await fetchServerAction<GameCategory[]>(
        "/api/leaderboard/games-and-categories"
    );

    if (error || !categories) {
        return (
            <div className="text-center py-12 text-muted-foreground">
                Une erreur est survenue lors du chargement des jeux.
            </div>
        );
    }

    // Filtrage des catégories ayant au moins un jeu visible
    const visibleCategories = categories.filter((category) =>
        category.games.some(
            (game) => game.status === "available" || game.status === "coming_soon"
        )
    );

    const count = visibleCategories.length;

    let gridClass = "grid grid-cols-1 gap-8 w-full mt-6";
    if (count === 2) gridClass = "grid grid-cols-1 md:grid-cols-2 gap-8 w-full mt-6 max-w-4xl";
    else if (count > 2 && count % 2 === 0) gridClass = "grid grid-cols-1 md:grid-cols-4 gap-8 w-full mt-6";
    else if (count > 1) gridClass = "grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-6";
    else if (count === 1) gridClass = "flex justify-center w-full mt-6"; // centré

    return (
        <>
            <FloatingBackgroundShapes variant="yellow" />

            <div className="w-full py-6">
                <div className="flex flex-col items-center text-center">
                    <PageTitle>
                        Défie-toi et tes amis chaque jour avec nos jeux uniques !
                    </PageTitle>

                    <PageSubtitle>
                        Cinéma, géographie, culture générale... Un nouveau challenge
                        t’attend chaque jour pour tester tes connaissances et grimper
                        dans les classements !
                    </PageSubtitle>

                    {!session && (
                        <p className="font-semibold mb-6">
                            Rejoins la communauté dès maintenant pour débloquer des
                            récompenses exclusives, suivre ta progression et affronter
                            tes amis !
                        </p>
                    )}

                    {!session ? (
                        <div className="flex flex-wrap justify-center gap-3 mb-10">
                            <Button variant="secondary" size={"lg"} asChild>
                                <Link href="/inscription">S’inscrire</Link>
                            </Button>
                            <Button variant="primary" size={"lg"} asChild>
                                <Link href="/connexion">Se connecter</Link>
                            </Button>
                        </div>
                    ) : (
                        <div className="flex flex-wrap justify-center gap-3 mb-10">
                            <Button variant="secondary" size={"lg"} asChild>
                                <Link href="/mon-profil">Voir mon profil</Link>
                            </Button>
                            <Button variant="primary" size={"lg"} asChild>
                                <Link href="/mon-compte">Gérer mon compte</Link>
                            </Button>
                        </div>
                    )}

                    <h2 className="text-2xl font-bold text-foreground mb-6">
                        Nos jeux disponibles en ce moment
                    </h2>

                    {/* Grille dynamique des jeux par catégorie */}
                    <div className={gridClass}>
                        {visibleCategories.map((category) => (
                            <CategoryCard
                                key={category.id}
                                title={category.name}
                                color={category.color as Color}
                            >
                                <div className="flex flex-col gap-4">
                                    {category.games.map((game) => {
                                        if (
                                            game.status !== "available" &&
                                            game.status !== "coming_soon"
                                        ) return null;

                                        return (
                                            <GameItem
                                                key={game.id}
                                                color={category.color as Color}
                                                icon={game.imgUrl}
                                                title={game.name}
                                                description={game.description}
                                                url={`/jeu/${game.path}`}
                                                status={game.status as "available" | "coming_soon"}
                                            />
                                        );
                                    })}
                                </div>
                            </CategoryCard>
                        ))}
                    </div>

                </div>
            </div>
        </>
    );
}
