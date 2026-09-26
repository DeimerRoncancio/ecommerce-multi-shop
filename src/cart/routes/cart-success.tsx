import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { FaCheck } from "react-icons/fa6";
import { BsInboxes } from "react-icons/bs";
import { parse } from "cookie";
import Cookie from "js-cookie";
import type { Route } from "./+types/cart-success";
import useCart from "../hooks/useCart";
import { useStepsStorage } from "../storage/steps";
import {
  CHECKOUT_ACCESS_TOKEN_STORAGE_KEY,
  getCheckoutSummary,
  type CheckoutSummaryResponse,
} from "../api/paymentsApi";

export async function loader({ request }: Route.LoaderArgs) {
  const transactionId = parse(request.headers.get('Cookie') || '').transactionId;
  return { transactionId: transactionId ?? null };
}

export default function CartSuccess({ loaderData }: Route.ComponentProps) {
  const { transactionId } = loaderData;
  const { clear } = useCart();
  const { clearSteps } = useStepsStorage();
  const navigate = useNavigate();
  const [summary, setSummary] = useState<CheckoutSummaryResponse | null>(null);

  const email = summary?.customer?.userEmail;

  useEffect(() => {
    const checkoutAccessToken = sessionStorage.getItem(
      CHECKOUT_ACCESS_TOKEN_STORAGE_KEY,
    );

    if (transactionId && checkoutAccessToken) {
      getCheckoutSummary(transactionId, checkoutAccessToken)
        .then(setSummary)
        .catch(() => undefined)
        .finally(() =>
          sessionStorage.removeItem(CHECKOUT_ACCESS_TOKEN_STORAGE_KEY),
        );
    } else {
      sessionStorage.removeItem(CHECKOUT_ACCESS_TOKEN_STORAGE_KEY);
    }

    clear();
    clearSteps();
  }, []);

  return (
    <div className="flex flex-col items-center gap-6 px-4 py-20 text-center lg:py-28">
      <span className="grid h-24 w-24 place-items-center rounded-full bg-success/10 text-success">
        <FaCheck size={44} />
      </span>

      <div className="flex flex-col gap-3">
        <h1 className="font-display text-3xl font-bold text-ink">¡Gracias por tu compra!</h1>
        <p className="max-w-lg text-ink-soft">
          Estamos confirmando tu pago con Stripe; en cuanto se confirme empezamos a preparar tu pedido.
          {email && <> Te enviamos la confirmación a <b className="font-semibold text-ink">{email}</b>.</>}
        </p>
      </div>

      {transactionId && (
        <div className="flex flex-col gap-1 rounded-2xl border border-line bg-base-100 px-8 py-4">
          <span className="text-sm text-ink-muted">Número de pedido</span>
          <span className="font-display text-lg font-semibold tracking-wide text-ink">
            #{transactionId.slice(0, 8).toUpperCase()}
          </span>
        </div>
      )}

      <div className="mt-2 flex flex-wrap justify-center gap-3">
        <button
          className="btn h-12 gap-2 rounded-xl border-0 bg-brand px-7 text-primary-content shadow-none hover:bg-brand-dark"
          onClick={() => {
            Cookie.remove("transactionId");
            sessionStorage.removeItem(CHECKOUT_ACCESS_TOKEN_STORAGE_KEY);
            navigate("/");
          }}
        >
          Seguir comprando
        </button>
        <button
          className="btn h-12 gap-2 rounded-xl border border-line bg-base-100 px-7 text-ink shadow-none hover:bg-cream"
          onClick={() => {
            Cookie.remove("transactionId");
            sessionStorage.removeItem(CHECKOUT_ACCESS_TOKEN_STORAGE_KEY);
            navigate("/profile");
          }}
        >
          <BsInboxes size={17} />
          Mis compras
        </button>
      </div>
    </div>
  );
}
