import { PrismaClient } from "../src/generated/prisma/client.js";
const prisma = new PrismaClient();

async function main() {
  await prisma.product.createMany({
    data: [
      {
        id: "tshirt",
        name: "T-shirt",
        price: 35.99,
        image:
          "https://slimages.macysassets.com/is/image/MCY/products/6/optimized/3502496_fpx.tif?qlt=55,0&resMode=sharp2&op_usm=1.75,0.3,2,0&fmt=webp&wid=684&hei=834",
        location: "Lisbon, Portugal",
        rating: 4.5,
      },
      {
        id: "jeans",
        name: "Jeans",
        price: 65.5,
        image:
          "https://slimages.macysassets.com/is/image/MCY/products/1/optimized/17902141_fpx.tif?op_sharpen=1&wid=700&fit=fit,1&fmt=webp",
        location: "Lisbon, Portugal",
        rating: 5,
      },
      {
        id: "dress",
        name: "Dress",
        price: 80.75,
        image:
          "https://slimages.macysassets.com/is/image/MCY/products/7/optimized/32238847_fpx.tif?qlt=55,0&resMode=sharp2&op_usm=1.75,0.3,2,0&fmt=webp&wid=684&hei=834",
        location: "Lisbon, Portugal",
        rating: 3.7,
      },
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
