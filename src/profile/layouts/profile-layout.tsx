import useUser from "../hooks/api/useUser";
import { Outlet, useLocation } from "react-router";
import MenuButton from "../components/MenuButton";
import AvatarImage from "../components/AvatarImage";
import Breadcrumb from "../components/Breadcrumb";
import type { Route } from "./+types/profile-layout";
import { getSession } from "../../sessions.server";
import LogoutButton from "../components/LogOutButton";
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
      <Breadcrumb namePage="Cuenta" />

      <div className="mx-auto grid w-full max-w-7xl gap-6 px-4 py-10 md:px-8 lg:grid-cols-[260px_1fr] lg:py-14">
        <aside className="flex h-fit flex-col rounded-2xl border border-line bg-base-100 p-5">
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
            <h1 className="text-lg text-ink font-semibold">
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
        </aside>
        <section className="w-full rounded-2xl border border-line bg-base-100 p-5 lg:p-7">
          <Outlet context={{ user, userLoading: loading, updateUser }} />
        </section>
      </div>
    </>
  );
}
