import { useState } from "react"
import { NavLink } from "react-router"

type ProfileButtonProps = {
  size: number;
}

export default function ProfileButton({ size }: ProfileButtonProps) {
  const [showOptions, setShowOptions] = useState(false);

  return (
    <div className="dropdown dropdown-end">
      <div className="w-full flex items-center">
        <div className="w-full flex items-center">
          <div tabIndex={0} className="btn btn-ghost btn-circle avatar" 
          style={{ width: size, height: size }}
          onClick={() => setShowOptions(!showOptions)}>
            <div className="rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
        </div>
      </div>
      <div className={`${!showOptions ? 'hidden' : ''} `}>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-4 w-52 p-3 
            shadow-[0_0_20px_0px_rgba(0,0,0,0.15)]">
          <NavLink to="/profile" onClick={() => setShowOptions(false)}>
            <li>
              <p className="text-base active:!bg-[#1f2937] py-2 text-gray-500 font-medium">
                Mi cuenta
              </p>
            </li>
          </NavLink>
          <NavLink to="" onClick={() => setShowOptions(false)}>
            <li>
              <p className="text-base active:!bg-[#1f2937] py-2 text-gray-500">
                Mis compras
              </p>
            </li>
          </NavLink>
          <NavLink to="" onClick={() => setShowOptions(false)}>
            <li>
              <p className="text-base active:!bg-[#1f2937] py-2 text-gray-500">
                Cerrar sesión
              </p>
            </li>
          </NavLink>
        </ul>
      </div>
    </div>
  )
}
