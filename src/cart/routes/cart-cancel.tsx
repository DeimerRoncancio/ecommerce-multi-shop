import { useNavigate } from "react-router";
import { IoCloseOutline } from "react-icons/io5";
import { MdOutlineShoppingCart } from "react-icons/md";
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
  const { itemsQuantity } = useCart();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center gap-6 px-4 py-20 text-center lg:py-28">
      <span className="grid h-24 w-24 place-items-center rounded-full bg-error/10 text-error">
        <IoCloseOutline size={52} />
      </span>

      <div className="flex flex-col gap-3">
        <h1 className="font-display text-3xl font-bold text-ink">Pago cancelado</h1>
        <p className="max-w-lg text-ink-soft">
          No se realizó ningún cobro. Tu carrito sigue como lo dejaste
          {itemsQuantity > 0 && <>, con <b className="font-semibold text-ink">{itemsQuantity} producto{itemsQuantity === 1 ? '' : 's'}</b></>},
          así que puedes retomar la compra cuando quieras.
        </p>
      </div>

      <div className="mt-2 flex flex-wrap justify-center gap-3">
        {hasPendingTransaction && (
          <button
            className="btn h-12 gap-2 rounded-xl border-0 bg-brand px-7 text-primary-content shadow-none hover:bg-brand-dark"
            onClick={() => navigate("/cart/payment")}
          >
            Reintentar el pago
          </button>
        )}
        <button
          className="btn h-12 gap-2 rounded-xl border border-line bg-base-100 px-7 text-ink shadow-none hover:bg-cream"
          onClick={() => {
            navigate("/cart")
            Cookie.remove("transactionId");
            sessionStorage.removeItem(CHECKOUT_ACCESS_TOKEN_STORAGE_KEY);
          }}
        >
          <MdOutlineShoppingCart size={17} />
          Volver al carrito
        </button>
      </div>

      <button
        className="text-sm text-ink-muted transition-colors hover:text-brand"
        onClick={() => {
          navigate("/")
          Cookie.remove("transactionId");
          sessionStorage.removeItem(CHECKOUT_ACCESS_TOKEN_STORAGE_KEY);
        }}
      >
        Seguir comprando
      </button>
    </div>
  );
}
