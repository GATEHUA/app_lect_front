import { z } from "zod";
import { registerSchema } from "./auth";

export const createUserSchema = registerSchema.extend({
  rol: z
    .string({ required_error: "Campo requerido" })
    .nonempty({ message: "Campo requerido" }),
  estaVerificado: z
    .string({ required_error: "Campo requerido" })
    .nonempty({ message: "Campo requerido" })
    .transform((value) => {
      return JSON.parse(value);
    }),
  fotoPerfil: z
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
      return ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
        file?.type
      );
    }, "Se aceptan archivos .jpg, .jpeg, .png y .webp.")
    .nullable(),
});

export const updateUserSchema = createUserSchema.extend({
  deleteFotoPerfil: z.boolean().optional(),
  contrasenia: z
    .string()
    .refine(
      (value) => {
        if (value === "" || value === undefined) {
          return true;
        }
        return value.length >= 8;
      },
      { message: "Debe tener como mínimo 8 caracteres" }
    )
    .refine(
      (value) => {
        if (value === "" || value === undefined) {
          return true;
        }
        return /[A-Z]/.test(value);
      },
      { message: "Debe contener al menos una mayúscula" }
    )
    .refine(
      (value) => {
        if (value === "" || value === undefined) {
          return true;
        }
        return /[a-z]/.test(value);
      },
      { message: "Debe contener al menos una minúscula" }
    )
    .refine(
      (value) => {
        if (value === "" || value === undefined) {
          return true;
        }
        return /[0-9]/.test(value);
      },
      { message: "Debe contener al menos un número" }
    )
    .transform((value) => {
      if (value === "" || value === undefined) {
        return null;
      }
      return value;
    }),
});
