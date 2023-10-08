import prisma from "../src/service/prismaClient.js";
import passwordService from "../src/service/passwordService.js";

async function main() {
   console.log('seeding data...');
    const { hashedPassword, salt } = await passwordService.hashPassword('password')
    await prisma.user.upsert({
      where: { email: 'test@email.com'},
      update: {},
      create: {
        email: 'test@email.com',
        hashedPassword,
        salt,
        firstName: 'Joe',
        lastName: 'Doe'
      }
    })
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
