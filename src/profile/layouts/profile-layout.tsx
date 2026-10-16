import { NavLink, Outlet, useLocation, useRouteLoaderData } from "react-router";
import MenuButton from "../components/MenuButton";
import AvatarImage from "../components/AvatarImage";
import Breadcrumb from "../components/Breadcrumb";
import LogoutButton from "../components/LogOutButton";
import { RiImageEditLine } from "react-icons/ri";
import { FiMail, FiUser } from "react-icons/fi";
import { useState } from "react";
import EditImageModal from "../components/image-edit-modal/EditImageModal";
import type { loader as appLoader } from "../../App";
import { UserInitialValues } from "../constants/users-initial-values.helper";

export default function ProfileLayout() {
  const app = useRouteLoaderData<typeof appLoader>("App");
  const user = app?.user ?? UserInitialValues;
  const guestEmail = user.name.length ? undefined : app?.guestEmail;
  const userImage = user.profileImage?.imageUrl ?? "";
  const [showProfileModal, setProfileModal] = useState(false);
  const location = useLocation();

  const onOpenEditProfileModal = () => setProfileModal(true);

  const onCloseEditProfileModal = () => setProfileModal(false);

  return (
    <>
      <Breadcrumb namePage="Cuenta" />

      <div className="mx-auto grid w-full max-w-7xl items-start gap-6 px-4 py-8 md:px-8 lg:grid-cols-[270px_1fr] lg:py-10">
        <aside
          className="flex flex-col overflow-hidden rounded-2xl border border-line bg-base-100 lg:sticky
          lg:top-[calc(var(--nav-h)+1.5rem)]"
        >
          <div className="flex flex-col items-center gap-2 border-b border-line bg-brand-soft/60 px-5 pb-5 pt-6">
            <div className="relative">
              <div
                className="h-24 w-24 overflow-hidden rounded-full bg-base-100 ring-4 ring-brand ring-offset-4
                ring-offset-brand-soft"
              >
                <AvatarImage userImage={userImage} />
              </div>
              <button
                type="button"
                aria-label="Cambiar foto de perfil"
                onClick={onOpenEditProfileModal}
                className="absolute -bottom-1 -right-1 grid h-9 w-9 place-items-center rounded-full border-2
                    border-base-100 bg-ink text-white transition-colors hover:bg-brand"
              >
                <RiImageEditLine size={16} />
              </button>
            </div>
            <EditImageModal user={user} showModal={showProfileModal} onClose={onCloseEditProfileModal} />
            {guestEmail && (
              <div className="-mt-1 flex w-full flex-col items-center gap-3 [[data-guest-ended]_&]:hidden">
                <span
                  className="relative z-10 inline-flex items-center gap-1.5 rounded-full border-2 border-base-100
                    bg-brand px-3 py-1 text-[11px] font-extrabold uppercase tracking-wider text-white shadow-sm"
                >
                  <FiUser size={12} strokeWidth={3} />
                  Invitado
                </span>
                <div
                  className="w-full rounded-xl border border-line bg-base-100 px-3 py-2.5 text-center
                    shadow-[0_8px_20px_-14px_rgb(17_17_17/0.35)] @container"
                >
                  <p className="flex items-center justify-center gap-1.5 text-[11px] font-bold text-ink-muted">
                    <FiMail size={13} className="text-brand" />
                    Compras con este correo
                  </p>
                  <h1
                    className="mt-1 font-extrabold leading-tight text-ink [overflow-wrap:anywhere]"
                    style={{
                      fontSize: `clamp(0.75rem, ${(100 / (guestEmail.length * 0.66)).toFixed(2)}cqw, 0.9375rem)`,
                    }}
                  >
                    {guestEmail.split("@")[0]}
                    <wbr />@{guestEmail.split("@").slice(1).join("@")}
                  </h1>
                </div>
              </div>
            )}
            <h1
              className={`mt-2 text-center text-lg font-extrabold leading-tight text-ink ${
                guestEmail ? "hidden [[data-guest-ended]_&]:block" : ""
              }`}
            >
              {!user.name.length ? "Accede a una cuenta" : user.name + " " + user.lastnames?.split(" ", 1)}
            </h1>
            {user.email && <p className="-mt-1 max-w-full truncate text-xs text-ink-muted">{user.email}</p>}
            <LogoutButton user={user} />
            {guestEmail && (
              <NavLink
                to="/register"
                className="text-xs font-bold text-ink-soft underline-offset-4 transition-colors hover:text-brand
                  hover:underline [[data-guest-ended]_&]:hidden"
              >
                o crea una cuenta gratis
              </NavLink>
            )}
          </div>
          <nav className="flex flex-col gap-0.5 p-3" aria-label="Mi cuenta">
            <MenuButton label="Datos personales" iconName="profile" pathname={location.pathname} to="/profile" />
            <MenuButton
              label="Lista de deseos"
              iconName="wishlist"
              pathname={location.pathname}
              to="/profile/wish-list"
            />
            <MenuButton label="Mis compras" iconName="purchases" pathname={location.pathname} to="" />
            <MenuButton label="Direcciones" iconName="addresses" pathname={location.pathname} to="" />
            <div className="my-2 border-t border-line" />
            <MenuButton label="Configuración" iconName="settings" pathname={location.pathname} to="/profile/settings" />
          </nav>
        </aside>
        <section className="w-full rounded-2xl border border-line bg-base-100 p-5 sm:p-7">
          <Outlet context={{ user }} />
        </section>
      </div>
    </>
  );
}
