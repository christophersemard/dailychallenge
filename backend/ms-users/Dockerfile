# ---------------------
# CONFIGURATION VARIABLES 👇
# ---------------------
ARG SERVICE_NAME=ms-users
ARG SERVICE_PORT=3001

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


RUN pnpm install --no-frozen-lockfile --recursive

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
COPY --from=deps /app/backend/${SERVICE_NAME}/node_modules ./backend/${SERVICE_NAME}/node_modules
COPY --from=prisma /app/packages/database ./packages/database

# Copie du dist (après build)
COPY --from=build /app/backend/${SERVICE_NAME}/dist ./backend/${SERVICE_NAME}/dist

# Copie des sources nécessaires
COPY backend/${SERVICE_NAME}/package.json ./backend/${SERVICE_NAME}/package.json
COPY backend/${SERVICE_NAME}/src/avatar/assets ./backend/${SERVICE_NAME}/src/avatar/assets

# Copie manuelle des assets dans le dist
RUN mkdir -p ./backend/${SERVICE_NAME}/dist/avatar/assets && \
  cp -r ./backend/${SERVICE_NAME}/src/avatar/assets/* ./backend/${SERVICE_NAME}/dist/avatar/assets/

CMD ["pnpm", "run", "start:prod"]
