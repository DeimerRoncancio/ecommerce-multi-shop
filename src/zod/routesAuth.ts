import { z } from "zod";

export const LoginAccessUser = z.object({
  identifier: z
    .string()
    .min(1, { message: "El email o numero de telefono es requerido" }),
  password: z
    .string()
    .min(1, { message: "La contraseña es requerida" })
    .min(8, { message: "Debe ser mínimo de 8 carácteres" })
    .max(255, { message: "" }),
});

export type LoginAccesUserFormData = z.infer<typeof LoginAccessUser>;
