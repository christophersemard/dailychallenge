# ---------------------
# CONFIGURATION VARIABLES 👇
# ---------------------
ARG SERVICE_NAME=ms-gateway
ARG SERVICE_PORT=3000

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


COPY --from=deps /app/node_modules ./node_modules
COPY --from=deps /app/backend/${SERVICE_NAME}/node_modules ./backend/${SERVICE_NAME}/node_modules
COPY --from=prisma /app/packages/database ./packages/database
COPY --from=build /app/backend/${SERVICE_NAME}/dist ./backend/${SERVICE_NAME}/dist
COPY backend/${SERVICE_NAME}/package.json ./backend/${SERVICE_NAME}/package.json

COPY backend/${SERVICE_NAME}/src/avatar/assets ./backend/${SERVICE_NAME}/dist/avatar/assets

WORKDIR /app/backend/${SERVICE_NAME}
EXPOSE ${SERVICE_PORT}

CMD ["pnpm", "run", "start:prod"]
