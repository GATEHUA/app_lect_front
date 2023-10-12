import { z } from "zod";

export const createReadingSchema = z.object({
  titulo: z
    .string({ required_error: "Campo requerido" })
    .nonempty({ message: "Campo requerido" }),
  fuente: z.string().optional(),
  grado: z.string().optional(),
  genero: z.string().optional(),
  nivelDificultad: z.number({
    invalid_type_error: "Campo requerido",
    required_error: "Campo requerido",
  }),
  contenido: z
    .instanceof(FileList, { message: "Campo requerido" })
    .transform((files) => {
      if (files.length === 0) return null;
      return files.item(0);
    })
    .refine((file) => {
      return file?.size <= 5 * 1024 * 1024;
    }, "El tamaño máximo de archivo es de 5 MB")
    .refine((file) => {
      return file?.type === "application/pdf";
    }, "Se aceptan archivos PDF solamente."),
  numpreguntasal: z.number({
    invalid_type_error: "Campo requerido",
    required_error: "Campo requerido",
  }),
  texto: z
    .string()
    .optional()
    .refine(
      (value) => {
        if (value === "" || value === "<p><br></p>" || value === undefined) {
          return true;
        }
        return value.length >= 70;
      },
      { message: "Debe tener como mínimo 70 caracters" }
    )
    .transform((value) => {
      if (value === "" || value === "<p><br></p>" || value === undefined) {
        return null;
      }
      return value;
    }),
});
export const updateReadingSchema = createReadingSchema.extend({
  contenido: z
    .instanceof(FileList)
    .transform((files) => {
      if (!files) return null;
      if (files.length === 0) return null;
      return files.item(0);
    })
    .refine((file) => {
      if (!file) return true;
      return file?.size <= 5 * 1024 * 1024;
    }, `El tamaño máximo de archivo es de 5 MB`)
    .refine((file) => {
      if (!file) return true;
      return file?.type === "application/pdf";
    }, "Se aceptan archivos PDF solamente.")
    .nullable(),
});
