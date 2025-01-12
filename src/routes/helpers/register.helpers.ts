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
    label: "Primer Nombre",
    type: "text",
    placeholder: "Nombre",
    name: "name",
  },
  {
    label: "Segundo Nombre",
    type: "text",
    placeholder: "Apellido",
    name: "secondName",
  },
  {
    label: "Apellido",
    type: "text",
    placeholder: "Apellido",
    name: "lastnames",
  },
  {
    label: "Celular",
    type: "text",
    placeholder: "Celular",
    name: "phoneNumber",
  },
  {
    label: "Correo",
    type: "email",
    placeholder: "Correo",
    name: "email",
  },
  {
    label: "Contraseña",
    type: "password",
    placeholder: "Contraseña",
    name: "password",
  },
];
