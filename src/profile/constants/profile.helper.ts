export const breadcrumbLabels: Record<string, { label: string; to?: string }> = {
  profile: { label: "Mi cuenta" },
  "wish-list": { label: "Lista de deseos" },
  settings: { label: "Configuración" },
  product: { label: "Productos", to: "/" },
};

export const profileGenderOptions = [
  { id: "H", value: "male", label: "Hombre" },
  { id: "M", value: "female", label: "Mujer" },
];
