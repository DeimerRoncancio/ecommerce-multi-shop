import { FiLock, FiRefreshCw, FiTruck } from "react-icons/fi";
import { PaymentMethodType } from "../types/cart";
import { AddressDataForm } from "../zod/routesCart";

export const checkoutTrust = [
  { icon: FiTruck, text: "Envío gratis a todo el país" },
  { icon: FiRefreshCw, text: "30 días para devolver" },
  { icon: FiLock, text: "Pago con tus datos cifrados" },
];

export const paymentMethods: PaymentMethodType[] = [
  {
    id: "stripe-checkout",
    name: "Tarjeta de crédito o débito",
    description: "Te llevamos a la pasarela segura de Stripe para completar el pago.",
  },
];

export const addressFields: Array<{
  name: keyof AddressDataForm;
  label: string;
  placeholder: string;
  span: string;
}> = [
  { name: "name", label: "Nombre de la dirección", placeholder: "Casa, Oficina...", span: "sm:col-span-3" },
  { name: "phone", label: "Teléfono de contacto", placeholder: "3001234567", span: "sm:col-span-3" },
  { name: "addressLine1", label: "Dirección", placeholder: "Calle 12 # 34-56, apto 101", span: "sm:col-span-6" },
  { name: "city", label: "Ciudad", placeholder: "Bogotá", span: "sm:col-span-2" },
  { name: "state", label: "Departamento", placeholder: "Cundinamarca", span: "sm:col-span-2" },
  { name: "country", label: "País", placeholder: "Colombia", span: "sm:col-span-2" },
];
