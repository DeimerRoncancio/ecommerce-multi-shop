import { useState } from "react"
import { NavLink } from "react-router"

export default function ProfileButton() {
  const [showOptions, setShowOptions] = useState(false);
  
  return (
    <div className="dropdown dropdown-end px-4 h-5/6 border-r-[1px] border-[#a2a9b1] text-[#a2a9b1]">
      <div className="w-full flex items-center">
        <div tabIndex={0} role="button" className="btn btn-ghost btn-circle avatar" 
          onClick={() => setShowOptions(!showOptions)}>
          <div className="w-10 rounded-full">
            <img
              alt="Tailwind CSS Navbar component"
              src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
          </div>
        </div>
      </div>
      <div className={`${!showOptions ? 'hidden' : '' } `}>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-4 w-52 p-3 
            shadow-[0_0_20px_0px_rgba(0,0,0,0.15)]">
          <NavLink to="profile" onClick={() => setShowOptions(false)}>
            <li>
              <a className="text-base active:!bg-[#1f2937] py-2 text-gray-500 font-medium">
                Mi cuenta
              </a>
            </li>
          </NavLink>
          <NavLink to="" onClick={() => setShowOptions(false)}>
            <li>
              <a className="text-base active:!bg-[#1f2937] py-2 text-gray-500">
                Mis compras
              </a>
            </li>
          </NavLink>
          <NavLink to="" onClick={() => setShowOptions(false)}>
            <li>
              <a className="text-base active:!bg-[#1f2937] py-2 text-gray-500">
                Cerrar sesión
              </a>
            </li>
          </NavLink>
        </ul>
      </div>
    </div>
  )
}
