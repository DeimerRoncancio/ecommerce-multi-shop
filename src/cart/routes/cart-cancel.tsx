import { useNavigate } from "react-router";
import { FiArrowLeft, FiRefreshCw, FiShield, FiShoppingCart, FiX } from "react-icons/fi";
import Container from "../../shared/ui/Container";
import { formatPrice } from "../../shared/utilities/format-price";
import { parse } from "cookie";
import type { Route } from "./+types/cart-cancel";
import useCart from "../hooks/useCart";
import {
  CHECKOUT_ACCESS_TOKEN_STORAGE_KEY,
  cancelPaymentSession,
} from "../api/paymentsApi";
import Cookie from "js-cookie";

export async function loader({ request }: Route.LoaderArgs) {
  const transactionId = parse(request.headers.get('Cookie') || '').transactionId;
  return { transactionId: transactionId ?? null };
}

export async function clientLoader({ serverLoader }: Route.ClientLoaderArgs) {
  const { transactionId } = await serverLoader();
  const checkoutAccessToken = sessionStorage.getItem(
    CHECKOUT_ACCESS_TOKEN_STORAGE_KEY,
  );

  if (transactionId && checkoutAccessToken)
    await cancelPaymentSession(transactionId, checkoutAccessToken).catch(() => undefined);

  return { transactionId };
}

clientLoader.hydrate = true as const;

export default function CartCancel({ loaderData }: Route.ComponentProps) {
  const { transactionId } = loaderData;
  const hasPendingTransaction = Boolean(transactionId);
  const { cartItems, itemsQuantity, totalPrice } = useCart();
  const navigate = useNavigate();

  const leave = (to: string) => {
    navigate(to);
    Cookie.remove("transactionId");
    sessionStorage.removeItem(CHECKOUT_ACCESS_TOKEN_STORAGE_KEY);
  };

  return (
    <Container className="flex flex-col items-center py-12 lg:py-16">
      <span className="grid h-20 w-20 place-items-center rounded-full bg-error/10 text-error ring-8 ring-error/5">
        <FiX size={38} strokeWidth={3} />
      </span>

      <h1 className="mt-6 text-center text-4xl font-extrabold text-ink">Pago cancelado</h1>
      <p className="mt-2 max-w-lg text-center text-ink-soft">
        No te hicimos <b className="text-ink">ningún cobro</b>. Tu carrito sigue guardado, así que puedes
        intentarlo de nuevo cuando quieras.
      </p>

      <section className="mt-10 w-full max-w-xl rounded-2xl border border-line p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <p className="flex items-center gap-2 text-xs font-extrabold uppercase tracking-[0.08em] text-brand">
            <FiShoppingCart size={14} />
            Tu carrito
          </p>
          <span className="text-sm font-semibold text-ink-muted">
            {itemsQuantity} {itemsQuantity === 1 ? "producto" : "productos"}
          </span>
        </div>

        {itemsQuantity > 0 ? (
          <>
            <ul className="mt-3 flex flex-col divide-y divide-line border-y border-line text-sm">
              {cartItems.map(item => (
                <li key={item.id} className="flex justify-between gap-4 py-2.5">
                  <span className="min-w-0 truncate text-ink">
                    {item.productName} <span className="text-ink-muted">× {item.quantity}</span>
                  </span>
                  <span className="shrink-0 font-semibold text-ink">
                    {formatPrice(item.productPrice * item.quantity)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="mt-3 flex items-end justify-between">
              <span className="font-bold text-ink">Total</span>
              <span className="text-2xl font-extrabold text-ink">{formatPrice(totalPrice)}</span>
            </div>
          </>
        ) : (
          <p className="mt-3 text-sm text-ink-soft">Tu carrito está vacío.</p>
        )}

        <div className="mt-6 flex flex-col gap-2.5 sm:flex-row">
          {hasPendingTransaction && (
            <button
              type="button"
              onClick={() => navigate("/cart/payment")}
              className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full bg-brand font-bold text-white
                transition-colors hover:bg-ink"
            >
              <FiRefreshCw size={16} />
              Reintentar el pago
            </button>
          )}
          <button
            type="button"
            onClick={() => leave("/cart")}
            className="flex h-12 flex-1 items-center justify-center gap-2 rounded-full border border-line font-bold
              text-ink transition-colors hover:border-ink"
          >
            <FiShoppingCart size={16} />
            Volver al carrito
          </button>
        </div>
      </section>

      <p className="mt-5 flex items-center gap-2 text-sm text-ink-muted">
        <FiShield size={15} className="text-success" />
        Tus datos de pago nunca pasan por Multi Shop: los maneja Stripe.
      </p>

      <button
        type="button"
        onClick={() => leave("/")}
        className="mt-3 flex items-center gap-1.5 text-sm font-bold text-ink-soft transition-colors hover:text-brand"
      >
        <FiArrowLeft size={15} />
        Seguir comprando
      </button>
    </Container>
  );
}
