import { z } from "zod";
export const createProductoFinal = z.object({
  audio: z
    .instanceof(File)
    .transform((File) => {
      if (!File) return null;
      return File;
    })
    .refine((file) => {
      if (!file) return true;
      return file?.size <= 5 * 1024 * 1024;
    }, `El tamaño máximo de archivo es de 5 MB`)
    // .refine((file) => {
    //   if (!file) return true;
    //   return ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
    //     file?.type
    //   );
    // }, "Se aceptan solo audios")
    .nullable(),
  texto: z.string().optional(),
  archivo: z
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
});
