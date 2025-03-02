import { z } from "zod";

export const deleteSaleSchema = z.object({
  id: z.string().uuid({
    message: "O id é venda é obrigatório.",
  }),
});

export type DeleteSaleSchema = z.infer<typeof deleteSaleSchema>;
