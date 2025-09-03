export interface formTypes {
  defaultValue: string | boolean | undefined;
  name: string;
  label: string;
  placeholder: string;
  type: string;
}

export const ImputsFromUserData: formTypes[] = [
  {
    name: "names",
    defaultValue: "",
    label: "Nombres",
    placeholder: "Tu nombre",
    type: "text"
  },
  {
    name: "lastnames",
    defaultValue: "",
    label: "Apellidos",
    placeholder: "Tu apellido",
    type: "text"
  },
  {
    name: "email",
    defaultValue: "",
    label: "Correo electrónico",
    placeholder: "Tu correo electronico",
    type: "email"
  },
  {
    name: "phone",
    defaultValue: "",
    label: "Teléfono",
    placeholder: "Tu numero de telefono",
    type: "text"
  }
];

export interface termsTypes {
  id: number;
  name: string;
  text: string;
  mandatory: boolean;
  isAuthorization: boolean;
}

export const TermsOfService: termsTypes[] = [
  {
    id: 0,
    name: "term1",
    text: "términos y condiciones, términos y condiciones marketplace",
    mandatory: true,
    isAuthorization: false
  },
  {
    id: 1,
    name: "term2",
    text: "tratamiento de mis datos personales",
    mandatory: true,
    isAuthorization: true
  },
  {
    id: 2,
    name: "term3",
    text: "el tratamiento de mis datos para el envío de publicidad",
    mandatory: false,
    isAuthorization: true
  },
]