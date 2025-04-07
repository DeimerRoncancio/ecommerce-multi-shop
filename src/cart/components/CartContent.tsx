import { useEffect } from "react";
import { PiCurrencyDollarSimpleBold } from "react-icons/pi";
import useCart from "../hooks/useCart";
import CartItem from "./CartItem";
import { LiaDollarSignSolid } from "react-icons/lia";
import { useNavigate } from "react-router";
import ClearButton from "./ClearButton";

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
          <li className="text-[#5a5a5a] sticky top-5 bg-[#f3e2e27e] py-4 rounded-xl">
            <div className="flex gap-1 pb-3 px-4 border-b-1 border-[#e1e1e1]">
              <p className="font-semibold">Productos</p>
              <p className="font-semibold">({itemsQuantity})</p>
            </div>
            <div className="flex flex-col mt-3 px-4 gap-2 text-sm">
              <div className="flex justify-between">
                <p>Total productos</p>
                <p className="flex items-center">
                  <LiaDollarSignSolid color="#5a5a5a" size={17} />
                  {new Intl.NumberFormat("es-ES").format(totalPrice)}
                </p>
              </div>
              <div className="flex justify-between">
                <p>Descuentos</p>
                <p className="flex items-center">
                  <LiaDollarSignSolid color="#5a5a5a" size={17} />
                  {new Intl.NumberFormat("es-ES").format(-120000)}
                </p>
              </div>
            </div>
            <div className="flex justify-between px-4 bg-[#f3e2e2c9] gap-1 my-3 py-2">
              <p className="font-semibold">Total</p>
              <p className="flex items-center">
                <LiaDollarSignSolid color="#5a5a5a" size={17} />
                {new Intl.NumberFormat("es-ES").format(totalPrice)}
              </p>
            </div>
            <div className="flex flex-col gap-4 px-4">
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
