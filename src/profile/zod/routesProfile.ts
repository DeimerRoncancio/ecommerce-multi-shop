import { z } from "zod";

export const ChangePasswordUser = z.object({
  currentPassword: z.string().min(1, { message: "Campo requerido" }),
  newPassword: z.string().min(1, { message: "Campo requerido" }),
  confirmPassword: z .string().min(1, { message: "Campo requerido" }),
})

export type ChangePasswordUserFormData = z.infer<typeof ChangePasswordUser>;
