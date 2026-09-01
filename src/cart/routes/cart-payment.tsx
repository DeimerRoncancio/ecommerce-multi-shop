import { useState } from "react";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import PaymentCardInfo from "../components/PaymentCardInfo";
import PaymentMethodItem from "../components/PaymentMethodItem";
import useCart from "../hooks/useCart";
import { createPaymentSession } from "../api/paymentsApi";
import { cartItemToStripeItem } from "../mappers/items.mapper";
import { useOrderStorage } from "../storage/orders";
import { useStepsStorage } from "../storage/steps";
import { PaymentMethodType } from "../types/cart";

const paymentMethods: PaymentMethodType[] = [
  {
    id: "stripe-checkout",
    name: "Tarjeta de crédito o débito",
    description: "Te llevamos a la pasarela segura de Stripe para completar el pago.",
  },
];

export default function CartPayment() {
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodType>(paymentMethods[0]);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const { cartItems, itemsQuantity } = useCart();
  const { order } = useOrderStorage();
  const { nextSteps } = useStepsStorage();

  const handleMethodSelect = (method: PaymentMethodType) => setSelectedMethod(method);

  const onPay = async () => {
    if (!cartItems.length || isRedirecting) return;
    setIsRedirecting(true);

    try {
      const session = await createPaymentSession(cartItems.map(cartItemToStripeItem));

      if (!session.sessionUrl) {
        setIsRedirecting(false);
        return;
      }

      nextSteps("Pago");
      window.location.href = session.sessionUrl;
    } catch {
      // El interceptor de axios ya muestra el error al usuario.
      setIsRedirecting(false);
    }
  }

  const hasAddress = Boolean(order.address.addressLine1);

  return (
    <div className="flex gap-10 justify-center mt-8 mb-15">
      <div className="w-[55%] max-w-212.5 min-w-150">
        <div className="flex justify-between items-center">
          <h1 className="text-[#333333] text-xl">Método de pago</h1>
          <span className="flex items-center gap-2 text-sm text-[#7d7d7d]">
            <IoShieldCheckmarkOutline size={18} />
            Pago procesado por Stripe
          </span>
        </div>

        <div className="grid grid-cols-1">
          {paymentMethods.map((method) => (
            <PaymentMethodItem
              key={method.id}
              method={method}
              isActive={method.id === selectedMethod.id}
              onSelect={handleMethodSelect}
            />
          ))}
        </div>

        <div className="mt-8 p-6 border-1 border-[#dedfdf] rounded-xl">
          <h2 className="text-[#5e472d] text-lg font-semibold mb-4">Resumen del pedido</h2>

          <ul className="flex flex-col gap-2 text-sm text-black border-b border-[#e8e9e9] pb-4">
            {cartItems.map((item) => (
              <li key={item.id} className="flex justify-between gap-4">
                <span className="truncate">{item.productName} x {item.quantity}</span>
                <span className="shrink-0 text-[#636669]">
                  ${new Intl.NumberFormat("es-ES").format(item.productPrice * item.quantity)}
                </span>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-1 text-sm text-[#636669] mt-4">
            {order.user.email && (
              <>
                <span>{order.user.names} {order.user.lastnames}</span>
                <span>{order.user.email}</span>
                <span>{order.user.phone}</span>
              </>
            )}
            {hasAddress && (
              <span className="mt-2">
                Envío a: {order.address.addressLine1}, {order.address.city}, {order.address.country}
              </span>
            )}
          </div>
        </div>
      </div>

      <div className="w-[25%]">
        <PaymentCardInfo
          onContinue={onPay}
          disabledContinue={!itemsQuantity || isRedirecting}
          continueLabel={isRedirecting ? "Redirigiendo" : "Pagar"}
        />
      </div>
    </div>
  );
}
