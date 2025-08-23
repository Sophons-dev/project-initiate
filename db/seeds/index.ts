import { PrismaClient } from '@prisma/client';
import { seedRoles } from './role';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seeding...');

  await seedRoles(prisma);

  console.log('Database seeding completed successfully!');
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
