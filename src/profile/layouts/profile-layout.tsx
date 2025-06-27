import useUser from "../hooks/api/useUser";
import { Outlet, useLocation } from "react-router";
import MenuButton from "../components/MenuButton";
import AvatarImage from "../components/AvatarImage";
import Breadcrumb from "../components/Breadcrumb";
import type { Route } from "./+types/profile-layout";
import { getSession } from "../../sessions.server";
import LogoutButton from "../components/LogoutButton";
import { RiImageEditLine } from "react-icons/ri";
import { useRef, useState } from "react";
import { BiUpload } from "react-icons/bi";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get('Cookie'));
  const token = session.get('token') as string;
  return { token };
}

export default function ProfileLayout({ loaderData }: Route.ComponentProps) {
  const { token } = loaderData;
  const { user, loading, updateUser } = useUser({ token });
  const [showProfileModal, setProfileModal] = useState(false);
  const location = useLocation();

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    console.log('Drop ' + e.dataTransfer.files);
  }

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('Change ' + e.target.files);
  }

  // const handleFiles = (files: File[]) => {
  //   console.log(files)
  // }

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
              <div className="w-28 rounded-full border-4 border-white shadow-[0px_7px_29px_0px_rgba(100,100,111,0.2)]">
                <AvatarImage loading={loading} user={user} />
                {
                  user.name.length &&
                  <button className="absolute rounded-full top-1 text-transparent hover:text-gray-200 
                    hover:bg-[#16161644] w-[104px] h-[104px] transition-all duration-100 outline-0 flex 
                    justify-center items-center cursor-pointer" onClick={onOpenEditProfileModal}>
                    <RiImageEditLine className="transition-all duration-100" size={28} />
                  </button>
                }
              </div>
            </div>
            <h1 className="text-lg text-[#5e472d] font-semibold">
              {
                !user.name.length
                  ? "Crea una cuenta"
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
              to=""
            />
          </div>
        </div>
        <div className="w-full p-5 rounded-3xl">
          <Outlet context={{ user, userLoading: loading, updateUser }} />
        </div>
      </div>

      <div
        className={`${showProfileModal ? 'visible opacity-100' : 'invisible opacity-0 '} w-screen h-full z-20 
        fixed top-0 flex justify-center items-center`}
      >
        <div className="bg-[#1c1c1c7c] w-full h-full absolute" onClick={onCloseEditProfileModal} />
        <div
          className="grid grid-rows-[auto_1fr_auto] z-20 bg-white w-[560px] text-[#212529] h-[calc(100%-110px)]
          min-h-[164px] max-h-[853px] rounded-3xl"
        >
          <div className="p-3 pl-4 text-xl font-medium border-b border-[#ebebeb]">
            <h1>Personaliza tu foto</h1>
          </div>
          <div className="flex justify-center items-center">

            <label 
              className="w-72 h-60 border-2 border-dashed border-gray-300 hover:bg-[#f9fafb] 
              hover:border-gray-400 rounded-2xl cursor-pointer"
              onDrop={handleDrop}
              onDragOver={(e: React.DragEvent) => e.preventDefault()}
            >
              <input type="file" className="hidden" onChange={handleChangeImage} />
              <div className="flex flex-col h-full items-center justify-center space-y-1">
                <div
                  className={`w-16 h-16 rounded-full flex items-center justify-center transition-colors
                  duration-200 ${false ? "bg-blue-100" : "bg-gray-100"}`}
                >
                  {false ? (
                    <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <BiUpload
                      className={`w-8 h-8 transition-colors duration-200 
                      ${false ? "text-blue-500" : "text-gray-500"}`}
                    />
                  )}
                </div>

                <div className="space-y-2 text-center">
                  <h3 className="text-lg font-semibold text-gray-700">
                    {false ? "Subiendo imágenes..." : "Arrastra tus imágenes aquí"}
                  </h3>
                  <p className="text-sm text-gray-500">o haz clic para seleccionar archivos</p>
                  <p className="text-xs text-gray-400">PNG, JPG, GIF, WEBP</p>
                </div>
              </div>
            </label>

          </div>
          <div className="p-4 text-xl flex justify-end font-medium border-t gap-4 border-[#ebebeb]">
            <button className="btn rounded-full" onClick={onCloseEditProfileModal}>Cancelar</button>
            <button className="btn btn-neutral rounded-full">Guardar</button>
          </div>
        </div>
      </div>
    </>
  );
}
