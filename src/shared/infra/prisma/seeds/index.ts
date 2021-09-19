import { Prisma, PrismaClient } from '@prisma/client';

import { createAdminUser } from './Users';

export type IPrismaClient = PrismaClient<
  Prisma.PrismaClientOptions,
  never,
  Prisma.RejectOnNotFound | Prisma.RejectPerOperation | undefined
>;

const prisma = new PrismaClient();

async function main() {
  await createAdminUser(prisma);
}

main()
  .catch(err => {
    console.log(err);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
