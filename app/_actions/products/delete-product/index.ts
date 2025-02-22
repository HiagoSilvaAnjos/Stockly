"use server";

import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";
import { delteProductSchema } from "./schema";
import { actionClient } from "@/app/_lib/next-safe-action";

export const deleteProduct = actionClient
  .schema(delteProductSchema)
  .action(async ({ parsedInput: { id } }) => {
    await db.product.delete({
      where: {
        id,
      },
    });
    revalidatePath("/products");
  });
