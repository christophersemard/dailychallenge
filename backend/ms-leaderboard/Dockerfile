# ---------------------
# CONFIGURATION VARIABLES 👇
# ---------------------
ARG SERVICE_NAME=ms-leaderboard
ARG SERVICE_PORT=3003

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
ARG SERVICE_NAME
WORKDIR /app

COPY pnpm-lock.yaml pnpm-workspace.yaml ./
COPY backend/${SERVICE_NAME}/package.json ./backend/${SERVICE_NAME}/package.json
COPY packages/database/package.json ./packages/database/package.json

RUN pnpm install --frozen-lockfile

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
ARG SERVICE_NAME
COPY packages/database ./packages/database
COPY backend/${SERVICE_NAME} ./backend/${SERVICE_NAME}
WORKDIR /app/backend/${SERVICE_NAME}
RUN pnpm run build

# ---------------------
# 5. Final image
# ---------------------
FROM base AS final
ARG SERVICE_NAME
ARG SERVICE_PORT
WORKDIR /app

# Copie node_modules globaux (gérés par pnpm en hoisting)
COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/pnpm-workspace.yaml ./pnpm-workspace.yaml
COPY --from=deps /app/package.json ./package.json

# Copie des fichiers spécifiques au service
COPY --from=build /app/backend/${SERVICE_NAME}/dist ./backend/${SERVICE_NAME}/dist
COPY --from=prisma /app/packages/database ./packages/database
COPY backend/${SERVICE_NAME}/package.json ./backend/${SERVICE_NAME}/package.json


WORKDIR /app/backend/${SERVICE_NAME}
EXPOSE ${SERVICE_PORT}

CMD ["pnpm", "run", "start:prod"]
