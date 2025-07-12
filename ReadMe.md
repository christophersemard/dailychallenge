# 🕹️ DailyChallenge

DailyChallenge est une plateforme SaaS de jeux quotidiens construite avec une architecture microservices en NestJS, un frontend NextJS, et une base de données PostgreSQL partagée. Le tout est organisé dans un monorepo géré avec PNPM.

---

## 🧰 Prérequis

- Node.js 18+
- Docker + Docker Compose
- [PNPM](https://pnpm.io/installation)

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
│   └── ms-game-cinema-1/     → Microservice jeu cinéma 1
│   └── ms-game-cinema-2/     → Microservice jeu cinéma 2
│   └── ms-game-music-1/      → Microservice jeu musique 1
├── packages/
│   └── database/             → Prisma + gestion base de données
└── pnpm-workspace.yaml
```

---

## ⚙️ Installation et initialisation

Lancer ce script pour installer toutes les dépendances :

```bash
pnpm install
```

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


## 📦 Infos complémentaires

- Tous les microservices utilisent **Prisma** et accèdent à **la même base PostgreSQL**.
- La communication entre microservices se fait en **TCP via NestJS**.
- Le frontend communique uniquement avec la **Gateway** (`ms-gateway`), qui relaie les requêtes vers les autres services.


