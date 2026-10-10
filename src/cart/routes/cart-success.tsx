import { useEffect } from "react";
import { redirect, useNavigate } from "react-router";
import { FiArrowRight, FiCheck, FiCreditCard, FiMail, FiMapPin, FiPackage, FiTruck } from "react-icons/fi";
import { BsInboxes } from "react-icons/bs";
import Container from "../../shared/ui/Container";
import { formatPrice } from "../../shared/utilities/format-price";
import { parse } from "cookie";
import Cookie from "js-cookie";
import type { Route } from "./+types/cart-success";
import useCart from "../hooks/useCart";
import { useStepsStorage } from "../storage/steps";
import SuccessSkeleton from "../components/SuccessSkeleton";
import {
  CHECKOUT_ACCESS_TOKEN_STORAGE_KEY,
  PAID_CHECKOUT_ACCESS_TOKEN_STORAGE_KEY,
  getCheckoutAccessToken,
  getCheckoutSummary,
  getPaidCheckoutAccessToken,
} from "../api/paymentsApi";

export async function loader({ request }: Route.LoaderArgs) {
  const transactionId = parse(request.headers.get('Cookie') || '').transactionId;
  return { transactionId: transactionId ?? null };
}

export async function clientLoader({ serverLoader }: Route.ClientLoaderArgs) {
  const { transactionId } = await serverLoader();
  const checkoutAccessToken = getCheckoutAccessToken() ?? getPaidCheckoutAccessToken();
  if (!transactionId || !checkoutAccessToken) return redirect("/cart");

  const summary = await getCheckoutSummary(transactionId, checkoutAccessToken).catch(() => null);
  if (!summary) return redirect("/cart");
  if (summary.status === "PENDING" || summary.status === "PROCESSING") return redirect("/cart/payment");
  if (summary.status === "REJECTED") return redirect("/cart/cancel");

  return { transactionId, summary };
}

clientLoader.hydrate = true as const;

export function HydrateFallback() {
  return <SuccessSkeleton />;
}

export default function CartSuccess({ loaderData }: Route.ComponentProps) {
  const { transactionId } = loaderData;
  const { clear } = useCart();
  const { clearSteps } = useStepsStorage();
  const navigate = useNavigate();
  const summary = "summary" in loaderData ? loaderData.summary : null;

  const email = summary?.customer?.userEmail;
  const address = summary?.selectedAddress;
  const orderNumber = transactionId ? `#${transactionId.slice(0, 8).toUpperCase()}` : null;

  const leave = (to: string) => {
    Cookie.remove("transactionId");
    sessionStorage.removeItem(CHECKOUT_ACCESS_TOKEN_STORAGE_KEY);
    sessionStorage.removeItem(PAID_CHECKOUT_ACCESS_TOKEN_STORAGE_KEY);
    navigate(to);
  };

  const nextSteps = [
    { icon: FiCreditCard, title: "Confirmamos tu pago", text: "Stripe nos avisa en unos minutos.", current: true },
    { icon: FiPackage, title: "Preparamos tu pedido", text: "Sale de bodega en menos de 24 horas." },
    { icon: FiTruck, title: "Llega a tu casa", text: "Con envío gratis a todo el país." },
  ];

  useEffect(() => {
    const checkoutAccessToken = getCheckoutAccessToken();
    if (checkoutAccessToken) sessionStorage.setItem(PAID_CHECKOUT_ACCESS_TOKEN_STORAGE_KEY, checkoutAccessToken);
    sessionStorage.removeItem(CHECKOUT_ACCESS_TOKEN_STORAGE_KEY);
    clear();
    clearSteps();
  }, []);

  return (
    <Container className="flex flex-col items-center py-12 lg:py-16">
      <span className="relative grid h-20 w-20 place-items-center rounded-full bg-success text-white">
        <span className="absolute inset-0 animate-ping rounded-full bg-success/30 motion-reduce:animate-none" />
        <FiCheck size={38} strokeWidth={3} className="relative" />
      </span>

      <h1 className="mt-6 text-center text-4xl font-extrabold text-ink">¡Gracias por tu compra!</h1>
      <p className="mt-2 max-w-lg text-center text-ink-soft">
        Recibimos tu pedido y estamos confirmando el pago.
        {email && <> Te enviamos la confirmación a <b className="text-ink">{email}</b>.</>}
      </p>

      <div className="mt-10 grid w-full max-w-4xl items-start gap-5 md:grid-cols-[1.2fr_1fr]">
        <section className="rounded-2xl border border-line p-5 sm:p-6">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs font-extrabold uppercase tracking-[0.08em] text-brand">Tu pedido</p>
              {orderNumber && <p className="mt-1 text-2xl font-extrabold tracking-wide text-ink">{orderNumber}</p>}
            </div>
            <span className="rounded-full bg-success/10 px-3 py-1 text-xs font-bold text-success">Pedido recibido</span>
          </div>

          {summary?.items?.length ? (
            <>
              <ul className="mt-4 flex flex-col divide-y divide-line border-y border-line text-sm">
                {summary.items.map(item => (
                  <li key={item.id} className="flex justify-between gap-4 py-2.5">
                    <span className="min-w-0 truncate text-ink">
                      {item.productName} <span className="text-ink-muted">× {item.quantity}</span>
                    </span>
                    <span className="shrink-0 font-semibold text-ink">{formatPrice(item.price * item.quantity)}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-3 flex items-center justify-between text-sm">
                <span className="text-ink-soft">Envío</span>
                <span className="font-bold text-success">Gratis</span>
              </div>
              <div className="mt-2 flex items-end justify-between">
                <span className="font-bold text-ink">Total</span>
                <span className="text-2xl font-extrabold text-ink">{formatPrice(summary.totalPrice)}</span>
              </div>
            </>
          ) : (
            <p className="mt-4 text-sm text-ink-soft">
              Guarda este número: con él puedes preguntar por tu pedido.
            </p>
          )}

          {(address || email) && (
            <ul className="mt-5 flex flex-col gap-2 rounded-xl bg-cream p-4 text-sm text-ink-soft">
              {address && (
                <li className="flex gap-2.5">
                  <FiMapPin size={16} className="mt-0.5 shrink-0 text-brand" />
                  <span>
                    <b className="text-ink">{address.addressName}</b> · {address.address}, {address.city},{" "}
                    {address.country}
                  </span>
                </li>
              )}
              {email && (
                <li className="flex items-center gap-2.5">
                  <FiMail size={16} className="shrink-0 text-brand" />
                  {email}
                </li>
              )}
            </ul>
          )}
        </section>

        <section className="rounded-2xl bg-brand-soft/70 p-5 sm:p-6">
          <p className="text-xs font-extrabold uppercase tracking-[0.08em] text-brand">¿Qué sigue?</p>
          <ol className="mt-4 flex flex-col">
            {nextSteps.map(({ icon: Icon, title, text, current }, index) => (
              <li key={title} className="relative flex gap-3.5 pb-5 last:pb-0">
                {index < nextSteps.length - 1 && (
                  <span aria-hidden className="absolute left-4.75 top-10 h-[calc(100%-2.5rem)] w-0.5 bg-brand/20" />
                )}
                <span className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${
                  current ? "bg-brand text-white" : "bg-base-100 text-brand"
                }`}>
                  <Icon size={17} />
                </span>
                <span className="pt-1 leading-tight">
                  <b className="block text-ink">{title}</b>
                  <span className="text-sm text-ink-soft">{text}</span>
                </span>
              </li>
            ))}
          </ol>

          <div className="mt-6 flex flex-col gap-2.5">
            <button
              type="button"
              onClick={() => leave("/")}
              className="flex h-12 items-center justify-center gap-2 rounded-full bg-brand font-bold text-white
                transition-colors hover:bg-ink"
            >
              Seguir comprando
              <FiArrowRight size={17} />
            </button>
            <button
              type="button"
              onClick={() => leave("/profile")}
              className="flex h-11 items-center justify-center gap-2 rounded-full border border-brand/25 bg-base-100
                font-bold text-ink transition-colors hover:border-ink"
            >
              <BsInboxes size={16} />
              Mis compras
            </button>
          </div>
        </section>
      </div>
    </Container>
  );
}
