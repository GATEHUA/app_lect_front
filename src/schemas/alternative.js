import { z } from "zod";

export const createAlternativeSchema = z.object({
  contenido: z
    .string({ required_error: "Campo requerido" })
    .nonempty({ message: "Campo requerido" }),
  estado: z.string().optional(),
  feedback: z.string().optional(),
});
