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

COPY pnpm-lock.yaml pnpm-workspace.yaml ./
COPY backend/ms-game-cinema-2/package.json ./backend/ms-game-cinema-2/package.json
COPY packages/database/package.json ./packages/database/package.json

RUN pnpm install --filter ms-game-cinema-2... --frozen-lockfile

# ---------------------
# 3. Prisma
# ---------------------
FROM deps AS prisma

COPY packages/database ./packages/database
WORKDIR /app/packages/database
RUN pnpm run db:generate

# ---------------------
# 4. Build (NestJS)
# ---------------------
FROM deps AS build

COPY packages/database ./packages/database
COPY backend/ms-game-cinema-2 ./backend/ms-game-cinema-2
WORKDIR /app/backend/ms-game-cinema-2
RUN pnpm run build

# ---------------------
# 5. Final image
# ---------------------
FROM base AS final

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/backend/ms-game-cinema-2/node_modules ./backend/ms-game-cinema-2/node_modules
COPY --from=prisma /app/packages/database ./packages/database
COPY --from=build /app/backend/ms-game-cinema-2/dist ./backend/ms-game-cinema-2/dist
COPY backend/ms-game-cinema-2/package.json ./backend/ms-game-cinema-2/package.json

WORKDIR /app/backend/ms-game-cinema-2
EXPOSE 3005

CMD ["pnpm", "run", "start:prod"]
