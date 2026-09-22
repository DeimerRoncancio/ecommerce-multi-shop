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

export const AddressData = z.object({
  name: z
    .string()
    .min(1, { message: "Ponle un nombre, por ejemplo Casa u Oficina" }),
  addressLine1: z
    .string()
    .min(1, { message: "La dirección es requerida" }),
  city: z
    .string()
    .min(1, { message: "La ciudad es requerida" }),
  state: z
    .string()
    .min(1, { message: "El departamento es requerido" }),
  country: z
    .string()
    .min(1, { message: "El país es requerido" }),
  phone: z
    .string()
    .min(1, { message: "El teléfono es requerido" })
    .min(9, { message: "El teléfono debe tener al menos 9 dígitos" })
    .max(15, { message: "El teléfono debe tener como máximo 15 dígitos" }),
});

export type AddressDataForm = z.infer<typeof AddressData>;
