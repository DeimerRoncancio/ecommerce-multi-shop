import { useState } from "react";
import { NavLink, useLoaderData } from "react-router";
import useUser from "../../../profile/hooks/api/useUser";
import AvatarImage from "../../../profile/components/AvatarImage";
import LogoutActionButton from "../../../profile/components/LogoutActionButton";

type LoaderProps = {
  token?: string;
}

type ProfileButtonProps = {
  size: number;
}

export default function ProfileButton({ size }: ProfileButtonProps) {
  const [showOptions, setShowOptions] = useState(false);
  const loaderData = useLoaderData() as LoaderProps | undefined;
  const token = loaderData?.token || "";
  const { user, loading, userImage } = useUser({ token });

  return (
    <div className="dropdown dropdown-end">
      <div className="w-full flex items-center">
        <div className="w-full flex items-center">
          <div tabIndex={0} className="btn btn-ghost btn-circle avatar"
            style={{ width: size, height: size }}
            onClick={() => setShowOptions(!showOptions)}>
            <div className="rounded-full">
              <AvatarImage loading={loading} userImage={userImage} />
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
                {
                  !user.name.length
                    ? 'Iniciar sesión'
                    : 'Mi cuenta'
                }
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
          <li>
            <LogoutActionButton className="w-full">
              <p className="w-full text-base text-left rounded-md active:!bg-[#1f2937] px-2.5 p-2 text-gray-500
              cursor-pointer active:text-[#fff7ed]">
                Cerrar sesión
              </p>
            </LogoutActionButton>
          </li>
        </ul>
      </div>
    </div>
  )
}
