import { z } from "zod";
export const createPartParrafoSchema = z.object({
  leeOral: z.instanceof(File, { message: "Campo requerido" }),
  // .transform((files) => {
  //   //   if (files.length === 0) return null;
  //   return files;
  // }),
  explicaOral: z.instanceof(File, { message: "Campo requerido" }),
  // .transform((files) => {
  //   //   if (files.length === 0) return null;
  //   return files;
  // }),
  resumenEscrito: z
    .string({ required_error: "Campo requerido" })
    .nonempty({ message: "Campo requerido" }),
  frase: z
    .string({ required_error: "Campo requerido" })
    .nonempty({ message: "Campo requerido" }),
});
