import { Outlet, useLocation, useRouteLoaderData } from "react-router";
import MenuButton from "../components/MenuButton";
import AvatarImage from "../components/AvatarImage";
import Breadcrumb from "../components/Breadcrumb";
import LogoutButton from "../components/LogOutButton";
import { RiImageEditLine } from "react-icons/ri";
import { useState } from "react";
import EditImageModal from "../components/image-edit-modal/EditImageModal";
import type { loader as appLoader } from "../../App";
import { UserInitialValues } from "../constants/users-initial-values.helper";

export default function ProfileLayout() {
  const user = useRouteLoaderData<typeof appLoader>("App")?.user ?? UserInitialValues;
  const userImage = user.profileImage?.imageUrl ?? "";
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

      <div className="mx-auto grid w-full max-w-7xl items-start gap-6 px-4 py-8 md:px-8 lg:grid-cols-[270px_1fr] lg:py-10">
        <aside className="flex flex-col overflow-hidden rounded-2xl border border-line bg-base-100 lg:sticky
          lg:top-[calc(var(--nav-h)+1.5rem)]">
          <div className="flex flex-col items-center gap-2 border-b border-line bg-brand-soft/60 px-5 pb-5 pt-6">
            <div className="relative">
              <div className="h-24 w-24 overflow-hidden rounded-full bg-base-100 ring-4 ring-brand ring-offset-4
                ring-offset-brand-soft">
                <AvatarImage userImage={userImage} />
              </div>
              {user.name.length > 0 && (
                <button
                  type="button"
                  aria-label="Cambiar foto de perfil"
                  onClick={onOpenEditProfileModal}
                  className="absolute -bottom-1 -right-1 grid h-9 w-9 place-items-center rounded-full border-2
                    border-base-100 bg-ink text-white transition-colors hover:bg-brand"
                >
                  <RiImageEditLine size={16} />
                </button>
              )}
            </div>
            <EditImageModal
              user={user}
              showModal={showProfileModal}
              onClose={onCloseEditProfileModal}
            />
            <h1 className="mt-2 text-center text-lg font-extrabold leading-tight text-ink">
              {
                !user.name.length
                  ? "Accede a una cuenta"
                  : user.name + ' ' + user.lastnames?.split(" ", 1)
              }
            </h1>
            {user.email && <p className="-mt-1 max-w-full truncate text-xs text-ink-muted">{user.email}</p>}
            <LogoutButton user={user} />
          </div>
          <nav className="flex flex-col gap-0.5 p-3" aria-label="Mi cuenta">
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
            <div className="my-2 border-t border-line" />
            <MenuButton
              label="Configuración"
              iconName="settings"
              pathname={location.pathname}
              to="/profile/settings"
            />
          </nav>
        </aside>
        <section className="w-full rounded-2xl border border-line bg-base-100 p-5 sm:p-7">
          <Outlet context={{ user }} />
        </section>
      </div>
    </>
  );
}
