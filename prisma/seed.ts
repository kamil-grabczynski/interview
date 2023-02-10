import { PrismaClient } from '@prisma/client';

const users = [
  {
    id: 1,
    role: 'basic',
    name: 'Basic Test',
    username: 'basic-test',
    password: 'xdgwpeomr6_uNFpg17rr',
  },
  {
    id: 434,
    role: 'premium',
    name: 'Premium Test',
    username: 'premium-test',
    password: 'GBLspofkqpfe_qwf34pomf',
  },
];
const prisma = new PrismaClient();

const seed = async () => {
  await prisma.$connect();

  const existingUsers = await prisma.user.findMany();
  const existingUsernames = existingUsers.map((eu) => eu.name);
  const usersToCreate = users.filter(
    (u) => !existingUsernames.includes(u.name),
  );

  await prisma.user.createMany({
    data: usersToCreate,
  });

  await prisma.$disconnect();
};

seed();
