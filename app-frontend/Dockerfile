# Étape 1 — Build
FROM node:22-alpine AS builder

WORKDIR /app

# Copie uniquement les fichiers nécessaires au build
COPY package.json pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./
COPY /app-frontend ./app-frontend
COPY packages ./packages

RUN npm install -g pnpm && pnpm install --no-frozen-lockfile

# Build de l'app Next.js
RUN pnpm --filter app-frontend... build


# ----------------------
# Étape 2 — Runtime
# ----------------------
FROM node:22-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production

# Re-copie minimale pour exécuter en prod
COPY --from=builder /app/app-frontend/public ./public
COPY --from=builder /app/app-frontend/.next ./.next
COPY --from=builder /app/app-frontend/package.json ./package.json
COPY --from=builder /app/app-frontend/next.config.ts ./next.config.ts
COPY --from=builder /app/packages ./packages
COPY --from=builder /app/node_modules ./node_modules

EXPOSE 3025

# Lancer l'application Next
CMD ["pnpm", "--filter", "app-frontend", "start"]
