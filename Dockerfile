# ---- Base Stage ----
FROM oven/bun:1 AS base
WORKDIR /app

# ---- Dependencies Stage ----
FROM base AS deps
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# ---- Build Stage ----
FROM base AS build
WORKDIR /app

# Install OpenSSL (needed for Prisma)
RUN apt-get update -y && apt-get install -y openssl

COPY .env .env 

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Generate Prisma client
RUN bunx prisma generate

# Build Next.js app (will now see env vars)
RUN bun run build

# ---- Production Stage ----
FROM oven/bun:1 AS prod
WORKDIR /app

# Install OpenSSL for Prisma at runtime
RUN apt-get update -y && apt-get install -y openssl

# Copy node_modules and Prisma client
COPY --from=deps /app/node_modules ./node_modules
COPY --from=build /app/node_modules/.prisma ./node_modules/.prisma

# Copy required app files
COPY package.json bun.lock ./
COPY --from=build /app/next.config.js* ./
COPY --from=build /app/public ./public
COPY --from=build /app/.next ./.next
COPY --from=build /app/db ./db
COPY .env .env 

EXPOSE 3000
CMD ["bun", "run", "start"]
