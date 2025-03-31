import { NavLink, Outlet } from "react-router";
import { IoMdHeartEmpty } from "react-icons/io";
import ProfileButton from "./ProfileButton";
import CartButton from "./CartButton";

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
          <div className="flex justify-center items-center">
            <label className="btn btn-circle swap swap-rotate bg-transparent w-9 border-none shadow-none text-[#343e49] 
            hover:bg-transparent hover:border-none">
              <input type="checkbox" />
              <svg
                className="swap-off fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 512 512">
                <path d="M64,384H448V341.33H64Zm0-106.67H448V234.67H64ZM64,128v42.67H448V128Z" />
              </svg>
              <svg
                className="swap-on fill-current"
                xmlns="http://www.w3.org/2000/svg"
                width="30"
                height="30"
                viewBox="0 0 512 512">
                <polygon
                  points="400 145.49 366.51 112 256 222.51 145.49 112 112 145.49 222.51 256 112 366.51 145.49 400 256 289.49 366.51 400 400 366.51 289.49 256 400 145.49" />
              </svg>
              <text className="text-2xl ml-10 font-medium text-[#343e49]">Menú</text>
            </label>
          </div>
        </ul>
        <ul className="w-1/3 flex justify-center items-center">
          <div className="w-full flex border-[1px] border-gray-700 rounded-full ps-6 justify-between">
            <input placeholder="Busca en Multi Shop" className="flex-1 placeholder:text-lg placeholder:text-[#8a949c]
            outline-none bg-[#f8fdef]"/>
            <button className="btn btn-ghost w-15 h-15 min-h-0 btn-circle p-2 border-white text-white bg-gray-700
            hover:bg-gray-800">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" className="w-full h-full" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>
          </div>
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
