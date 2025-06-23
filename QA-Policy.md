# QA Policy - DailyChallenge

---

## Objectifs

- Assurer une qualité de code homogène sur tout le monorepo.
- Fiabiliser les microservices grâce à des tests systématiques.
- Empêcher l’introduction de régressions fonctionnelles.
- Simplifier le debug grâce à des logs et erreurs clairs.

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

## QA & Reporting

| Fréquence      | Action                              |
|----------------|-------------------------------------|
| À chaque PR    | Linter + tests doivent passer       |
| Chaque semaine | Revue des bugs ouverts              |
| Chaque mois    | Revue couverture + dette technique  |

- Couverture cible : **80%+**

---

## Checklist avant merge

- [ ] Linter ✅
- [ ] Tests ✅
- [ ] Pas de `console.log`
- [ ] Code lisible et cohérent
