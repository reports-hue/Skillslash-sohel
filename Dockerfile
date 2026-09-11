# Multi-stage build - the final image ships only the traced production
# server (.next/standalone), static assets and public files, never the
# full node_modules tree or source. Node 20 LTS: the minimum Next 16 /
# @next/third-parties 16 actually support (Node 14, the old Dockerfile's
# base, is years past what this app now requires).

FROM node:20-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:20-alpine AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
# DATABASE_URL only needs to be a syntactically valid Postgres URL at build
# time - lib/db.js requires it to exist to construct the pool, but nothing
# in a static/SSR build path opens a real connection during `next build`
# itself (every page that reads the CMS wraps its DB call in try/catch).
# The real, secret DATABASE_URL is supplied at container *run* time via
# docker-compose's env_file, never baked into the image.
ENV DATABASE_URL="postgresql://build:build@localhost:5432/build"
ENV NEXT_TELEMETRY_DISABLED=1
RUN npm run build -- --webpack

FROM node:20-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME=0.0.0.0

RUN addgroup --system --gid 1001 nodejs \
  && adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

# Uploaded editor/cover images (public/uploads) need to persist across
# deploys - mounted as a volume in docker-compose, created here so the
# app can write to it as the non-root user from the first boot.
RUN mkdir -p ./public/uploads/blog && chown -R nextjs:nodejs ./public/uploads

USER nextjs
EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=20s --retries=3 \
  CMD node -e "fetch('http://127.0.0.1:3000/api/admin/auth/me').then(()=>process.exit(0)).catch(()=>process.exit(1))"

CMD ["node", "server.js"]
