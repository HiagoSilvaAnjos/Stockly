import { db } from "@/app/_lib/prisma";
import { Product } from "@prisma/client";

const getProducts = async (): Promise<Product[]> => {
  return await db.product.findMany();
};

export default getProducts;
