import { FiClock, FiPackage, FiRefreshCw, FiShield, FiShoppingCart, FiTruck } from "react-icons/fi";

export const heroPerks = [
  { icon: FiTruck, title: "Envío gratis", text: "A todo el país" },
  { icon: FiClock, title: "Despacho 24 h", text: "Desde bodega" },
  { icon: FiRefreshCw, title: "30 días", text: "Para devolver" },
];

export const purchaseSteps = [
  { icon: FiShoppingCart, title: "Pides", text: "Eliges tus productos y pagas con tarjeta, PSE o efectivo." },
  { icon: FiPackage, title: "Despachamos", text: "Sale de nuestra bodega en menos de 24 horas." },
  { icon: FiTruck, title: "Llega gratis", text: "Envío sin costo a todo el país, y 30 días para devolver." },
];

export const storeBenefits = [
  { icon: FiTruck, title: "Envío gratis", text: "A todo el país, con despacho en 24 horas." },
  { icon: FiRefreshCw, title: "30 días para devolver", text: "Si no te convence, lo devuelves sin costo." },
  { icon: FiShield, title: "Pago protegido", text: "Tarjeta, PSE o efectivo, con tus datos cifrados." },
];

export const interludeOrder = ["spotlight", "promos", "steps", "spotlight", "promos"] as const;
