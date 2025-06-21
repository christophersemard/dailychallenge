# ---------------------
# 1. Base : image avec PNPM
# ---------------------
FROM node:22-alpine AS base

WORKDIR /app
RUN apk add --no-cache libc6-compat curl
RUN npm install -g pnpm@latest

# ---------------------
# 2. Dépendances
# ---------------------
FROM base AS deps

WORKDIR /app

COPY pnpm-lock.yaml ./pnpm-lock.yaml
COPY pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY backend/ms-gateway/package.json ./backend/ms-gateway/package.json
COPY packages/database/package.json ./packages/database/package.json

# Important : copier tous les package.json pour respecter la structure du monorepo
RUN pnpm install --no-frozen-lockfile

# ---------------------
# 3. Prisma
# ---------------------
FROM deps AS prisma

WORKDIR /app
COPY packages/database ./packages/database
WORKDIR /app/packages/database
RUN pnpm run db:generate

# ---------------------
# 4. Final
# ---------------------
FROM base AS final

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/backend/ms-gateway/node_modules ./backend/ms-gateway/node_modules
COPY --from=prisma /app/packages/database ./packages/database
COPY backend/ms-gateway ./backend/ms-gateway

WORKDIR /app/backend/ms-gateway
EXPOSE 3000

CMD ["pnpm", "run", "start:dev"]
