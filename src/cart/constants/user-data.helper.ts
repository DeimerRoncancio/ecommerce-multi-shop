export interface formTypes {
  name: string;
  label: string;
  placeholder: string;
  type: string;
}

export const ImputsFromUserData: formTypes[] = [
  {
    name: "names",
    label: "Nombres",
    placeholder: "Tu nombre",
    type: "text"
  },
  {
    name: "lastnames",
    label: "Apellidos",
    placeholder: "Tu apellido",
    type: "text"
  },
  {
    name: "email",
    label: "Correo electrónico",
    placeholder: "Tu correo electronico",
    type: "email"
  },
  {
    name: "phone",
    label: "Teléfono",
    placeholder: "Tu numero de telefono",
    type: "text"
  }
];

export interface termsTypes {
  id: number;
  text: string;
  mandatory: boolean;
  isAuthorization: boolean;
}

export const TermsOfService: termsTypes[] = [
  {
    id: 0,
    text: "términos y condiciones,términos y condiciones marketplace",
    mandatory: true,
    isAuthorization: false
  },
  {
    id: 1,
    text: "tratamiento de mis datos personales",
    mandatory: true,
    isAuthorization: true
  },
  {
    id: 2,
    text: "el tratamiento de mis datos para el envío de publicidad",
    mandatory: false,
    isAuthorization: true
  },
]