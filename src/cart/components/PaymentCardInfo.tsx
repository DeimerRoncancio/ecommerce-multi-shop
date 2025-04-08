import { PiCurrencyDollarSimpleBold } from "react-icons/pi";
import useCart from "../hooks/useCart";
import PaymentInfoItem from "./PaymentInfoItem";
import { useNavigate } from "react-router";

export default function PaymentCardInfo() {
  const { itemsQuantity, totalPrice } = useCart();
  const navigate = useNavigate();
  
  return (
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
        <button className="btn btn-accent py-5 w-full rounded">
          Pagar/ Total
          <p className="flex items-center">
            <PiCurrencyDollarSimpleBold color="#ffd6a7" size={15} />
            {new Intl.NumberFormat("es-ES").format(totalPrice)}
          </p>
        </button>
        <button className="btn btn-wide py-5 max-w-full w-full rounded" onClick={() => navigate("/")}>
          Seguir comprando
        </button>
      </div>
    </div>
  )
}
