import { db } from "@/app/_lib/prisma";
import { Product } from "@prisma/client";
import { revalidatePath } from "next/cache";

const getProducts = async (): Promise<Product[]> => {
  revalidatePath("/sales");
  return await db.product.findMany();
};

export default getProducts;
