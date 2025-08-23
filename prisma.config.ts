import "dotenv/config";

import path from "node:path";
import type { PrismaConfig } from "prisma";

export default {
  schema: path.join("db"),
  migrations: {
    seed: "bunx tsx db/seeds/index.ts"
  },
} satisfies PrismaConfig;
