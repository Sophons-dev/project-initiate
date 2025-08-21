import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  // TODO: Add seed data here
}

main()
  .catch((e) => {
    console.error(e);
    if (typeof globalThis.process !== 'undefined') {
      globalThis.process.exit(1);
    }
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
