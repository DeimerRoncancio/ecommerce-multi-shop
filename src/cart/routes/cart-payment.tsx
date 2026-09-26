import { useState } from "react";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import PaymentCardInfo from "../components/PaymentCardInfo";
import Container from "../../shared/ui/Container";
import { formatPrice } from "../../shared/utilities/format-price";
import PaymentMethodItem from "../components/PaymentMethodItem";
import useCart from "../hooks/useCart";
import { createPaymentSession, getCheckoutAccessToken, getCheckoutSummary } from "../api/paymentsApi";
import { useStepsStorage } from "../storage/steps";
import { PaymentMethodType } from "../types/cart";
import { Route } from "./+types/cart-payment";
import { redirect, useNavigate } from "react-router";
import { parse } from "cookie";
import Cookie from "js-cookie";

const paymentMethods: PaymentMethodType[] = [
  {
    id: "stripe-checkout",
    name: "Tarjeta de crédito o débito",
    description: "Te llevamos a la pasarela segura de Stripe para completar el pago.",
  },
];

export async function loader({ request }: Route.LoaderArgs) {
  const transactionId = parse(request.headers.get('cookie') || '').transactionId;
  if (!transactionId) return redirect('/cart/delivery');

  return { transactionId };
}

export async function clientLoader({ serverLoader }: Route.ClientLoaderArgs) {
  const data = await serverLoader();
  const checkoutAccessToken = getCheckoutAccessToken();
  if (!checkoutAccessToken) return redirect('/cart');

  const summary = await getCheckoutSummary(data.transactionId, checkoutAccessToken).catch(() => null);
  if (!summary?.selectedAddress) return redirect('/cart/delivery');

  return { ...data, customer: summary.customer, address: summary.selectedAddress };
}

clientLoader.hydrate = true as const;

export default function CartPayment({ loaderData }: Route.ComponentProps) {
  const { transactionId } = loaderData;
  const customer = "customer" in loaderData ? loaderData.customer : null;
  const address = "address" in loaderData ? loaderData.address : null;
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodType>(paymentMethods[0]);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const { cartItems, itemsQuantity } = useCart();
  const { nextSteps } = useStepsStorage();
  const navigate = useNavigate();

  const handleMethodSelect = (method: PaymentMethodType) => setSelectedMethod(method);

  const onPay = () => {
    if (!cartItems.length || isRedirecting) return;

    const checkoutAccessToken = getCheckoutAccessToken();
    if (!checkoutAccessToken) {
      navigate("/cart");
      return;
    }

    setIsRedirecting(true);

    createPaymentSession(transactionId, checkoutAccessToken)
      .then((session) => {
        if (!session.sessionUrl) {
          setIsRedirecting(false);
          return;
        }

        nextSteps("Pago");
        Cookie.remove("userData");
        window.location.href = session.sessionUrl;
      })
      .catch(() => setIsRedirecting(false));
  }

  return (
    <Container className="grid items-start gap-8 pb-16 lg:grid-cols-[1fr_360px]">
      <section>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="font-display text-xl font-semibold text-ink">Método de pago</h1>
          <span className="flex items-center gap-2 text-sm text-ink-soft">
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

        <div className="mt-8 rounded-2xl border border-line bg-base-100 p-6">
          <h2 className="mb-4 font-display text-lg font-semibold text-ink">Resumen del pedido</h2>

          <ul className="flex flex-col gap-2 border-b border-line pb-4 text-sm text-ink">
            {cartItems.map((item) => (
              <li key={item.id} className="flex justify-between gap-4">
                <span className="truncate">{item.productName} x {item.quantity}</span>
                <span className="shrink-0 font-medium text-ink-soft">
                  {formatPrice(item.productPrice * item.quantity)}
                </span>
              </li>
            ))}
          </ul>

          <div className="mt-4 flex flex-col gap-1 text-sm text-ink-soft">
            {customer && (
              <>
                <span>{customer.userNames}</span>
                <span>{customer.userEmail}</span>
                {customer.userPhone && <span>{customer.userPhone}</span>}
              </>
            )}
            {address && (
              <span className="mt-2">
                Envío a: {address.address}, {address.city}, {address.country}
              </span>
            )}
          </div>
        </div>
      </section>

      <PaymentCardInfo
        onContinue={onPay}
        disabledContinue={!itemsQuantity || isRedirecting}
        continueLabel={isRedirecting ? "Redirigiendo" : "Pagar"}
      />
    </Container>
  );
}
