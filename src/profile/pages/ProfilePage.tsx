import { UserInitialValues } from "../helpers/users-initial-values.helper";
import useGetUser from "../../shared/hooks/api/useGetUser";
import { useEffect, useState } from "react";
import { User } from "../types/user";
import Cookies from "js-cookie";
import { Outlet, useLocation } from "react-router";
import useCart from "../../cart/hooks/useCart";
import { IoMdLogOut } from "react-icons/io";
import MenuButton from "../components/MenuButton";

export default function ProfilePage() {
  const [user, setUser] = useState<User>(UserInitialValues);
  const { getUser } = useGetUser();
  const { items, loadItemsFromStorage } = useCart();
  const location = useLocation();

  useEffect(() => {
    if (!items.length) loadItemsFromStorage();

    console.log(user);

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
      <div className="ajust-width grid grid-cols-[auto_1fr] py-19">
        <div className="flex flex-col justify-center w-[250px] p-5 gap-4">
          <div className="flex flex-col items-center gap-3">
            <div className="avatar avatar-offline">
              <div className="w-24 rounded-full">
                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
              </div>
            </div>
            <h1 className="text-lg text-[#5e472d] font-semibold">
              {
                !user.name.length
                  ? "Crea una cuenta"
                  : user.name + user.lastnames?.split(" ", 1)
              }
            </h1>
            <button className="btn gap-2 px-4 h-9 rounded-full bg-[#fff4ef] text-sm font-normal text-[#eb5324] border-none 
            justify-normal">
              <IoMdLogOut size={17} />
              Cerrar Sesión
            </button>
          </div>
          <div className="divider"></div>
          <div className="flex flex-col">
            <MenuButton
              label="Datos personales"
              iconName="profile"
              pathname={location.pathname}
              to="/profile"
            />
            <MenuButton
              label="Medios de pago"
              iconName="wallet"
              pathname={location.pathname}
              to=""
            />
            <MenuButton
              label="Lista de deseos"
              iconName="wishlist"
              pathname={location.pathname}
              to="/profile/wish-list"
            />
            <MenuButton
              label="Mis compras"
              iconName="purchases"
              pathname={location.pathname}
              to=""
            />
            <MenuButton
              label="Direcciones"
              iconName="addresses"
              pathname={location.pathname}
              to=""
            />
          </div>
          <div className="divider"></div>
          <div>
            <MenuButton
              label="Configuración de Cuenta"
              iconName="settings"
              pathname={location.pathname}
              to=""
            />
          </div>
        </div>
        <Outlet />
      </div>
    </>
  );
}
