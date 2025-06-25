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
COPY backend/ms-friends/package.json ./backend/ms-friends/package.json
COPY packages/database/package.json ./packages/database/package.json

RUN pnpm install --filter ms-friends... --frozen-lockfile

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
COPY backend/ms-friends ./backend/ms-friends
WORKDIR /app/backend/ms-friends
RUN pnpm run build

# ---------------------
# 5. Final image
# ---------------------
FROM base AS final

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/backend/ms-friends/node_modules ./backend/ms-friends/node_modules
COPY --from=prisma /app/packages/database ./packages/database
COPY --from=build /app/backend/ms-friends/dist ./backend/ms-friends/dist
COPY backend/ms-friends/package.json ./backend/ms-friends/package.json

WORKDIR /app/backend/ms-friends
EXPOSE 3002

CMD ["pnpm", "run", "start:prod"]
