import { PrismaClient } from "../src/generated/prisma/client.js";
const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: [
      { id: "tshirt", name: "T-shirt", price: 35.99 },
      { id: "jeans", name: "Jeans", price: 65.5 },
      { id: "dress", name: "Dress", price: 80.75 },
    ],
    skipDuplicates: true,
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => prisma.$disconnect());
