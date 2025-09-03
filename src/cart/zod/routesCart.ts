import { z } from "zod";

export const UserData = z.object({
  names: z
    .string()
    .min(1, { message: "Los nombres son requeridos" }),
  lastnames: z
    .string()
    .min(1, { message: "Los apellidos son requeridos" }),
  email: z
    .string()
    .min(1, { message: "El correo es requerido" })
    .email({ message: "El correo no es válido" }),
  phone: z
    .string()
    .min(1, { message: "El teléfono es requerido" })
    .min(9, { message: "El teléfono debe tener al menos 9 dígitos" })
    .max(15, { message: "El teléfono debe tener como máximo 15 dígitos" }),
  term1: z
    .boolean()
    .refine(val => val === true, { message: "Debes aceptar los términos y condiciones" }),
  term2: z
    .boolean()
    .refine(val => val === true, { message: "Debes aceptar el tratamiento de tus datos personales" }),
  term3: z
    .boolean()
    .optional(),
});

export type UserDataForm = z.infer<typeof UserData>;
