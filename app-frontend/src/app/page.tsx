import FloatingBackgroundShapes from "@/components/layout/FloatingBackgroundShapes";


import PageTitle from "@/components/ui/page-title"
import PageSubtitle from "@/components/ui/page-subtitle"
import { Button } from "@/components/ui/button"
import CategoryCard from "@/components/ui/card"
import GameItem from "@/components/ui/game-item"
import Link from "next/link"


type Game = {
  name: string
  description: string
  url: string
  icon: string
  status: "available" | "coming-soon"
}

type GameCategory = {
  name: string
  color: "primary" | "secondary" | "success" | "danger" | "teal" | "red" | "purple" | "yellow" | "green" | "blue" | "pink" | "orange"
  games: Game[]
}
const games: GameCategory[] = [
  {
    name: "Cinéma",
    color: "red",
    games: [{
      name: "Jeu 1",
      description: "Trouve le film grâce aux indices",
      url: "/jeu/cinema-1",
      icon: "🍿",
      status: "available"
    },
    {
      name: "Jeu 2",
      description: "Trouve le film grâce aux photos",
      url: "/jeu/cinema-2",
      icon: "🎞️",
      status: "coming-soon"
    },
    {
      name: "Jeu 3",
      description: "Trouve le film grâce aux acteurs",
      url: "/jeu/cinema-3",
      icon: "🎬",
      status: "coming-soon"
    }]
  },
  {
    name: "Géographie",
    color: "teal",
    games: [{
      name: "Jeu 1",
      description: "Trouve le pays grâce aux indices",
      url: "/jeu/geographie-1",
      icon: "🗺️",
      status: "coming-soon"
    },
    {
      name: "Jeu 2",
      description: "Trouve la capitale grâce aux photos",
      url: "/jeu/geographie-2",
      icon: "🏙️",
      status: "coming-soon"
    },
    {
      name: "Jeu 3",
      description: "Trouve le pays grâce aux drapeaux",
      url: "/jeu/geographie-3",
      icon: "🏳️",
      status: "coming-soon"
    }]
  },
  {
    name: "Autres",
    color: "blue",
    games: [{
      name: "Jeu 1",
      description: "Jeu de société classique",
      url: "/jeu/autres-1",
      icon: "🎲",
      status: "coming-soon"
    },
    {
      name: "Jeu 2",
      description: "Jeu de société moderne",
      url: "/jeu/autres-2",
      icon: "♟️",
      status: "coming-soon"
    },
    {
      name: "Jeu 3",
      description: "Jeu de société coopératif",
      url: "/jeu/autres-3",
      icon: "🤝",
      status: "coming-soon"
    }]
  }


]

export default function Page() {
  return (<>
    <FloatingBackgroundShapes variant="yellow" />

    <div className="w-full">

      <div className="flex flex-col items-center text-center">


        <PageTitle>
          Tous vos jeux quotidiens à portée de main !
        </PageTitle>
        <PageSubtitle>
          Tous vos jeux quotidiens à portée de main ! quotidiens à portée de main quotidiens à portée de main
        </PageSubtitle>

        <p className="font-semibold mb-6">
          Rejoins dès maintenant la communauté pour des avantages exclusifs
        </p>

        <div className="flex flex-wrap justify-center gap-3 mb-10">
          <Button variant="secondary" size={"lg"} asChild>
            <Link href="/inscription">S’inscrire</Link>
          </Button>
          <Button variant="primary" size={"lg"} asChild>
            <Link href="/connexion">Se connecter</Link>
          </Button>

        </div>

        {/* Grille des jeux */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-6">

          {
            games.map((category) => (
              <CategoryCard key={category.name} title={category.name} color={category.color}>
                <div className="flex flex-col gap-4">
                  {category.games.map((game) => (
                    <GameItem key={game.name} color={category.color} icon={game.icon} title={game.name} description={game.description} url={game.url} status={game.status} />
                  ))}
                </div>
              </CategoryCard>
            ))
          }

        </div>
      </div >
    </div></>
  )
}
