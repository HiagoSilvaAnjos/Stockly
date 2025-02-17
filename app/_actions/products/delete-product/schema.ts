import { z } from "zod";

export const delteProductSchema = z.object({
  id: z.string().uuid({
    message: "O id do produto é obrigatório.",
  }),
});

export type DelteProductSchema = z.infer<typeof delteProductSchema>;
