export const CATALOG_PAGE_SIZE = 12;
export const NEWEST_SIZE = 10;

export const catalogSorts = [
  { value: "nombre", label: "Nombre (A-Z)", api: "productName,asc" },
  { value: "precio-asc", label: "Menor precio", api: "price,asc" },
  { value: "precio-desc", label: "Mayor precio", api: "price,desc" },
  { value: "nuevos", label: "Más nuevos", api: "createdAt,desc" },
];

export const pricePresets = [
  { label: "Menos de $200.000", min: null, max: 200000 },
  { label: "$200.000 a $1.000.000", min: 200000, max: 1000000 },
  { label: "Más de $1.000.000", min: 1000000, max: null },
];
