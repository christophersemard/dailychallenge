# syntax=docker/dockerfile:1

FROM node:22-alpine AS base
WORKDIR /app
RUN apk add --no-cache libc6-compat && npm install -g pnpm

# Dépendances
FROM base AS deps
WORKDIR /app
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
COPY app-frontend ./app-frontend
COPY packages ./packages
RUN pnpm install --filter app-frontend...

# Build
FROM base AS builder
WORKDIR /app

ARG NEXT_PUBLIC_API_URL
ENV NEXT_PUBLIC_API_URL=$NEXT_PUBLIC_API_URL

COPY --from=deps /app ./
RUN pnpm --filter app-frontend... build

# Runner
FROM node:22-alpine AS runner
ENV NODE_ENV=production
ENV PORT=3025
ENV HOSTNAME=0.0.0.0


RUN apk add --no-cache libc6-compat \
    && addgroup --system --gid 1001 nodejs \
    && adduser --system --uid 1001 nextjs

WORKDIR /app

# ✅ Copie TOUT le standalone tel quel (il contient node_modules + app-frontend/server.js)
COPY --from=builder /app/app-frontend/.next/standalone ./app-standalone

# ✅ Copie les assets à côté
COPY --from=builder /app/app-frontend/public ./app-standalone/app-frontend/public
COPY --from=builder /app/app-frontend/.next/static ./app-standalone/app-frontend/.next/static

# ✅ Correction des droits d’écriture pour les caches
RUN mkdir -p /app/app-standalone/app-frontend/.next/cache \
    && chown -R nextjs:nodejs /app/app-standalone/app-frontend


USER nextjs
WORKDIR /app/app-standalone/app-frontend
EXPOSE 3025
CMD ["node", "server.js"]
