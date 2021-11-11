import { tracks } from './../data/tracks';
import { PrismaClient } from '@prisma/client';
import { links } from '../data/links';

const prisma = new PrismaClient();
const nwlinks = links.concat(tracks);

async function main() {
  await prisma.user.create({
    data: {
      email: 'chebiva@gmail.com',
      role: 'ADMIN',
    },
  });

  await prisma.link.createMany({
    data: nwlinks,
  });


 
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => await prisma.$disconnect);