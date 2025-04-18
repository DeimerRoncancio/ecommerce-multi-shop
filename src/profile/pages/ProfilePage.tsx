import { UserInitialValues } from "../helpers/users-initial-values.helper";
import useGetUser from "../../shared/hooks/api/useGetUser";
import { useEffect, useState } from "react";
import { User } from "../types/user";
import Cookies from "js-cookie";
import { Outlet, useLocation } from "react-router";
import useCart from "../../cart/hooks/useCart";
import { BsPersonBadgeFill } from "react-icons/bs";
import { IoPersonCircleOutline } from "react-icons/io5";
import { FaWallet } from "react-icons/fa6";

export default function ProfilePage() {
  const [user, setUser] = useState<User>(UserInitialValues);
  const { getUser } = useGetUser();
  const { items, loadItemsFromStorage } = useCart();
  const location = useLocation();

  useEffect(() => {
    if (!items.length) loadItemsFromStorage();

    const token = Cookies.get("accessHome");

    getUser(token).then(res => {
      setUser(res.data);
    });
  }, []);

  return (
    <>
      <div className="bg-[#fff4ef]">
        <div className="ajust-width flex justify-between items-center py-5">
          <h1 className="text-2xl font-semibold">Cuenta</h1>
          <div className="breadcrumbs text-sm">
            <ul>
              <li><a>Inicio</a></li>
              <li><a>Documents</a></li>
              <li>Add Document</li>
            </ul>
          </div>
        </div>
      </div>
      <div className="ajust-width grid grid-cols-[auto_1fr] py-20">
        <div className="flex flex-col justify-center w-[250px] p-5 gap-10">
          <div className="flex flex-col items-center gap-3">
            <div className="avatar avatar-offline">
              <div className="w-24 rounded-full">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
            <h1 className="text-lg text-[#5e472d] font-semibold">{user.name} {user.lastnames?.split(" ", 1)}</h1>
          </div>
          <div className="flex flex-col">
            <button className="btn gap-4 py-6 rounded-xl bg-[#f04913] text-base text-white border-[#f04913] justify-normal">
            <IoPersonCircleOutline size={25} />
              Datos Personales
            </button>
            <button className="btn gap-4 py-6 rounded-xl bg-white bg-none shadow-none text-base font-normal text-[#292421] border-white justify-normal">
              <FaWallet size={25} />
              Medios de Pago
            </button>
          </div>
        </div>
        <Outlet />
      </div>
    </>
  );
}
