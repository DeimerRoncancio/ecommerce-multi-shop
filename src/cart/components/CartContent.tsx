import { useEffect } from "react";
import useCart from "../hooks/useCart";
import CartItem from "./CartItem";
import ClearButton from "./ClearButton";
import PaymentCardInfo from "./PaymentCardInfo";

export default function CartContent() {
  const { items, itemsQuantity, loadItemsFromStorage } = useCart();

  useEffect(() => {
    if (!items.length) loadItemsFromStorage();
  }, [])

  return (
    <>
      <div className="flex m-10 mt-15 gap-10">
        <div className="flex flex-col w-[70%]">
          <div className="flex justify-between mb-5 items-center">
            <div className="flex gap-1 items-center">
              <h1 className="text-2xl text-[#333333] font-semibold">Carrito</h1>
              <h1 className="text-lg text-[#4a4a4a]">({itemsQuantity} productos)</h1>
            </div>
            <div>
              <ClearButton fontSize={16} />
            </div>
          </div>

          <ul>
            {
              !itemsQuantity ?
                <li className="flex items-center justify-center text-[#646464] text-xl w-full h-40">
                  <p className="text-center">No tienes productos en tu carrito</p>
                </li> :
                items.map((item, index) =>
                  <CartItem key={item.id} item={item} length={items.length} index={index} />
                )
            }
          </ul>
        </div>

        <div className="w-[30%]">
          <div className="mb-5">
            <h2 className="text-2xl text-[#333333] font-semibold">Resumen de la compra</h2>
          </div>
          <PaymentCardInfo />
        </div>
      </div>
    </>
  )
}
