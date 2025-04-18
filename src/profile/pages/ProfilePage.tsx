import useUser from "../../shared/hooks/api/useUser";
import { useEffect } from "react";
import { Outlet, useLocation } from "react-router";
import useCart from "../../cart/hooks/useCart";
import MenuButton from "../components/MenuButton";
import AvatarImage from "../components/AvatarImage";
import LogInOutButton from "../components/LogInOutButton";

export default function ProfilePage() {
  const { items, loadItemsFromStorage } = useCart();
  const { user, loading } = useUser();
  const location = useLocation();

  useEffect(() => {
    !items.length && loadItemsFromStorage();
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
      <div className="ajust-width grid grid-cols-[auto_1fr] py-19 gap-10">
        <div className="flex flex-col justify-center w-[250px] p-5 gap-4">
          <div className="flex flex-col items-center gap-3">
            <div className="avatar">
              <div className="w-24 rounded-full">
                <AvatarImage loading={loading} user={user} />
              </div>
            </div>
            <h1 className="text-lg text-[#5e472d] font-semibold">
              {
                !user.name.length
                  ? "Crea una cuenta"
                  : user.name + ' ' + user.lastnames?.split(" ", 1)
              }
            </h1>
            <LogInOutButton loading={loading} user={user} />
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
