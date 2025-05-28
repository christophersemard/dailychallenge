# ---------------------
# 1. Base : image avec PNPM
# ---------------------
FROM node:22-alpine AS base

WORKDIR /app
RUN apk add --no-cache libc6-compat curl
RUN npm install -g pnpm@latest

# ---------------------
# 2. Dépendances : install PNPM + node_modules
# ---------------------
FROM base AS deps

WORKDIR /app

COPY pnpm-lock.yaml ./
COPY pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY backend/ms-game-cinema-2/package.json ./package.json
COPY packages/database/package.json ./packages/database/package.json

RUN pnpm install --no-frozen-lockfile --recursive

# ---------------------
# 3. Prisma : génération du client
# ---------------------
FROM deps AS prisma

WORKDIR /app

COPY packages/database ./packages/database
WORKDIR /app/packages/database
RUN pnpm install --no-frozen-lockfile
RUN pnpm run db:generate

# ---------------------
# 4. Final : assemble le microservice
# ---------------------
FROM base AS final

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY --from=prisma /app/packages/database ./packages/database
COPY backend/ms-game-cinema-2/ .

EXPOSE 3005
CMD ["sh", "-c", "cd /app && pnpm run start:dev"]
