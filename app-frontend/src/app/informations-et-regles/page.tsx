"use client"

import PageTitle from "@/components/ui/page-title"
import PageSubtitle from "@/components/ui/page-subtitle"
import Card from "@/components/ui/card"
import FloatingBackgroundShapes from "@/components/layout/FloatingBackgroundShapes"

export default function InformationsEtRegles() {
    return (
        <div className=" mx-auto py-6 flex flex-col gap-8">
            <FloatingBackgroundShapes variant="yellow" />
            <div>
                <PageTitle>Informations & Règles</PageTitle>
                <PageSubtitle>
                    Tout ce que tu dois savoir pour bien commencer ton aventure sur DailyChallenge !
                </PageSubtitle></div>

            <Card title="📌 Le principe de DailyChallenge" color="primary">
                <p>
                    DailyChallenge est une plateforme de jeux quotidiens autour de plusieurs thèmes :
                    <strong> cinéma, géographie</strong> et bien d&apos;autres à venir !
                </p>
                <p className="mt-2">
                    Chaque jour, de nouveaux défis sont disponibles. Plus tu joues, plus tu gagnes de points,
                    d&apos;expérience et tu améliores ton classement général ou par jeu.
                </p>
            </Card>

            <Card title="⭐ Gagner des points et de l'expérience" color="secondary">
                <ul className="list-disc pl-5 space-y-1">
                    <li>✅ Tu gagnes des <strong>points</strong> si tu réussis un jeu.</li>
                    <li>🧠 Tu gagnes de l’<strong>expérience (XP)</strong> à chaque participation.</li>
                    <li>🎯 Plus tu trouves la réponse en peu d’essais, plus tu marques de points.</li>
                    <li>⚡ Si tu joues le jour-même, tu gagnes l’XP complète. Sinon, tu gagnes seulement la moitié.</li>
                    <li>🔥 Ta <strong>streak</strong> (participation quotidienne) augmente ton XP à long terme.</li>
                </ul>
            </Card>

            <Card title="🎬 Les jeux Cinéma" color="red">
                <h4 className="font-bold mb-1">🎥 IndiCiné – Trouver le film via des indices</h4>
                <ul className="list-disc pl-5 mb-4 space-y-1">
                    <li>Un film par jour à deviner.</li>
                    <li>Tu reçois des indices à chaque mauvaise réponse (genres, date, durée, réalisateur...)</li>
                    <li>Tu as un nombre d’essais limité.</li>
                    <li>Tu gagnes plus de points si tu trouves rapidement.</li>
                </ul>

                <h4 className="font-bold mb-1">🖼️ Cinéma 2 – Trouver le film avec des images</h4>
                <p>À venir prochainement</p>

                <h4 className="font-bold mb-1">👤 Cinéma 3 – Trouver le film à partir des acteurs</h4>
                <p>À venir prochainement</p>
            </Card>

            <Card title="🌍 Les jeux Géographie" color="teal">
                <h4 className="font-bold mb-1">🗺️ Géographie 1 – Deviner le pays par indices</h4>
                <ul className="list-disc pl-5 mb-4 space-y-1">
                    <li>Indices : population, continent, langue, capitale…</li>
                    <li>Révélés progressivement si tu te trompes.</li>
                </ul>

                <h4 className="font-bold mb-1">📷 Géographie 2 – Deviner via des photos</h4>
                <p>Tu débloques des images du pays à chaque essai (paysage, ville, carte...)</p>

                <h4 className="font-bold mb-1">🏙️ Géographie 3 – Deviner la ville</h4>
                <p>À venir prochainement</p>
            </Card>

            <Card title="🧠 Les jeux Autres" color="blue">
                <h4 className="font-bold mb-1">🔤 Autres 1 – Deviner le mot</h4>
                <p>À venir prochainement</p>

                <h4 className="font-bold mb-1">🔢 Autres 2 – Deviner le nombre</h4>
                <p>À venir prochainement</p>

                <h4 className="font-bold mb-1">🎵 Autres 3 – Deviner la chanson</h4>
                <p>À venir prochainement</p>
            </Card>


            <Card title="👑 Mode VIP" color="purple">
                <ul className="list-disc pl-5 space-y-1">
                    <li>🔓 Accès aux jeux des jours précédents</li>
                    <li>💡 Indices bonus dans certains jeux</li>
                    <li>🎨 Cosmétiques exclusifs pour ton avatar</li>
                    {/* <li>📊 Statistiques détaillées et comparaisons entre amis</li> */}
                    <li>💰 Seulement 1 à 2€/mois pour soutenir la plateforme !</li>
                </ul>
            </Card>

            <Card title="⚠️ Rappels importants" color="orange">
                <ul className="list-disc pl-5 space-y-1">
                    <li>🕐 Tu ne peux jouer qu&apos;une fois par jour et par jeu (sauf VIP).</li>
                    <li>🚫 Tu ne peux pas rejouer un jeu déjà gagné ou perdu.</li>
                    <li>👥 Les classements sont mis à jour en temps réel.</li>
                </ul>
            </Card>
        </div>
    )
}
