import { useEffect } from "react";
import { useNavigate } from "react-router";
import { FaCheck } from "react-icons/fa6";
import { BsInboxes } from "react-icons/bs";
import { parse } from "cookie";
import Cookie from "js-cookie";
import type { Route } from "./+types/cart-success";
import useCart from "../hooks/useCart";
import { useOrderStorage } from "../storage/orders";
import { useStepsStorage } from "../storage/steps";
import { payments } from "../api/paymentsApi";

export async function loader({ request }: Route.LoaderArgs) {
  const transactionId = parse(request.headers.get('Cookie') || '').transactionId;
  if (!transactionId) return { transactionId: null };

  await payments.put(`/add-transaction-date/${transactionId}`, new Date() );
  await payments.put(`/set-status/${transactionId}/APPROVED`);

  return { transactionId };
}

export default function CartSuccess({ loaderData }: Route.ComponentProps) {
  const { transactionId } = loaderData;
  const { clear } = useCart();
  const { order, cleanOrder } = useOrderStorage();
  const { clearSteps } = useStepsStorage();
  const navigate = useNavigate();

  const email = order.user.email;

  useEffect(() => {
    clear();
    cleanOrder();
    clearSteps();
  }, []);

  return (
    <div className="flex flex-col items-center text-center gap-6 py-24 px-4">
      <span className="flex items-center justify-center w-24 h-24 rounded-full bg-[#e9fff0] text-[#0cc243]">
        <FaCheck size={44} />
      </span>

      <div className="flex flex-col gap-3">
        <h1 className="text-[#333333] text-3xl">¡Gracias por tu compra!</h1>
        <p className="text-[#636669] max-w-125">
          Tu pago se procesó correctamente y ya estamos preparando tu pedido.
          {email && <> Te enviamos la confirmación a <b className="text-[#5e472d]">{email}</b>.</>}
        </p>
      </div>

      {transactionId && (
        <div className="flex flex-col gap-1 px-8 py-4 border-1 border-[#dedfdf] rounded-xl">
          <span className="text-sm text-[#7d7d7d]">Número de pedido</span>
          <span className="text-lg font-semibold text-[#5e472d] tracking-wide">
            #{transactionId.slice(0, 8).toUpperCase()}
          </span>
        </div>
      )}

      <div className="flex gap-4 mt-2">
        <button
          className="btn btn-accent py-5 px-8 rounded"
          onClick={() => {
            Cookie.remove("transactionId");
            navigate("/");
          }}
        >
          Seguir comprando
        </button>
        <button
          className="btn py-5 px-8 rounded"
          onClick={() => {
            Cookie.remove("transactionId");
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
