import useUser from "../../shared/hooks/api/useUser";
import { Outlet, useLocation } from "react-router";
import MenuButton from "../components/MenuButton";
import AvatarImage from "../components/AvatarImage";
import LogInOutButton from "../components/LogInOutButton";
import Breadcrumb from "../components/Breadcrumb";

export default function ProfilePage() {
  const { user, loading } = useUser();
  const location = useLocation();

  return (
    <>
      <div className="bg-[#fff4ef]">
        <div className="ajust-width flex justify-between items-center py-5">
          <h1 className="text-2xl font-semibold">Cuenta</h1>
          <div className="breadcrumbs text-sm">
            <Breadcrumb />
          </div>
        </div>
      </div>
      <div className="ajust-width grid grid-cols-[auto_1fr] py-14 gap-6">
        <div className="flex flex-col w-[258px] p-5 pt-5 rounded-3xl">
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
          <div className="divider before:h-[1px] after:h-[1px]"></div>
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
          <div className="divider before:h-[1px] after:h-[1px]"></div>
          <div>
            <MenuButton
              label="Configuración de Cuenta"
              iconName="settings"
              pathname={location.pathname}
              to=""
            />
          </div>
        </div>
        <div className="w-full p-5 rounded-3xl">
          <Outlet />
        </div>
      </div>
    </>
  );
}
