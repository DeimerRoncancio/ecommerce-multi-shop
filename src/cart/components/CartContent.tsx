import { useEffect } from "react";
import { PiCurrencyDollarSimpleBold } from "react-icons/pi";
import useCart from "../hooks/useCart";
import CartItem from "./CartItem";
import { useNavigate } from "react-router";
import ClearButton from "./ClearButton";
import PaymentInfoItem from "./PaymentInfoItem";

export default function CartContent() {
  const { items, itemsQuantity, totalPrice, loadItemsFromStorage } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    if (!items.length) loadItemsFromStorage();
  }, [])

  return (
    <>
      <div className="flex m-10 mt-15 gap-10">
        <ul className="flex flex-col w-[70%]">
          <li className="flex justify-between mb-5 items-center">
            <div className="flex gap-1 items-center">
              <h1 className="text-2xl text-[#333333] font-semibold">Carrito</h1>
              <h1 className="text-lg text-[#4a4a4a]">({itemsQuantity} productos)</h1>
            </div>

            <div>
              <ClearButton fontSize={16} />
            </div>
          </li>

          {
            !itemsQuantity ?
              <div className="flex items-center justify-center text-[#646464] text-xl w-full h-40">
                <p className="text-center">No tienes productos en tu carrito</p>
              </div> :
              items.map((item, index) =>
                <CartItem key={item.id} item={item} length={items.length} index={index} />
              )
          }
        </ul>
        <ul className="w-[30%]">
          <li className="mb-5">
            <h2 className="text-2xl text-[#333333] font-semibold">Resumen de la compra</h2>
          </li>
          <li className="text-[#5a5a5a] sticky top-5 bg-[#f3e2e27e] rounded-xl">
            <div className="flex gap-1 p-4 border-b-1 border-[#e1e1e1]">
              <p className="font-semibold">Productos</p>
              <p className="font-semibold">({itemsQuantity})</p>
            </div>
            <div className="my-2">
              <PaymentInfoItem isMain={false} label="Valor productos" value={totalPrice} />
              <PaymentInfoItem isMain={false} label="Descuentos" value={-160000} />
              <PaymentInfoItem isMain label="Total" value={totalPrice}/>
            </div>
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
          </li>
        </ul>
      </div>
    </>
  )
}
