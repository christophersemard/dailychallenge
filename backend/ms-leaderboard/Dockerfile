# Utiliser une image Node.js légère
FROM node:20-alpine

# Définir le répertoire de travail
WORKDIR /app

# Installer les dépendances système
RUN apk add --no-cache libc6-compat curl

# Copier les fichiers PNPM et package.json
COPY pnpm-lock.yaml ./pnpm-lock.yaml
COPY backend/ms-leaderboard/package.json ./package.json
COPY packages/database ./packages/database

# Installer PNPM via NPM
RUN npm install -g pnpm@latest

# Installer les dépendances
RUN pnpm install --no-frozen-lockfile --recursive

# Copier le reste du code du microservice
COPY backend/ms-leaderboard/ .

# Exposer le port du microservice
EXPOSE 3003

# Démarrer le service NestJS
CMD ["pnpm", "run", "start:dev"]
