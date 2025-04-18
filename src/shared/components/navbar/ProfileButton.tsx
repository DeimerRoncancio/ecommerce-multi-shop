import { useState } from "react";
import { NavLink } from "react-router";
import useUser from "../../hooks/api/useUser";
import AvatarImage from "../../../profile/components/AvatarImage";
import Cookies from "js-cookie";

type ProfileButtonProps = {
  size: number;
}

export default function ProfileButton({ size }: ProfileButtonProps) {
  const [showOptions, setShowOptions] = useState(false);
  const { user, loading } = useUser();

  const logOut = () => {
    Cookies.remove("accessHome");
    window.location.reload()
  }

  return (
    <div className="dropdown dropdown-end">
      <div className="w-full flex items-center">
        <div className="w-full flex items-center">
          <div tabIndex={0} className="btn btn-ghost btn-circle avatar"
            style={{ width: size, height: size }}
            onClick={() => setShowOptions(!showOptions)}>
            <div className="rounded-full">
              <AvatarImage loading={loading} user={user} />
            </div>
          </div>
        </div>
      </div>

      <div className={`${!showOptions ? 'hidden' : ''} `}>
        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-white rounded-box z-1 mt-4 w-52 p-3 
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
          <NavLink to="" onClick={logOut}>
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
