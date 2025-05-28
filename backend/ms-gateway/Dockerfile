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
COPY backend/ms-gateway/package.json ./package.json

RUN pnpm install --no-frozen-lockfile --recursive

# ---------------------
# 3. Final : assemble le microservice
# ---------------------
FROM base AS final

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY backend/ms-gateway/ .

EXPOSE 3000
CMD ["sh", "-c", "cd /app && pnpm run start:dev"]
