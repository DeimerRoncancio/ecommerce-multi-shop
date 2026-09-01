import { useEffect, useState } from "react";
import { NavLink, useLoaderData, useNavigate } from "react-router";
import useUser from "../../../profile/hooks/api/useUser";
import AvatarImage from "../../../profile/components/AvatarImage";
import LogoutActionButton from "../../../profile/components/LogoutActionButton";
import GuestModal from "../../../auth/components/GuestModal";
import { IoMdLogOut, IoMdPerson, IoMdCart, IoMdLogIn, IoMdPersonAdd, IoMdMail } from "react-icons/io";
import { RiUserReceivedFill } from "react-icons/ri";
import { IoCaretBack } from "react-icons/io5";

type LoaderProps = {
  token?: string;
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
  const token = loaderData?.token || "";
  const { user, loading, userImage } = useUser({ token });
  
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
          <div tabIndex={0} className="btn btn-ghost btn-circle avatar"
            style={{ width: size, height: size }}
            onClick={() => {
              setShowProfileOptions(false);
              setShowOptions(!showOptions)
            }}>
            <div className="rounded-full">
              <AvatarImage loading={loading} userImage={userImage} />
            </div>
          </div>
        </div>
      </div>

      <div className={`${!showOptions ? 'hidden' : ''} `}>
        <ul tabIndex={0} className="menu menu-sm dropdown-content bg-white rounded-2xl z-30 mt-3 w-60 p-2.5 
        border border-[#f1e1dc] shadow-xl transition-all duration-200">
          {user.name.length > 0 && (
            <li className="px-3 py-2 border-b border-[#f1e1dc]/60 mb-1">
              <span className="text-xs text-[#a2a9b1] font-medium p-0">Conectado como</span>
              <p className="text-sm font-semibold text-[#343e49] truncate p-0">{user.name}</p>
            </li>
          )}
          <li>
            <button 
              type="button"
              onMouseDown={(e) => e.preventDefault()} 
              onClick={() => {
                if (user.name.length === 0) {
                  setShowProfileOptions(true);
                  setShowOptions(false);
                } else {
                  navigate('/profile');
                  setShowOptions(false);
                  setShowProfileOptions(false);
                }
              }}
              className="w-full flex items-center gap-2.5 text-sm py-2.5 px-3 text-[#343e49] font-medium rounded-lg hover:bg-[#f1e1dc]/40 transition-colors"
            >
              <IoMdPerson className="text-lg text-[#343e49]" />
              <span>{!user.name.length ? 'Ingresar' : 'Mi cuenta'}</span>
            </button>
          </li>
          {user.name.length === 0 && (
            <li>
              <NavLink 
                to="/register" 
                onClick={() => setShowOptions(false)}
                className="w-full flex items-center gap-2.5 text-sm py-2.5 px-3 text-[#343e49] font-medium rounded-lg hover:bg-[#f1e1dc]/40 transition-colors"
              >
                <RiUserReceivedFill className="text-lg text-[#343e49]" />
                <span>Registrarse</span>
              </NavLink>
            </li>
          )}
          <li>
            <NavLink 
              to="" 
              onClick={() => setShowOptions(false)}
              className="w-full flex items-center gap-2.5 text-sm py-2.5 px-3 text-[#343e49] font-medium rounded-lg hover:bg-[#f1e1dc]/40 transition-colors"
            >
              <IoMdCart className="text-lg text-[#343e49]" />
              <span>Mis compras</span>
            </NavLink>
          </li>
          <li className="mt-2 pt-2 border-t border-[#f1e1dc]/60">
            <LogoutActionButton disabled={token.length === 0} className="w-full text-left text-sm rounded-lg px-3 py-2 text-red-600 hover:bg-red-50 font-medium transition-colors cursor-pointer disabled:text-gray-400 disabled:hover:bg-transparent disabled:cursor-not-allowed disabled:opacity-50">
              <div className="w-full flex items-center gap-2.5">
                <IoMdLogOut className="text-lg" />
                <span>Cerrar sesión</span>
              </div>
            </LogoutActionButton>
          </li>
        </ul>
      </div>

      <div className={`${!showProfileOptions ? 'hidden' : ''} `}>
        <ul tabIndex={1} className="menu menu-sm dropdown-content bg-white rounded-2xl z-30 mt-3 w-60 p-2.5 
        border border-[#f1e1dc] shadow-xl transition-all duration-200">
          <li>
            <button 
              type="button"
              onMouseDown={(e) => e.preventDefault()} 
              onClick={() => {
                setShowProfileOptions(false);
                setShowOptions(true);
              }}
              className="w-full flex items-center gap-2.5 text-sm py-2.5 px-3 text-[#343e49] font-medium rounded-lg hover:bg-[#e4e4e4]/40 transition-colors"
            >
              <IoCaretBack className="text-lg text-[#343e49]" />
              <span>Volver</span>
            </button>
          </li>
          <li className="mt-2 pt-2 border-t border-[#f1e1dc]/60">
            <NavLink 
              to="/login" 
              onClick={() => setShowOptions(false)}
              className="w-full flex items-center gap-2.5 text-sm py-2.5 px-3 text-[#343e49] font-medium rounded-lg hover:bg-[#f1e1dc]/40 transition-colors"
            >
              <IoMdLogIn className="text-lg text-[#343e49]" />
              <span>Iniciar sesión</span>
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
                className="w-full flex items-center gap-2.5 text-sm py-2.5 px-3 text-[#343e49] font-medium rounded-lg hover:bg-[#f1e1dc]/40 transition-colors text-left"
              >
                <IoMdPersonAdd className="text-lg text-[#343e49]" />
                <span>Entrar como invitado</span>
              </button>
            </li>
          ) : (
            <li className="mt-2 pt-2 border-t border-[#f1e1dc]/60">
              <NavLink 
                to="/profile/wish-list" 
                onClick={() => {
                  setShowOptions(false);
                  setShowProfileOptions(false);
                }}
                className="w-full flex items-center gap-2.5 px-3 py-2.5 bg-[#fff4ef]/80 rounded-xl border border-[#f1e1dc] hover:bg-[#fff4ef] transition-colors"
              >
                <IoMdMail className="text-lg text-[#f14913] shrink-0" />
                <div className="flex flex-col min-w-0">
                  <span className="text-[10px] uppercase tracking-wider font-semibold text-[#f14913] leading-none">Invitado</span>
                  <span className="text-xs font-semibold text-[#3a2f2a] truncate mt-0.5">
                    {guestEmail}
                  </span>
                </div>
              </NavLink>
            </li>
          )}
        </ul>
      </div>

      <GuestModal 
        isOpen={showGuestModal} 
        onClose={() => setShowGuestModal(false)} 
      />
    </div>
  )
}
