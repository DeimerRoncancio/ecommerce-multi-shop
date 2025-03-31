import { NavLink, Outlet } from "react-router";
import { IoMdHeartEmpty } from "react-icons/io";
import CartButton from "./CartButton";
import ProfileButton from "./ProfileButton";
import Search from "./Search";
import MenuButton from "./MenuButton";

export default function NavBar() {
  return (
    <>
      <nav className="flex border-b-[1px] p-3 px-4 border-[#f1e1dc]">
        <ul className="w-1/3 gap-16 flex">
          <NavLink to="/" className="w-1/4 flex flex-col">
            <button className="btn p-0 bg-transparent hover:bg-transparent border-transparent hover:border-transparent
              shadow-transparent">
              <img src='src\assets\images\logo-with-bag.webp' />
            </button>
          </NavLink>
          <MenuButton />
        </ul>
        <ul className="w-1/3 flex justify-center items-center">
          <Search/>
        </ul>
        <ul className="flex-row-reverse gap-0 flex items-center w-1/3">
          <li>
            <CartButton />
          </li>
          <li className="flex items-center border-r-[1px] border-[#a2a9b1] h-5/6 px-4 text-[#a2a9b1]">
            <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
              <div className="w-10 rounded-full flex justify-center text-[35px] text-[#343e49]">
                <IoMdHeartEmpty />
              </div>
            </div>
          </li>
          <li className="flex items-center h-5/6 border-r-[1px] border-[#a2a9b1] px-4 text-[#a2a9b1]">
            <div>
              <button className="flex flex-col items-start text-[#343e49] hover:text-[#343e499f] font-medium text-xl">
                <span className="p-0 m-0 leading-4">Mis</span>
                <span className="p-0 m-0 leading-4">compras</span>
              </button>
            </div>
          </li>
          <li>
            <ProfileButton />
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
}
