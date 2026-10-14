import { IconType } from "react-icons";
import { FaBolt, FaStar, FaTag, FaTruck } from "react-icons/fa6";
import { PiChefHatFill, PiGameControllerFill, PiHouseFill, PiLaptopBold, PiTShirtBold } from "react-icons/pi";
import { FiClock, FiPackage, FiRefreshCw, FiShield, FiShoppingCart, FiTruck } from "react-icons/fi";

export const heroPerks = [
  { icon: FiTruck, title: "Envío gratis", text: "A todo el país" },
  { icon: FiClock, title: "Despacho 24 h", text: "Desde bodega" },
  { icon: FiRefreshCw, title: "30 días", text: "Para devolver" },
];

export const heroProductNames = [
  "Nevecon JLC",
  "Tenis Adidas",
  "Dualsense - Mando Playstation 5",
  "Camisa Adidas",
  "Arrocera",
  "Hp Victus 15",
];

export const heroCoupon = { text: "+10% en tu primera compra", code: "MULTI10" };

export const heroChips: { label: string; icon: IconType; color: string; href: string; active?: boolean }[] = [
  { label: "Tecnología", icon: PiLaptopBold, color: "#7b4bd6", href: "#tecnologia", active: true },
  { label: "Hogar", icon: PiHouseFill, color: "#ff4b14", href: "#catalogo" },
  { label: "Moda", icon: PiTShirtBold, color: "#e8409a", href: "#ropa" },
  { label: "Cocina", icon: PiChefHatFill, color: "#f5a000", href: "#cocina" },
  { label: "Gamer", icon: PiGameControllerFill, color: "#22a95c", href: "#gamer" },
];

export const heroFeatures = [
  { icon: FaTag, title: "Hasta 40% OFF", text: "En productos seleccionados", tone: "bg-brand", href: "#precios-bajos" },
  { icon: FaTruck, title: "Envío gratis", text: "A todo el país", tone: "bg-[#7b4bd6]", href: "#beneficios" },
  { icon: FaBolt, title: "Entrega rápida", text: "Desde 24 h", tone: "bg-success", href: "#beneficios" },
  { icon: FaStar, title: "Productos destacados", text: "Las mejores marcas", tone: "bg-[#d98f00]", href: "#catalogo" },
];

export const heroPromos = [
  {
    category: "Tecnología",
    title: "Renueva tu setup",
    text: "Portátiles, monitores y audio con hasta 12 cuotas sin interés.",
  },
  {
    category: "Cocina",
    title: "Cocina como chef",
    text: "Ollas, freidoras de aire y neveras listas para despacho.",
  },
] as const;

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

export const spotlightPicks: Record<string, string> = {
  Gamer: "Mando X-BOX Series X",
};

export const interludeOrder = ["spotlight", "promos", "steps", "spotlight", "promos"] as const;
