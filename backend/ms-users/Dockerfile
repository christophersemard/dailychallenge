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
COPY backend/ms-users/package.json ./backend/ms-users/package.json
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
COPY --from=deps /app/backend/ms-users/node_modules ./backend/ms-users/node_modules
COPY --from=prisma /app/packages/database ./packages/database
COPY backend/ms-users ./backend/ms-users

WORKDIR /app/backend/ms-users
EXPOSE 3001

CMD ["pnpm", "run", "start:dev"]
