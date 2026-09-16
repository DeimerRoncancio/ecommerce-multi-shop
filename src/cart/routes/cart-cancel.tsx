import { useNavigate } from "react-router";
import { IoCloseOutline } from "react-icons/io5";
import { MdOutlineShoppingCart } from "react-icons/md";
import { parse } from "cookie";
import type { Route } from "./+types/cart-cancel";
import useCart from "../hooks/useCart";
import {
  CHECKOUT_ACCESS_TOKEN_STORAGE_KEY,
  payments,
} from "../api/paymentsApi";
import Cookie from "js-cookie";

export async function loader({ request }: Route.LoaderArgs) {
  const transactionId = parse(request.headers.get('Cookie') || '').transactionId;
  if (!transactionId) return { hasPendingTransaction: false };

  await payments.put(`/add-transaction-date/${transactionId}`, new Date() );
  await payments.put(`/set-status/${transactionId}/REJECTED`);

  return { hasPendingTransaction: Boolean(transactionId) };
}

export default function CartCancel({ loaderData }: Route.ComponentProps) {
  const { hasPendingTransaction } = loaderData;
  const { itemsQuantity } = useCart();
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center text-center gap-6 py-24 px-4">
      <span className="flex items-center justify-center w-24 h-24 rounded-full bg-[#fef2f2] text-[#ef4444]">
        <IoCloseOutline size={52} />
      </span>

      <div className="flex flex-col gap-3">
        <h1 className="text-[#333333] text-3xl">Pago cancelado</h1>
        <p className="text-[#636669] max-w-125">
          No se realizó ningún cobro. Tu carrito sigue como lo dejaste
          {itemsQuantity > 0 && <>, con <b className="text-[#5e472d]">{itemsQuantity} producto{itemsQuantity === 1 ? '' : 's'}</b></>},
          así que puedes retomar la compra cuando quieras.
        </p>
      </div>

      <div className="flex gap-4 mt-2">
        {hasPendingTransaction && (
          <button
            className="btn btn-accent py-5 px-8 rounded"
            onClick={() => navigate("/cart/payment")}
          >
            Reintentar el pago
          </button>
        )}
        <button
          className="btn py-5 px-8 rounded"
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
        className="btn btn-link text-[#7d7d7d] hover:text-[#f14913] decoration-transparent"
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
