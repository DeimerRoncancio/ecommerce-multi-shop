import { useEffect } from "react";
import { PiCurrencyDollarSimpleBold } from "react-icons/pi";
import useCart from "../hooks/useCart";
import CartStepsItem from "./CartStepsItem";
import { MdOutlineShoppingBag, MdOutlineShoppingCart } from "react-icons/md";
import { BsPerson } from "react-icons/bs";
import { FaDollarSign } from "react-icons/fa6";
import { AiOutlineClear } from "react-icons/ai";
import CartItem from "./CartItem";
import { LiaDollarSignSolid } from "react-icons/lia";

export default function CartContent() {
  const { items, itemsQuantity, totalPrice, clear, loadItemsFromStorage } = useCart();

  useEffect(() => {
    if (!items.length) loadItemsFromStorage();
  }, [])

  return (
    <>
      <header className="w-full flex items-start gap-8 justify-center p-10 pb-6 mt-10">
        <CartStepsItem isComplete step="Carrito" Icon={MdOutlineShoppingCart} />
        <span className="relative w-[140px] h-[2.5px] top-[18px] rounded-full bg-[#f14913]"></span>
        <CartStepsItem isComplete={false} step="Datos" Icon={BsPerson} />
        <span className="relative w-[140px] h-[2.5px] top-[18px] rounded-full bg-[#f3e2e2]"></span>
        <CartStepsItem isComplete={false} step="Entrega" Icon={MdOutlineShoppingBag} />
        <span className="relative w-[140px] h-[2.5px] top-[18px] rounded-full bg-[#f3e2e2]"></span>
        <CartStepsItem isComplete={false} step="Pago" Icon={FaDollarSign} />
      </header>

      <div className="flex m-10 mt-15 gap-10">
        <ul className="flex flex-col w-[70%]">
          <li className="flex justify-between mb-5 items-center">
            <div className="flex gap-1 items-center">
              <h1 className="text-2xl text-[#333333] font-semibold">Carrito</h1>
              <h1 className="text-lg text-[#4a4a4a]">({itemsQuantity} productos)</h1>
            </div>

            <div>
              <button className="btn btn-link btn-block p-0 m-0 h-fit text-base text-[#646464] hover:text-black"
                onClick={clear}>
                <AiOutlineClear />
                Limpiar carrito
              </button>
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
          <li className="text-[#5a5a5a] bg-[#f3e2e27e] py-4 rounded-xl">
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
              <button className="btn btn-wide py-5 max-w-full w-full rounded">Seguir comprando</button>
            </div>
          </li>
        </ul>
      </div>
    </>
  )
}
