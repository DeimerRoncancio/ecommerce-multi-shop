import { NavLink } from "react-router";
import { MdOutlineShoppingCart } from "react-icons/md";
import { MdOutlineShoppingBag } from "react-icons/md";
import { FaDollarSign, } from "react-icons/fa6";
import { BsPerson } from "react-icons/bs";
import { IoMdHeartEmpty } from "react-icons/io";
import { GiPadlock } from "react-icons/gi";
import ProfileButton from "../../shared/components/navbar/ProfileButton";
import CartStepsItem from "../components/CartStepsItem";
import useCart from "../hooks/useCart";
import { useEffect } from "react";
import CartItem from "../components/CartItem";
import { AiOutlineClear } from "react-icons/ai";
import { LiaDollarSignSolid } from "react-icons/lia";
import { PiCurrencyDollarSimpleBold } from "react-icons/pi";

export default function Cart() {
  const { items, itemsQuantity, totalPrice, clear, loadItemsFromStorage } = useCart();

  useEffect(() => {
    if (!items.length) loadItemsFromStorage();
  }, [])

  return (
    <div>
      <header className="flex w-full bg-[#ffece59a] p-1 px-4">
        <ul className="w-1/3 gap-16 flex">
          <NavLink to="/" className="w-13 pl-4 z-10 btn btn-link p-0">
            <img src='src\assets\images\logo-bag.webp' />
          </NavLink>
        </ul>

        <ul className="w-1/3 flex z-0 gap-2 text-[#7d7d7d] font-semibold justify-center items-center">
          <div className="flex gap-1">
            <p className="text-[#9a9a9a]">Tu compra </p>
            <p className="text-[#bebebe]">es 100% segura</p>
          </div>
          <GiPadlock size={21} />
        </ul>

        <ul className="flex-row-reverse flex items-center w-1/3">
          <li className="flex px-4 items-center text-[#a2a9b1]">
            <ProfileButton size={32} />
          </li>
          <li className="flex px-4 items-center border-r-[1px] border-[#a2a9b1] text-[#a2a9b1]">
            <button className="btn btn-ghost w-8 h-8 p-0 rounded-full text-[#343e49]">
              <IoMdHeartEmpty size={26} />
            </button>
          </li>
          <li className="flex px-4 items-center h-8 border-r-[1px] border-[#a2a9b1] text-[#a2a9b1]">
            <button className="flex flex-col p-0 btn btn-link decoration-transparent items-center text-[#343e49] 
             hover:text-[#343e499f] gap-0 font-normal text-md">
              <span className="p-0 m-0">Mis compras</span>
            </button>
          </li>
        </ul>
      </header>

      <main className="m-auto">
        <div className="w-full flex items-start gap-8 justify-center p-10 pb-6 mt-10">
          <CartStepsItem isComplete step="Carrito" Icon={MdOutlineShoppingCart} />
          <span className="relative w-[140px] h-[2.5px] top-[18px] rounded-full bg-[#f14913]"></span>
          <CartStepsItem isComplete={false} step="Datos" Icon={BsPerson} />
          <span className="relative w-[140px] h-[2.5px] top-[18px] rounded-full bg-[#f3e2e2]"></span>
          <CartStepsItem isComplete={false} step="Entrega" Icon={MdOutlineShoppingBag} />
          <span className="relative w-[140px] h-[2.5px] top-[18px] rounded-full bg-[#f3e2e2]"></span>
          <CartStepsItem isComplete={false} step="Pago" Icon={FaDollarSign} />
        </div>

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
      </main>

      <footer className="px-10 py-4 flex flex-col text-[#7d7d7d]">
        <div className="w-full h-[1px] mb-4 mt-2.5 bg-[#e3e3e3]"></div>
        <div className="flex w-full justify-between">
          <p>2025 Multi Shop ® marca registrada de Grupo Efma S.A.</p>
          <div>
            <button className="btn btn-link btn-block p-0 m-0 h-fit text-base text-[#646464] hover:text-black">
              Ver terminos y condiciones
            </button>
          </div>
        </div>
      </footer>
    </div>
  )
}
