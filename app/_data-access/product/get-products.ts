import { db } from "@/app/_lib/prisma";
import { Product } from "@prisma/client";
import { revalidatePath } from "next/cache";

export interface GetProductsDTO extends Product {
  status: "IN_STOCK" | "OUT_OF_STOCK";
}

const getProducts = async (): Promise<GetProductsDTO[]> => {
  revalidatePath("/sales");
  const products = await db.product.findMany({});
  return products.map((product) => ({
    ...product,
    status: product.stock > 0 ? "IN_STOCK" : "OUT_OF_STOCK",
  }));
};

export default getProducts;
