import { UserInitialValues } from "../helpers/users-initial-values.helper";
import useGetUser from "../../shared/hooks/api/useGetUser";
import { useEffect, useState } from "react";
import { User } from "../types/user";
import Cookies from "js-cookie";
import { Outlet, useLocation, useNavigate } from "react-router";
import useCart from "../../cart/hooks/useCart";
import { BsInboxes } from "react-icons/bs";
import { IoLocationOutline, IoPersonCircleOutline, IoSettingsOutline, IoWalletOutline } from "react-icons/io5";
import { IoMdHeartEmpty, IoMdLogOut } from "react-icons/io";

export default function ProfilePage() {
  const [user, setUser] = useState<User>(UserInitialValues);
  const { getUser } = useGetUser();
  const { items, loadItemsFromStorage } = useCart();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!items.length) loadItemsFromStorage();

    const token = Cookies.get("accessHome");

    console.log(location);

    getUser(token).then(res => {
      setUser(res.data);
    });
  }, [location]);

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
      <div className="ajust-width grid grid-cols-[auto_1fr] py-19">
        <div className="flex flex-col justify-center w-[250px] p-5 gap-4">
          <div className="flex flex-col items-center gap-3">
            <div className="avatar avatar-offline">
              <div className="w-24 rounded-full">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
            <h1 className="text-lg text-[#5e472d] font-semibold">{user.name} {user.lastnames?.split(" ", 1)}</h1>
            <button className="btn gap-2 px-4 h-9 rounded-full bg-[#fff4ef] text-sm font-normal text-[#eb5324] border-none 
            justify-normal">
              <IoMdLogOut size={17} />
              Cerrar Sesión
            </button>
          </div>
          <div className="divider"></div>
          <div className="flex flex-col">
            <button className={`btn gap-4 py-6 rounded-xl 
            ${location.pathname === "/profile" 
              ? 'bg-[#f04913] text-white border-[#f04913]' 
              : 'bg-white bg-none shadow-none'} text-base font-normal 
            text-[#292421] border-white justify-normal`} onClick={() => navigate("/profile")}>
              <IoPersonCircleOutline size={25} />
              Datos Personales
            </button>
            <button className="btn gap-4 py-6 rounded-xl bg-white bg-none shadow-none text-base font-normal 
            text-[#292421] border-white justify-normal">
              <IoWalletOutline size={25} />
              Medios de Pago
            </button>
            <button className={`btn gap-4 py-6 rounded-xl 
            ${location.pathname === "/profile/wish-list" 
              ? 'bg-[#f04913] text-white border-[#f04913]' 
              : 'bg-white bg-none shadow-none'} text-base font-normal 
            text-[#292421] border-white justify-normal`} onClick={() => navigate("/profile/wish-list")}>
              <IoMdHeartEmpty size={25} />
              Lista de deseos
            </button>
            <button className="btn gap-4 py-6 rounded-xl bg-white bg-none shadow-none text-base font-normal 
            text-[#292421] border-white justify-normal">
              <BsInboxes size={25} />
              Mis compras
            </button>
            <button className="btn gap-4 py-6 rounded-xl bg-white bg-none shadow-none text-base font-normal 
            text-[#292421] border-white justify-normal">
              <IoLocationOutline size={27} />
              Direcciones
            </button>
          </div>
          <div className="divider"></div>
          <div>
            <button className="btn gap-4 py-6 rounded-xl bg-white bg-none shadow-none text-base font-normal text-[#292421] border-white justify-normal">
              <IoSettingsOutline size={30} />
              Configuración de Cuenta
            </button>
          </div>
        </div>
        <Outlet />
      </div>
    </>
  );
}
