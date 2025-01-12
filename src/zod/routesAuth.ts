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

export const RegisterForm = z.object({
  name: z.string().min(1, { message: "El nombre es requerido" }),
  secondName: z.string().min(1, { message: "El segundo nombre es requerido" }),
  lastNames: z.string().min(1, { message: "El apellido es requerido" }),
  phoneNumber: z
    .string()
    .min(1, { message: "El número de celular es requerido" }),
  email: z.string().email({ message: "El correo es requerido o no valido" }),
  gender: z
    .string({ message: "El genero es requerido" })
    .min(1, { message: "El genero es requerido" }),
  password: z
    .string()
    .min(1, { message: "La contraseña es requerida" })
    .min(8, { message: "Debe ser mínimo de 8 carácteres" })
    .max(255, { message: "" }),
});

export type RegisterFormData = z.infer<typeof RegisterForm>;
