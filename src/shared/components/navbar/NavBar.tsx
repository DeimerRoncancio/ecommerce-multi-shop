import { NavLink } from "react-router";
import { IoMdHeartEmpty } from "react-icons/io";
import CartButton from "./CartButton";
import ProfileButton from "./ProfileButton";
import Search from "./Search";
import MenuButton from "./MenuButton";

export default function NavBar() {
  return (
    <nav className="flex border-b-[1px] h-fit p-3 px-4 border-[#f1e1dc]">
      <ul className="w-1/3 gap-16 flex">
        <NavLink to="/" className="w-1/4 my-auto btn btn-link p-0">
          <img src='src\assets\images\logo.webp' />
        </NavLink>
        <MenuButton />
      </ul>

      <ul className="w-1/3 flex justify-center items-center">
        <Search />
      </ul>

      <ul className="flex-row-reverse gap-0 flex items-center w-1/3">
        <li className="px-4 h-full flex items-center">
          <CartButton />
        </li>
        <li className="flex h-full px-4 items-center border-r-[1px] border-[#a2a9b1] text-[#a2a9b1]">
          <button className="btn btn-ghost w-10 h-10 p-0 rounded-full text-[#343e49]">
            <IoMdHeartEmpty size={32} />
          </button>
        </li>
        <li className="flex h-full px-4 items-center border-r-[1px] border-[#a2a9b1] text-[#a2a9b1]">
          <button className="flex flex-col p-0 btn btn-link decoration-transparent items-start text-[#343e49] 
              hover:text-[#343e499f] gap-0 font-semibold text-base">
            <span className="p-0 m-0 leading-4">Mis</span>
            <span className="p-0 m-0 leading-4">compras</span>
          </button>
        </li>
        <li className="flex h-full items-center border-r-[1px] border-[#a2a9b1] px-4 text-[#a2a9b1]">
          <ProfileButton size={40} />
        </li>
      </ul>
    </nav>
  );
}
