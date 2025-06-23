# QA Policy - DailyChallenge

---

## Objectifs

- Assurer une qualité de code homogène sur tout le monorepo.
- Fiabiliser les microservices grâce à des tests systématiques.
- Empêcher l’introduction de régressions fonctionnelles.
- Simplifier le debug grâce à des logs et erreurs clairs.

---

### Stack technique

- **Frontend** : Next.js + Tailwind + ShadCN
- **Backend** : Monorepo NestJS (gateway + microservices TCP)
- **Base de données** : PostgreSQL (accès via Prisma)
- **Authentification** : JWT (via NextAuth côté frontend)
- **Communication inter-services** : TCP (NestJS Microservices)
- **Gestion des types partagés** : packages/
- **Conteneurisation** : Docker (images Alpine, Docker Compose)
- **Tests** : Jest (unitaires et intégration), Cypress (E2E)

Le projet utilise une approche modulaire et typée avec des **microservices NestJS** organisés autour de domaines métier spécifiques (utilisateurs, amis, jeux, classements...).

---

## Tests attendus

Chaque microservice NestJS doit contenir les tests suivants :

| Type         | Outil   | Où ?         | Obligatoire |
|--------------|---------|--------------|-------------|
| Unitaire     | Jest    | `*.spec.ts`  | ✅           |
| Intégration  | Jest    | `*.spec.ts`  | ✅           |

Pour le frontend :

| Type         | Outil   | Où ?         | Obligatoire |
|--------------|---------|--------------|-------------|
| E2E frontend | Cypress | `/cypress`   | 🚧 à venir   |

---

## Règles de qualité

- Utilisation stricte de TypeScript (`strict: true`).
- Zéro `any` non justifié (`@typescript-eslint/no-unsafe-*`).
- Formatage automatique via **Prettier**.
- Linter actif via **ESLint** (config souple mais cohérente).
- Fichiers `.spec.ts` obligatoires pour chaque module métier.
- Documenter les routes via **Swagger**
- Logger centralisé (`LoggerService`)

---

## Sécurité & stabilité

- Toutes les routes critiques sont protégées par `JwtAuthGuard`.
- Tous les appels RPC doivent passer par `RpcExceptionHandlerService`.
- Utilisation obligatoire de `DTO` + `class-validator` pour les entrées.
- Soft delete systématique sur les entités (`deletedAt`).

---

## Bonnes pratiques de debug

Utiliser LoggerService centralisé (log(), warn(), error()).

Ne jamais masquer une erreur sans la logger.

Retourner des erreurs typées (BadRequestException, ConflictException, etc).

---

# KPI Qualité - DailyChallenge

Ces indicateurs permettent de suivre la qualité logicielle du projet dans le temps et de prioriser les actions correctives.

---

## Tests

| Indicateur                          | Objectif         | État            |
|-------------------------------------|------------------|------------------|
| % couverture globale (Jest)         | ≥ 80%            | À mesurer        |
| % de microservices avec tests OK    | 100%             | À suivre         |
| Présence de tests E2E (Cypress)     | Oui (2025 Q3)    | 🚧 non démarré   |
| Temps moyen d’exécution des tests   | < 5s/unit        | À mesurer        |

---

## Bugs

| Indicateur                          | Objectif         | État            |
|-------------------------------------|------------------|------------------|
| Nombre de bugs bloquants ouverts    | 0                | À suivre         |
| Taux de régression en production    | < 5%             | À suivre         |
| Temps moyen de correction d’un bug  | < 3 jours        | À estimer        |

---

## Code & Structure

| Indicateur                             | Objectif         | État            |
|----------------------------------------|------------------|------------------|
| Respect des conventions (linter)       | 100%             | 🔄 vérifié à chaque PR |
| Zéro `any` non justifié                | 0                | À valider        |
| Nombre de `console.log` détectés       | 0                | À nettoyer       |
| Soft delete présent sur tous les modèles | Oui             | En cours         |

---

## Suivi de QA

| Fréquence       | Action                            |
|-----------------|------------------------------------|
| Hebdomadaire    | Scan bugs + anomalies             |
| Mensuel         | Rapport couverture + dettes       |
| Trimestriel     | Revue globale qualité              |

---

## Outils associés

- ✅ `pnpm lint` : Vérifie la qualité de code
- ✅ `pnpm test` : Lance les tests Jest
- 🔜 `pnpm test:e2e` : (Cypress en prévision)