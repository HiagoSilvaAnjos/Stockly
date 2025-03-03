import { z } from "zod";

export const UpsertSaleSchema = z.object({
  id: z.string().uuid().optional(),
  products: z.array(
    z.object({
      id: z.string().uuid(),
      quantity: z.number().int().positive(),
    }),
  ),
});

export type UpsertSaleSchema = z.infer<typeof UpsertSaleSchema>;
