# 🕹️ DailyChallenge

DailyChallenge est une plateforme SaaS de jeux quotidiens construite avec une architecture microservices en NestJS, un frontend NextJS, et une base de données PostgreSQL partagée. Le tout est organisé dans un monorepo géré avec PNPM.

---

## 🧰 Prérequis

- Node.js 18+
- Docker + Docker Compose
- [PNPM](https://pnpm.io/installation) ()

```bash
npm i -g pnpm
```


---

## 📁 Structure du projet

```
dailychallenge/
├── app-frontend/             → Application frontend (NextJS)
├── backend/
│   ├── ms-gateway/           → Gateway NestJS (API HTTP)
│   ├── ms-users/             → Microservice utilisateurs
│   ├── ms-friends/           → Microservice amis
│   ├── ms-leaderboard/       → Microservice classement
│   └── ms-game-cinema-1/     → Microservice jeu cinéma
├── packages/
│   └── database/             → Prisma + gestion base de données
├── docker-compose-db.yml     → Docker Compose PostgreSQL
└── pnpm-workspace.yaml
```

---

## ⚙️ Installation et initialisation

Lance ce script pour tout configurer automatiquement :

```bash
pnpm run setup
```

Cela effectue les étapes suivantes :

1. Installation des dépendances avec PNPM
2. Démarrage de la base de données avec Docker
3. Génération du client Prisma
4. Compilation du package `database`
5. Application des migrations
6. Seed de la base de données (utilisateurs, avatars...)

---

## 🚀 Lancer l'application

### Frontend (NextJS)

```bash
pnpm run start:frontend
```

### Microservices (NestJS)

```bash
pnpm run start:services
```

### Arrêt des services (Windows)

```bash
pnpm run stop:services
```

---

## 🧪 Lancer les tests

### Tous les tests en parallèle

```bash
pnpm run test:all
```

### Tous les tests en série (évite les conflits DB)

```bash
pnpm run test:all2
```


## 📦 Infos complémentaires

- Tous les microservices utilisent **Prisma** et accèdent à **la même base PostgreSQL**.
- La communication entre microservices se fait en **TCP via NestJS**.
- Le frontend communique uniquement avec la **Gateway** (`ms-gateway`), qui relaie les requêtes vers les autres services.

---

## 🧼 En cas de souci

Si besoin de réinitialiser complètement la base :

```bash
pnpm run rebuild:db
pnpm run db:migrate
pnpm run db:seed
```

