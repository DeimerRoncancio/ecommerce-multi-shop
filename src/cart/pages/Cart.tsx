import { NavLink } from "react-router";
import { MdOutlineShoppingCart } from "react-icons/md";
import { MdOutlineShoppingBag } from "react-icons/md";
import { FaDollarSign } from "react-icons/fa6";
import { BsPerson } from "react-icons/bs";
import ProfileButton from "../../shared/components/navbar/ProfileButton";
import { IoMdHeartEmpty } from "react-icons/io";
import { GiPadlock } from "react-icons/gi";

export default function Cart() {
  return (
    <div>
      <header className="flex w-full bg-[#ffece5] p-1 px-4">
        <ul className="w-1/3 gap-16 flex">
          <NavLink to="/" className="w-13 pl-4 z-10">
            <button className="btn btn-link p-0">
              <img src='src\assets\images\logo-bag.webp' />
            </button>
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
      <div className="w-full flex items-start gap-8 justify-center p-10">
        <div className="flex flex-col gap-2 justify-center items-center">
          <button className="bg-[#f14913] p-1 rounded-full">
            <MdOutlineShoppingCart color="white" size={25} />
          </button>
          <p className="text-[#5a5a5a] font-semibold">Carrito</p>
        </div>
        <span className="relative w-[140px] h-[2.5px] top-[18px] rounded-full bg-[#f14913]"></span>
        <div className="flex flex-col gap-2 justify-center items-center">
          <button className="p-1 rounded-full">
            <BsPerson color="#9a9a9a" size={25} />
          </button>
          <p className="text-[#9a9a9a] font-sans">Datos</p>
        </div>
        <span className="relative w-[140px] h-[2.5px] top-[18px] rounded-full bg-[#f3e2e2]"></span>
        <div className="flex flex-col gap-2 justify-center items-center">
          <button className="p-1 rounded-full">
            <MdOutlineShoppingBag color="#9a9a9a" size={25} />
          </button>
          <p className="text-[#9a9a9a] font-sans">Entrega</p>
        </div>
        <span className="relative w-[140px] h-[2.5px] top-[18px] rounded-full bg-[#f3e2e2]"></span>
        <div className="flex flex-col gap-2 justify-center items-center">
          <button className="p-1 rounded-full">
            <FaDollarSign color="#9a9a9a" size={25} />
          </button>
          <p className="text-[#9a9a9a] font-sans">Pago</p>
        </div>
      </div>
    </div>
  )
}
