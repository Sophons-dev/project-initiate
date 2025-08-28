import { PrismaClient } from '@prisma/client';
import { seedQuestions } from './questions';

const prisma = new PrismaClient();

async function main() {
  console.log('Starting database seeding...');

  await seedQuestions();

  console.log('Database seeding completed successfully!');
}

main()
  .catch(console.error)
  .finally(async () => {
    await prisma.$disconnect();
  });
