import { useState } from "react";
import { IoShieldCheckmarkOutline } from "react-icons/io5";
import PaymentCardInfo from "../components/PaymentCardInfo";
import PaymentSkeleton from "../components/PaymentSkeleton";
import Container from "../../shared/ui/Container";
import { formatPrice } from "../../shared/utilities/format-price";
import PaymentMethodItem from "../components/PaymentMethodItem";
import { createPaymentSession, getCheckoutAccessToken, getCheckoutSummary } from "../api/paymentsApi";
import { useStepsStorage } from "../storage/steps";
import { PaymentMethodType } from "../types/cart";
import { Route } from "./+types/cart-payment";
import { redirect, useNavigate } from "react-router";
import { parse } from "cookie";
import { paymentMethods } from "../constants/checkout.helper";

export async function loader({ request }: Route.LoaderArgs) {
  const transactionId = parse(request.headers.get('cookie') || '').transactionId;
  if (!transactionId) return redirect('/cart');

  return { transactionId };
}

export async function clientLoader({ serverLoader }: Route.ClientLoaderArgs) {
  const data = await serverLoader();
  const checkoutAccessToken = getCheckoutAccessToken();
  if (!checkoutAccessToken) return redirect('/cart');

  const summary = await getCheckoutSummary(data.transactionId, checkoutAccessToken).catch(() => null);
  if (!summary?.selectedAddress) return redirect('/cart/delivery');

  return {
    ...data,
    customer: summary.customer,
    address: summary.selectedAddress,
    items: summary.items,
    totalPrice: summary.totalPrice,
  };
}

clientLoader.hydrate = true as const;

export function HydrateFallback() {
  return <PaymentSkeleton />;
}

export default function CartPayment({ loaderData }: Route.ComponentProps) {
  const { transactionId } = loaderData;
  const customer = "customer" in loaderData ? loaderData.customer : null;
  const address = "address" in loaderData ? loaderData.address : null;
  const items = "items" in loaderData ? loaderData.items : [];
  const totalPrice = "totalPrice" in loaderData ? loaderData.totalPrice : 0;
  const itemsQuantity = items.reduce((total, item) => total + item.quantity, 0);
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethodType>(paymentMethods[0]);
  const [isRedirecting, setIsRedirecting] = useState(false);
  const { nextSteps } = useStepsStorage();
  const navigate = useNavigate();

  const handleMethodSelect = (method: PaymentMethodType) => setSelectedMethod(method);

  const onPay = () => {
    if (!items.length || isRedirecting) return;

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
        window.location.href = session.sessionUrl;
      })
      .catch(() => setIsRedirecting(false));
  }

  return (
    <Container className="grid items-start gap-8 pb-16 lg:grid-cols-[1fr_380px] lg:gap-12">
      <section>
        <h1 className="text-3xl font-extrabold text-ink">Pago</h1>
        <p className="mt-0.5 flex items-center gap-1.5 text-sm text-ink-muted">
          <IoShieldCheckmarkOutline size={17} className="text-success" />
          Elige cómo pagar. El pago lo procesa Stripe de forma segura.
        </p>

        <div className="mt-5 grid grid-cols-1 gap-3">
          {paymentMethods.map((method) => (
            <PaymentMethodItem
              key={method.id}
              method={method}
              isActive={method.id === selectedMethod.id}
              onSelect={handleMethodSelect}
            />
          ))}
        </div>

        <div className="mt-5 rounded-2xl bg-cream p-5">
          <h2 className="mb-4 text-xs font-extrabold uppercase tracking-[0.08em] text-brand">Revisa tu pedido</h2>

          <ul className="flex flex-col gap-2 border-b border-line pb-4 text-sm text-ink">
            {items.map((item) => (
              <li key={item.id} className="flex justify-between gap-4">
                <span className="truncate">{item.productName} x {item.quantity}</span>
                <span className="shrink-0 font-medium text-ink-soft">
                  {formatPrice(item.price * item.quantity)}
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
        summary={{ itemsQuantity, totalPrice }}
      />
    </Container>
  );
}
