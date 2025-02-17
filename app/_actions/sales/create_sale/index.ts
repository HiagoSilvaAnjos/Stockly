"use server";

import { db } from "@/app/_lib/prisma";
import { createSaleSchema, CreateSaleSchema } from "./schema";

export const CreateSale = async (data: CreateSaleSchema) => {
  createSaleSchema.parse(data);
  const sale = await db.sale.create({
    data: {
      date: new Date(),
    },
  });

  for (const product of data.products) {
    const productFromDb = await db.product.findUnique({
      where: {
        id: product.id,
      },
    });

    if (!productFromDb) throw new Error(`Product not found: ${product.id}`);

    const productOutOfStock = product.quantity > productFromDb.stock;

    if (productOutOfStock) throw new Error("Product out of stock");

    await db.saleProduct.create({
      data: {
        saleId: sale.id,
        productId: product.id,
        quantity: product.quantity,
        unitPrice: productFromDb?.price,
      },
    });
  }
};
