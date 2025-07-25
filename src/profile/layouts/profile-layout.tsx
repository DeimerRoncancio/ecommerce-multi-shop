import useUser from "../hooks/api/useUser";
import { Outlet, useLocation } from "react-router";
import MenuButton from "../components/MenuButton";
import AvatarImage from "../components/AvatarImage";
import Breadcrumb from "../components/Breadcrumb";
import type { Route } from "./+types/profile-layout";
import { getSession } from "../../sessions.server";
import LogoutButton from "../components/LogoutButton";
import { RiImageEditLine } from "react-icons/ri";
import { useState } from "react";
import EditImageModal from "../components/image-edit-modal/EditImageModal";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get('Cookie'));
  const token = session.get('token') as string;
  return { token };
}

export default function ProfileLayout({ loaderData }: Route.ComponentProps) {
  const { token } = loaderData;
  const { 
    user, loading,
    userImage,
    updateUser,
    updateImageUser
  } = useUser({ token });
  const [showProfileModal, setProfileModal] = useState(false);
  const location = useLocation();

  const onOpenEditProfileModal = () => {
    document.body.classList.add('overflow-hidden')
    setProfileModal(true);
  }

  const onCloseEditProfileModal = () => {
    document.body.classList.remove('overflow-hidden')
    setProfileModal(false);
  }

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
              <div className="w-28 rounded-full relative border-4 border-white shadow-[0px_7px_29px_0px_rgba(100,100,111,0.2)]">
                <AvatarImage loading={loading} userImage={userImage} />
                {
                  user.name.length &&
                  <button className="absolute rounded-full top-1 text-transparent hover:text-gray-200 
                    hover:bg-[#16161644] w-full h-full transition-all duration-100 outline-0 flex 
                    justify-center items-center cursor-pointer" onClick={onOpenEditProfileModal}>
                    <RiImageEditLine className="transition-all duration-100" size={28} />
                  </button>
                }
              </div>
            </div>
            <EditImageModal
              token={token} user={user}
              showModal={showProfileModal}
              onClose={onCloseEditProfileModal}
              updateImageUser={updateImageUser}
            />
            <h1 className="text-lg text-[#5e472d] font-semibold">
              {
                !user.name.length
                  ? "Accede a una cuenta"
                  : user.name + ' ' + user.lastnames?.split(" ", 1)
              }
            </h1>
            <LogoutButton loading={loading} user={user} />
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
              to="/profile/settings"
            />
          </div>
        </div>
        <div className="w-full p-5 rounded-3xl">
          <Outlet context={{ user, userLoading: loading, updateUser }} />
        </div>
      </div>
    </>
  );
}
