import FloatingBackgroundShapes from "@/components/layout/FloatingBackgroundShapes";


import PageTitle from "@/components/ui/page-title"
import PageSubtitle from "@/components/ui/page-subtitle"
import { Button } from "@/components/ui/button"
import CategoryCard from "@/components/ui/card"
import GameItem from "@/components/ui/game-item"

export default function Page() {
  return (<>
    <FloatingBackgroundShapes variant="yellow" />
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
        <Button variant="secondary" size={"lg"}>S’inscrire</Button>
        <Button variant="primary" size={"lg"}>Se connecter</Button>
      </div>

      {/* Grille des jeux */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full mt-6">
        <CategoryCard title="Cinéma" color="red">
          <div className="flex flex-col gap-4">
            <GameItem color="red" icon="🍿" title="JEU CINÉMA 1" description="Devine le titre du film grâce aux photos" />
            <GameItem color="red" icon="🎬" title="JEU CINÉMA 2" description="Devine le titre du film grâce aux photos" />
            <GameItem color="red" icon="❓" title="JEU CINÉMA 3" description="Devine le titre du film grâce aux photos" />
          </div>
        </CategoryCard>

        <CategoryCard title="Géographie" color="teal">
          <div className="flex flex-col gap-4">
            <GameItem color="teal" icon="🍿" title="JEU GÉO 1" description="Devine le titre du film grâce aux photos" />
            <GameItem color="teal" icon="🎬" title="JEU GÉO 2" description="Devine le titre du film grâce aux photos" />
            <GameItem color="teal" icon="❓" title="JEU GÉO 3" description="Devine le titre du film grâce aux photos" />
          </div>
        </CategoryCard>

        <CategoryCard title="Autres" color="blue">
          <div className="flex flex-col gap-4">
            <GameItem color="blue" icon="🍿" title="JEU AUTRE 1" description="Devine le titre du film grâce aux photos" />
            <GameItem color="blue" icon="🎬" title="JEU AUTRE 2" description="Devine le titre du film grâce aux photos" />
            <GameItem color="blue" icon="❓" title="JEU AUTRE 3" description="Devine le titre du film grâce aux photos" />
          </div>
        </CategoryCard>
      </div>
    </div></>
  )
}
