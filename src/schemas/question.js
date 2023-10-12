import { z } from "zod";

export const createQuestionSchema = z.object({
  contenido: z
    .string({ required_error: "Campo requerido" })
    .nonempty({ message: "Campo requerido" }),
  esquema: z.string().optional(),
  criterio: z.string().optional(),
  tipo: z.string().optional(),
  nivel: z.string().optional(),
  puntobaserespuesta: z.number({
    invalid_type_error: "Campo requerido",
    required_error: "Campo requerido",
  }),
});
