# Utiliser une image Node.js légère
FROM node:20-alpine AS base

# Définir le répertoire de travail
WORKDIR /app

# Installer les dépendances système
RUN apk add --no-cache libc6-compat curl

# Installer PNPM via NPM
RUN npm install -g pnpm@latest

# Étape de build pour gérer le cache des dépendances
FROM base AS deps

WORKDIR /app

# Copier uniquement les fichiers essentiels pour le cache de pnpm
COPY pnpm-lock.yaml ./
COPY backend/ms-users/package.json ./package.json
COPY packages/database/package.json ./packages/database/package.json

# Installer les dépendances sans exécuter de scripts inutiles
RUN pnpm install --no-frozen-lockfile --recursive

# Étape pour générer Prisma (seulement si le schéma change)
FROM base AS prisma

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY packages/database ./packages/database
RUN pnpm prisma generate --schema=packages/database/prisma/schema.prisma

# Étape finale
FROM base AS final

WORKDIR /app

# Copier les fichiers du projet
COPY --from=deps /app/node_modules ./node_modules
COPY --from=prisma /app/packages/database ./packages/database
COPY backend/ms-users/ .

# Exposer le port
EXPOSE 3001

# Lancer l'application
CMD ["sh", "-c", "pnpm run start:dev"]
