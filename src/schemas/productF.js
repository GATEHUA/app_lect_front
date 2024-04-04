// import { z } from "zod";
// export const createProductoFinal = z.object({
//   audio: z
//     .instanceof(File)
//     .transform((File) => {
//       if (!File) return null;
//       return File;
//     })
//     .refine((file) => {
//       if (!file) return true;
//       return file?.size <= 5 * 1024 * 1024;
//     }, `El tamaño máximo de archivo es de 5 MB`)
//     // .refine((file) => {
//     //   if (!file) return true;
//     //   return ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
//     //     file?.type
//     //   );
//     // }, "Se aceptan solo audios")
//     .nullable(),
//   texto: z.string().optional(),
//   textoEnri: z
//     .string()
//     .optional()
//     .refine(
//       (value) => {
//         if (value === "" || value === "<p><br></p>" || value === undefined) {
//           return true;
//         }
//         return value.length >= 30;
//       },
//       { message: "Debe tener como mínimo 30 caracters" }
//     )
//     .transform((value) => {
//       if (value === "" || value === "<p><br></p>" || value === undefined) {
//         return null;
//       }
//       return value;
//     }),
//   archivo: z
//     .instanceof(FileList, { message: "Campo requerido" })
//     .transform((files) => {
//       if (files.length === 0) return null;
//       return files.item(0);
//     })
//     .refine((file) => {
//       return file?.size <= 5 * 1024 * 1024;
//     }, "El tamaño máximo de archivo es de 5 MB")
//     .refine((file) => {
//       return file?.type === "application/pdf";
//     }, "Se aceptan archivos PDF solamente."),
// });
import { z } from "zod";

export const createProductoFinal = z
  .object({
    audio: z
      .instanceof(File)
      .transform((file) => (file ? file : null))
      .refine((file) => file === null || file.size <= 5 * 1024 * 1024, {
        message: "El tamaño máximo de archivo es de 5 MB",
      })
      .nullable(),
    texto: z.string().optional(),
    textoEnri: z
      .string()
      .optional()
      .refine(
        (value) => {
          if (value === "" || value === "<p><br></p>" || value === undefined) {
            return true;
          }
          return value.length >= 27;
        },
        { message: "Debe tener como mínimo 20 caracters" }
      )
      .transform((value) => {
        if (value === "" || value === "<p><br></p>" || value === undefined) {
          return null;
        }
        return value;
      }),
    archivo: z
      .instanceof(FileList)
      .transform((files) => (files && files.length > 0 ? files.item(0) : null))
      .refine(
        (file) =>
          file === null ||
          (file.size <= 5 * 1024 * 1024 && file.type === "application/pdf"),
        {
          message: "Se aceptan archivos PDF de hasta 5 MB solamente.",
        }
      )
      .nullable(),
  })
  .refine(
    (data) => {
      // Debes tener al menos un campo no nulo
      return Object.values(data).some(
        (value) => value !== undefined && value !== null && value !== ""
      );
    },
    { message: "Al menos un campo debe ser completado." }
  );
