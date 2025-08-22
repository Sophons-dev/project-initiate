This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Database Setup

This project uses MongoDB with Prisma, configured to run in a Docker container.

**Note**: For development purposes, MongoDB is running as a standalone instance. If you need transactions in production, you'll need to configure MongoDB as a replica set.

**Quick Start**: Copy `.env.example` to `.env` and run `bun run db:up` to get started.

### Prerequisites

- Docker and Docker Compose installed
- Node.js and npm/yarn/bun

### Environment Variables

Copy the `.env.example` file to `.env` and update the values as needed:

```bash
cp .env.example .env
```

The `.env` file should contain:

```env
# MongoDB Configuration
MONGO_PORT=27017

# Database Connection String (for replica set without authentication)
DATABASE_URL="mongodb://localhost:27017/project-initiate?replicaSet=rs0&directConnection=true"

# Add your other environment variables here
```

### Starting the Database

```bash
# Start MongoDB with replica set
bun run db:up

# Or manually
docker-compose up -d
```

### Database Management

```bash
# Generate Prisma client
bun run db:generate

# Push schema changes to database
bun run db:push

# Seed the database with initial data
bun run db:seed

# Open Prisma Studio (database GUI)
bun run db:studio

# Stop the database
bun run db:down

# Reset database (removes all data)
bun run db:reset
```

### Database GUI - Prisma Studio

**Prisma Studio** is the recommended tool for database management and inspection. It provides:

- **Visual Database Browser**: View and edit collections, documents, and relationships
- **Real-time Updates**: See changes as they happen
- **Query Builder**: Build and test queries visually
- **Schema Validation**: Ensure data integrity
- **User-friendly Interface**: No need for command-line database tools

Launch it with: `bun run db:studio`

### Important Notes

- MongoDB is configured as a replica set (`rs0`) which is required for Prisma transactions
- Authentication is disabled for development purposes (`--noauth`)
- The `mongo-init` service automatically initializes the replica set
- Use Prisma Studio for database management: `bun run db:studio`
- Wait for the replica set to initialize before running Prisma operations

### Troubleshooting

If you encounter connection issues:

1. **Check Database Status**:
   ```bash
   docker-compose ps
   docker-compose logs initiate-mongo
   ```

2. **Verify Replica Set**:
   ```bash
   docker-compose logs mongo-init
   docker-compose exec initiate-mongo mongosh --eval "rs.status()"
   ```

3. **Inspect Database with Prisma Studio**:
   ```bash
   bun run db:studio
   ```

4. **Reset if Needed**:
   ```bash
   bun run db:reset
   ```

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
