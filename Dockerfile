# ---- Base Stage ----
FROM oven/bun:1 AS base
WORKDIR /app

# ---- Dependencies Stage ----
FROM base AS deps
COPY package.json bun.lock ./
COPY .env .env
RUN bun install --frozen-lockfile

# ---- Build Stage ----
FROM base AS build
WORKDIR /app

# Install OpenSSL for Prisma
RUN apt-get update -y && apt-get install -y openssl

COPY --from=deps /app/node_modules ./node_modules
COPY .env .env
COPY . .
RUN bunx prisma generate
RUN bun run build

# ---- Production Stage ----
FROM oven/bun:1 AS prod
WORKDIR /app

# Install OpenSSL for Prisma at runtime
RUN apt-get update -y && apt-get install -y openssl

# Copy only required files
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile --production --ignore-scripts

COPY --from=build /app/next.config.js* ./
COPY --from=build /app/public ./public
COPY --from=build /app/.next ./.next
COPY --from=build /app/db ./db
COPY .env .env

EXPOSE 3000
CMD ["bun", "run", "start"]
