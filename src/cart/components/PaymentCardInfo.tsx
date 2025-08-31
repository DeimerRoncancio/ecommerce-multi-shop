import useCart from "../hooks/useCart";
import PaymentInfoItem from "./PaymentInfoItem";
import { useNavigate } from "react-router";
import CartButton from "./CartButton";

type PaymentCardInfoProps = {
  onContinue: () => void;
  disabledContinue?: boolean;
};

export default function PaymentCardInfo({ onContinue, disabledContinue }: PaymentCardInfoProps) {
  const { itemsQuantity, totalPrice } = useCart();
  const navigate = useNavigate();

  return (
    <>
      <div className="mb-5">
        <h2 className="text-[#333333] text-xl">Resumen de la compra</h2>
      </div>
      <div className="text-[#5a5a5a] sticky top-5 bg-[#f3e2e27e] rounded-xl">
        <div className="flex gap-1 p-4 border-b-1 border-[#e1e1e1]">
          <p className="font-semibold">Productos</p>
          <p className="font-semibold">({itemsQuantity})</p>
        </div>

        <ul className="my-2">
          <PaymentInfoItem isMain={false} label="Valor productos" value={totalPrice} />
          <PaymentInfoItem isMain={false} label="Descuentos" value={-160000} />
          <PaymentInfoItem isMain label="Total" value={totalPrice} />
        </ul>

        <div className="flex flex-col gap-4 px-4 pt-2 pb-4">
          <CartButton totalPrice={totalPrice} onContinue={onContinue} disabled={disabledContinue} />
          <button className="btn btn-wide py-5 max-w-full w-full rounded" onClick={() => navigate("/")}>
            Seguir comprando
          </button>
        </div>
      </div>
    </>
  )
}
