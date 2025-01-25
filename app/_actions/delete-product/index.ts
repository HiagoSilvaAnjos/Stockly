"use server";

import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";
import { DelteProductSchema, delteProductSchema } from "./schema";

export const deleteProduct = async ({ id }: DelteProductSchema) => {
  delteProductSchema.parse({ id });
  await db.product.delete({
    where: {
      id,
    },
  });
  revalidatePath("/products");
};
