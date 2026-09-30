import { IconType } from "react-icons";
import { FiLock, FiMail, FiPhone, FiUser } from "react-icons/fi";

type names =
  | "name"
  | "secondName"
  | "lastnames"
  | "phoneNumber"
  | "email"
  | "password";

export interface formsTypes {
  label: string;
  type: string;
  name: names;
  placeholder: string;
}

export const InputsFromRegister: formsTypes[] = [
  {
    label: "Nombre",
    type: "text",
    placeholder: "Tu nombre",
    name: "name",
  },
  {
    label: "Segundo nombre",
    type: "text",
    placeholder: "Opcional",
    name: "secondName",
  },
  {
    label: "Apellidos",
    type: "text",
    placeholder: "Tus apellidos",
    name: "lastnames",
  },
  {
    label: "Celular",
    type: "tel",
    placeholder: "300 123 4567",
    name: "phoneNumber",
  },
  {
    label: "Correo electrónico",
    type: "email",
    placeholder: "nombre@correo.com",
    name: "email",
  },
  {
    label: "Contraseña",
    type: "password",
    placeholder: "Crea una contraseña",
    name: "password",
  },
];

export const requiredFields = ["name", "email", "password"];

export const wideFields = ["email", "password"];

export const registerIcons: Partial<Record<string, IconType>> = {
  name: FiUser,
  phoneNumber: FiPhone,
  email: FiMail,
  password: FiLock,
};

export const genderOptions = [
  { value: "notToSaid", label: "Prefiero no decirlo" },
  { value: "male", label: "Hombre" },
  { value: "female", label: "Mujer" },
];

export const registerPerks = [
  "Tus datos listos para la próxima compra",
  "Una lista de deseos para guardar lo que te gusta",
  "Sigue cada pedido hasta tu casa",
];
