import { z } from "zod";

export const ChangePasswordUser = z.object({
  currentPassword: z
    .string()
    .min(1, { message: "Campo requerido" })
    .min(8, { message: "Debe ser mínimo de 8 carácteres" }),
  newPassword: z
    .string()
    .min(1, { message: "Campo requerido" })
    .min(8, { message: "Debe ser mínimo de 8 carácteres" }),
  confirmPassword: z 
    .string()
    .min(1, { message: "Campo requerido" })
    .min(8, { message: "Debe ser mínimo de 8 carácteres" }),
})

export type ChangePasswordUserFormData = z.infer<typeof ChangePasswordUser>;
