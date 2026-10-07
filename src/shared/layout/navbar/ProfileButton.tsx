import { useEffect, useState } from "react";
import { NavLink, useLoaderData, useNavigate } from "react-router";
import AvatarImage from "../../../profile/components/AvatarImage";
import LogoutActionButton from "../../../profile/components/LogoutActionButton";
import GuestModal from "../../../auth/components/GuestModal";
import {
  FiArrowLeft, FiChevronRight, FiHeart, FiLogIn, FiLogOut, FiMail, FiPackage, FiUser, FiUserCheck,
} from "react-icons/fi";
import { IconType } from "react-icons";
import { UserTypes } from "../../../profile/types/user";
import { UserInitialValues } from "../../../profile/constants/users-initial-values.helper";

type MenuRowProps = {
  icon: IconType;
  label: string;
  hint?: string;
  soon?: boolean;
};

function MenuRow({ icon: Icon, label, hint, soon }: MenuRowProps) {
  return (
    <>
      <span className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-colors ${
        soon ? "bg-cream text-ink-muted" : "bg-brand-soft text-brand group-hover:bg-brand group-hover:text-white"
      }`}>
        <Icon size={15} />
      </span>
      <span className="min-w-0 flex-1 leading-tight">
        <span className={`block text-sm font-bold ${soon ? "text-ink-muted" : "text-ink"}`}>{label}</span>
        {hint && <span className="block text-xs font-normal text-ink-muted">{hint}</span>}
      </span>
      {soon ? (
        <span className="rounded-full bg-cream px-2 py-0.5 text-[10px] font-bold text-ink-muted">Pronto</span>
      ) : (
        <FiChevronRight size={15} className="text-ink-muted transition-transform group-hover:translate-x-0.5" />
      )}
    </>
  );
}

const rowClass = "group flex w-full items-center gap-3 rounded-xl px-2.5 py-2 text-left transition-colors hover:bg-cream";
const panelClass = `dropdown-content z-30 mt-3 w-72 overflow-hidden rounded-2xl border border-line
  bg-base-100 p-0 shadow-xl`;

type LoaderProps = {
  user?: UserTypes | null;
}

type ProfileButtonProps = {
  size: number;
}

export default function ProfileButton({ size }: ProfileButtonProps) {
  const [showOptions, setShowOptions] = useState(false);
  const [showProfileOptions, setShowProfileOptions] = useState(false);
  const [showGuestModal, setShowGuestModal] = useState(false);
  const [guestEmail, setGuestEmail] = useState<string | null>(null);
  const navigate = useNavigate();
  const loaderData = useLoaderData() as LoaderProps | undefined;
  const user = loaderData?.user ?? UserInitialValues;
  const userImage = user.profileImage?.imageUrl ?? "";
  
  const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
    if (!e.currentTarget.contains(e.relatedTarget)) {
      setShowProfileOptions(false);
      setShowOptions(false);
    }
  };

  useEffect(() => {
    if (typeof window !== "undefined")
      setGuestEmail(sessionStorage.getItem("guestEmail"));
  }, [showProfileOptions, showOptions, showGuestModal]);

  return (
    <div className="dropdown dropdown-end" onBlur={handleBlur}>
      <div className="w-full flex items-center">
        <div className="w-full flex items-center">
          <div tabIndex={0} className="btn btn-ghost btn-circle avatar ring-2 ring-white/70 transition-shadow
            hover:ring-white"
            style={{ width: size, height: size }}
            onClick={() => {
              setShowProfileOptions(false);
              setShowOptions(!showOptions)
            }}>
            <div className="rounded-full">
              <AvatarImage userImage={userImage} />
            </div>
          </div>
        </div>
      </div>

      <div className={`${!showOptions ? 'hidden' : ''} `}>
        <div tabIndex={0} className={panelClass}>
          {user.name.length > 0 ? (
            <div className="flex items-center gap-3 border-b border-line bg-brand-soft/60 px-4 py-3.5">
              <span className="h-11 w-11 shrink-0 overflow-hidden rounded-full ring-2 ring-brand ring-offset-2
                ring-offset-brand-soft">
                <AvatarImage userImage={userImage} />
              </span>
              <span className="min-w-0 leading-tight">
                <span className="block text-xs text-ink-muted">Hola,</span>
                <span className="block truncate font-extrabold text-ink">{user.name}</span>
                {user.email && <span className="block truncate text-xs text-ink-muted">{user.email}</span>}
              </span>
            </div>
          ) : (
            <div className="border-b border-line bg-brand-soft/60 px-4 py-4">
              <p className="text-lg font-extrabold leading-tight text-ink">¡Hola!</p>
              <p className="mt-0.5 text-xs text-ink-soft">Entra para ver tus compras y guardar tus favoritos.</p>
              <div className="mt-3 flex gap-2">
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    setShowProfileOptions(true);
                    setShowOptions(false);
                  }}
                  className="flex h-9 flex-1 items-center justify-center gap-1.5 rounded-full bg-brand text-sm font-bold
                    text-white transition-colors hover:bg-ink"
                >
                  <FiLogIn size={15} />
                  Ingresar
                </button>
                <NavLink
                  to="/register"
                  onClick={() => setShowOptions(false)}
                  className="flex h-9 flex-1 items-center justify-center rounded-full border border-brand/30 bg-base-100
                    text-sm font-bold text-brand transition-colors hover:border-brand"
                >
                  Crear cuenta
                </NavLink>
              </div>
            </div>
          )}

          <ul className="flex flex-col gap-0.5 p-2">
            {user.name.length > 0 && (
              <li>
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    navigate('/profile');
                    setShowOptions(false);
                    setShowProfileOptions(false);
                  }}
                  className={rowClass}
                >
                  <MenuRow icon={FiUser} label="Mi cuenta" hint="Tus datos y tu foto" />
                </button>
              </li>
            )}
            <li>
              <NavLink to="/profile/wish-list" onClick={() => setShowOptions(false)} className={rowClass}>
                <MenuRow icon={FiHeart} label="Lista de deseos" hint="Lo que guardaste para después" />
              </NavLink>
            </li>
            <li>
              <span className={`${rowClass} cursor-default hover:bg-transparent`}>
                <MenuRow icon={FiPackage} label="Mis compras" soon />
              </span>
            </li>
          </ul>

          {user.name.length > 0 && (
            <div className="border-t border-line p-2">
              <LogoutActionButton className="flex w-full items-center gap-3 rounded-xl px-2.5 py-2 text-sm font-bold
                text-error transition-colors hover:bg-error/10">
                <span className="grid h-8 w-8 place-items-center rounded-full bg-error/10">
                  <FiLogOut size={15} />
                </span>
                Cerrar sesión
              </LogoutActionButton>
            </div>
          )}
        </div>
      </div>

      <div className={`${!showProfileOptions ? 'hidden' : ''} `}>
        <div tabIndex={1} className={panelClass}>
          <div className="flex items-center gap-2 border-b border-line bg-brand-soft/60 px-2 py-2.5">
            <button
              type="button"
              aria-label="Volver"
              onMouseDown={(e) => e.preventDefault()}
              onClick={() => {
                setShowProfileOptions(false);
                setShowOptions(true);
              }}
              className="grid h-8 w-8 place-items-center rounded-full text-ink transition-colors hover:bg-base-100
                hover:text-brand"
            >
              <FiArrowLeft size={17} />
            </button>
            <p className="font-extrabold text-ink">Ingresar</p>
          </div>

          <ul className="flex flex-col gap-0.5 p-2">
            <li>
              <NavLink to="/login" onClick={() => setShowOptions(false)} className={rowClass}>
                <MenuRow icon={FiLogIn} label="Iniciar sesión" hint="Con tu correo y contraseña" />
              </NavLink>
            </li>
            {guestEmail === null ? (
              <li>
                <button
                  type="button"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    setShowProfileOptions(false);
                    setShowOptions(false);
                    setShowGuestModal(true);
                  }}
                  className={rowClass}
                >
                  <MenuRow icon={FiUserCheck} label="Entrar como invitado" hint="Compra sin crear una cuenta" />
                </button>
              </li>
            ) : (
              <li>
                <NavLink
                  to="/profile/wish-list"
                  onClick={() => {
                    setShowOptions(false);
                    setShowProfileOptions(false);
                  }}
                  className="mt-1 flex items-center gap-3 rounded-xl border border-brand/20 bg-brand-soft/60 px-3 py-2.5
                    transition-colors hover:border-brand"
                >
                  <FiMail size={17} className="shrink-0 text-brand" />
                  <span className="min-w-0 leading-tight">
                    <span className="block text-[10px] font-bold uppercase tracking-wider text-brand">Invitado</span>
                    <span className="block truncate text-xs font-semibold text-ink">{guestEmail}</span>
                  </span>
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>

      <GuestModal 
        isOpen={showGuestModal} 
        onClose={() => setShowGuestModal(false)} 
      />
    </div>
  )
}
