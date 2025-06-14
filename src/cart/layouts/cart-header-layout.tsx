import { MdOutlineShoppingBag, MdOutlineShoppingCart } from "react-icons/md";
import CartStepsItem from "../components/CartStepsItem";
import { BsPerson } from "react-icons/bs";
import { FaDollarSign } from "react-icons/fa6";
import { Outlet } from "react-router";

export default function CartHeaderLayout() {
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
      <Outlet />
    </>
  )
}