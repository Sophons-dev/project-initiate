# Next.js + Bun + Prisma + Auth0

This project is built with [Next.js](https://nextjs.org/), powered by [Bun](https://bun.sh) as the runtime and package manager, using [Prisma](https://www.prisma.io/) as the ORM, and [Auth0](https://auth0.com/) for authentication.

## 🚀 Getting Started

First, install dependencies with Bun:

```bash
bun install
```

Run the development server:

```bash
bun dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## ⚙️ Environment Setup

Before running the project, create a `.env.local` file in the root directory and configure the following:

### Database URL (Prisma)

```bash
DATABASE_URL="postgresql://USER:PASSWORD@localhost:5432/mydb"
```

### Auth0

```bash
AUTH0_SECRET="your-random-generated-secret"
AUTH0_BASE_URL="http://localhost:3000"
AUTH0_ISSUER_BASE_URL="https://your-tenant.auth0.com"
AUTH0_CLIENT_ID="your-auth0-client-id"
AUTH0_CLIENT_SECRET="your-auth0-client-secret"
```

### 🔑 Important:

- `DATABASE_URL` must point to your database.
- Replace all `AUTH0_*` variables with the credentials from your Auth0 application.
- The `.env.local` file should not be committed to version control.

## 🗄️ Database & Prisma

### Generate Prisma Client

Run after making schema changes:

```bash
bunx prisma generate
```

### Run Migrations

Apply migrations to your database:

```bash
bunx prisma migrate dev
```

### Seeding the Database

To populate the database with initial data, run:

```bash
bunx prisma db seed
```

The seeding script can be found in `prisma/seed.ts`. Modify this file as needed for your project.

## 🔐 Auth0 Integration

Authentication is handled via the Auth0 Next.js SDK.

- Update `.env.local` with your Auth0 values (see above).
- Ensure the callback URLs in your Auth0 dashboard include:
  - `http://localhost:3000/api/auth/callback` (for local development)
  - Your production domain `/api/auth/callback`
- Login and logout routes are handled under `/api/auth/[...auth0].ts`.

## 📜 Scripts

```bash
bun dev               # Start development server
bun build             # Build production bundle
bun start             # Run production build
bunx prisma studio    # Open Prisma Studio (DB UI)
bunx prisma migrate dev  # Run migrations
bunx prisma db seed   # Seed database
```

## 📂 Project Structure

```bash
.
├── prisma/             # Prisma schema and seed script
├── src/
│   ├── app/            # Next.js app directory
│   ├── pages/api/      # API routes (includes Auth0)
│   └── components/     # UI components
├── .env.local          # Environment variables (not committed)
├── bun.lockb           # Bun lockfile
├── package.json        # Dependencies
└── README.md           # This file
```

## ✅ Notes

- Always run `bunx prisma generate` after modifying your `schema.prisma`.
- Keep your `.env.local` file updated with the correct values for Prisma and Auth0.
- For production, set environment variables directly on your deployment platform.

### Changes Made:

1. Fixed inconsistent heading levels and spacing.
2. Corrected missing backticks for code blocks and inline code.
3. Improved formatting for environment variables (used single backticks for consistency).
4. Added proper Markdown list syntax for the "Important" section.
5. Fixed indentation and alignment in the project structure section.
6. Ensured consistent use of backticks for file paths and commands.
7. Removed trailing empty lines and fixed minor typos.

### Regarding Your Question:

You asked whether to include an example Prisma seed code snippet (e.g., a `User.create` example). Since you requested to keep the docs clean unless specified, I’ve excluded the seed code snippet for now. If you’d like to add it, I can provide a concise example like this:

### Example Seed Script

In `prisma/seed.ts`, you can add:

```ts
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      email: 'example@domain.com',
      name: 'John Doe',
    },
  });
}

main()
  .catch(e => console.error(e))
  .finally(async () => await prisma.$disconnect());
```
