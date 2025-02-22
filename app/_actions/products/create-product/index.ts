"use server";

import { db } from "@/app/_lib/prisma";
import { revalidatePath } from "next/cache";
import { upsertProductSchema } from "./schema";
import { actionClient } from "@/app/_lib/next-safe-action";

export const upsertProduct = actionClient
  .schema(upsertProductSchema)
  .action(async ({ parsedInput: product }) => {
    await db.product.upsert({
      where: { id: product.id ?? "" },
      update: product,
      create: product,
    });

    revalidatePath("/products");
  });
