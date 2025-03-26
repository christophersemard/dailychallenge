import { Button } from "@/components/ui/button";
import { IconButton } from "@/components/ui/icon-button"
import { ArrowRight, Check, X, Pencil, Plus } from "lucide-react"

export default function Buttons() {
  return (
    <div className="min-h-screen bg-background p-6 md:p-10 space-y-10">
      <h1 className="text-3xl font-bold">🧪 Test des Boutons - DailyChallenge</h1>

      {/* Boutons textes seuls */}
      <section className="space-y-2">
        <h2 className="text-xl font-semibold">🎨 Variantes (texte seul)</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <Button variant="primary">primary</Button>
          <Button variant="secondary">secondary</Button>
          <Button variant="success">success</Button>
          <Button variant="danger">danger</Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <Button variant="outline-primary">outline</Button>
          <Button variant="outline-secondary">outline</Button>
          <Button variant="outline-success">outline</Button>
          <Button variant="outline-danger">outline</Button>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <Button variant="ghost">ghost</Button>
          <Button variant="subtle">subtle</Button>
          <Button variant="link">link</Button>
        </div>
      </section >

      {/* Boutons avec icône + texte */}
      < section className="space-y-2" >
        <h2 className="text-xl font-semibold">🧭 Boutons avec icône + texte</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Button variant="primary" size="lg">
            Se connecter <ArrowRight className="ml-1" />
          </Button>
          <Button variant="secondary" size="lg">
            S’inscrire <ArrowRight className="ml-1" />
          </Button>
          <Button variant="success">
            Valider <Check />
          </Button>
          <Button variant="danger">
            Annuler <X />
          </Button>
        </div>
      </section >

      {/* Icon buttons bien carrés */}
      < section className="space-y-2" >
        <h2 className="text-xl font-semibold">🔲 IconButton (carrés)</h2>
        <div className="grid grid-cols-4 md:grid-cols-6 gap-4 items-center">
          <IconButton icon={<Check />} variant="success" size="xs" />
          <IconButton icon={<X />} variant="danger" size="xs" />
          <IconButton icon={<Pencil />} variant="secondary" size="xs" />
          <IconButton icon={<Plus />} variant="primary" size="xs" />

          <IconButton icon={<Check />} variant="success" size="sm" />
          <IconButton icon={<X />} variant="danger" size="sm" />
          <IconButton icon={<Pencil />} variant="secondary" size="sm" />
          <IconButton icon={<Plus />} variant="primary" size="sm" />

          <IconButton icon={<Check />} variant="success" />
          <IconButton icon={<X />} variant="danger" />
          <IconButton icon={<Pencil />} variant="secondary" />
          <IconButton icon={<Plus />} variant="primary" />

          <IconButton icon={<Check />} variant="success" size="lg" />
          <IconButton icon={<X />} variant="danger" size="lg" />
          <IconButton icon={<Pencil />} variant="secondary" size="lg" />
          <IconButton icon={<Plus />} variant="primary" size="lg" />
        </div>
      </section >

      {/* Tailles texte */}
      < section className="space-y-2" >
        <h2 className="text-xl font-semibold">📏 Tailles classiques (texte)</h2>
        <div className="grid grid-cols-4 gap-4">
          <Button size="xs">xs</Button>
          <Button size="sm">sm</Button>
          <Button size="default">default</Button>
          <Button size="lg">lg</Button>
        </div>
      </section >
    </div >
  )
}
