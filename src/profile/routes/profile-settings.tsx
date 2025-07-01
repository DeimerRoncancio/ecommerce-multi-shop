import { useOutletContext } from "react-router"
import { PasswordType, UserTypes } from "../types/user";
import { useForm } from "react-hook-form";
import { Route } from "./+types/profile-settings";
import { getSession } from "../../sessions.server";
import { useUpdateUser } from "../hooks/api/useUpdateUser";
import { TiWarningOutline } from "react-icons/ti";
import { useState } from "react";

export async function loader({ request }: Route.LoaderArgs) {
  const session = await getSession(request.headers.get('Cookie'));
  const token = session.get('token') as string;
  return { token }
}

type userContext = {
  user: UserTypes;
  loading: boolean;
}

export default function ProfileSettings({ loaderData }: Route.ComponentProps) {
  const { user, loading } = useOutletContext<userContext>();
  const { token } = loaderData;
  const { register, handleSubmit } = useForm<PasswordType>();
  const { sendPassword } = useUpdateUser({ user, token });
  const [showConfirmModal, setConfirmModal] = useState(false);

  const submit = (data: PasswordType) => {
    if (data.newPassword !== data.confirmPassword) throw Error('Las contraseñas no coinciden');

    sendPassword(data)
      .then(() => alert('Contraseña cambiada exitosamente'))
      .catch(() => alert('No se pudo cambiar la contraseña'))
  }

  return (
    <>
      <div className="flex justify-between items-center mb-5">
        <h2 className="text-2xl text-[#5e472d]">Configuración de cuenta</h2>
      </div>
      {
        !loading ? (
          <form onSubmit={handleSubmit(submit)}>
            <div className="text-base border border-[#ebebeb] p-6 rounded-2xl text-black">
              <h2 className="mb-6 text-lg font-semibold text-[#84633f]">Cambiar contraseña</h2>
              <div className="flex flex-col gap-5">
                <div>
                  <span className="text-[#c7c7c7]">Contraseña actual</span>
                  <input
                    type="text"
                    className="p-3 pl-4 mt-3 border-[1px] border-[#ebebeb] rounded-xl outline-0 w-full focus:outline-2 
                  focus:outline-[#ffc1ad] focus:border-[#f14913]"
                    placeholder="Ingresa tu contraseña actual"
                    {...register("currentPassword")}
                  />
                </div>
                <div className="flex gap-5">
                  <div>
                    <span className="text-[#c7c7c7]">Nueva contraseña</span>
                    <input
                      type="text"
                      className="p-3 pl-4 mt-3 border-[1px] border-[#ebebeb] rounded-xl outline-0 w-full focus:outline-2 
                    focus:outline-[#ffc1ad] focus:border-[#f14913]"
                      placeholder="Ingresa tu neva contraseña"
                      {...register("newPassword")}
                    />
                  </div>
                  <div>
                    <span className="text-[#c7c7c7]">Confirma tu nueva contraseña</span>
                    <input
                      type="text"
                      className="p-3 pl-4 mt-3 border-[1px] border-[#ebebeb] rounded-xl outline-0 w-full focus:outline-2 
                      focus:outline-[#ffc1ad] focus:border-[#f14913]"
                      placeholder="Confirma tu neva contraseña"
                      {...register("confirmPassword")}
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <div className={`btn btn-neutral mt-7 p-1 px-7 h-9`}
              onClick={() => {
                document.body.classList.add('overflow-hidden');
                setConfirmModal(true);
              }}>
                Cambiar contraseña
              </div>
            </div>
            <div className={`${showConfirmModal ? 'visible opacity-100' : 'invisible opacity-0'} fixed w-full 
            h-full z-20 top-0 left-0 flex justify-center items-center transition-all duration-75`}>
              <div className="absolute w-full h-full top-0 bg-[#1c1c1c7c]"
              onClick={() => {
                document.body.classList.remove('overflow-hidden');
                setConfirmModal(false);
              }} />
              <div className={`${showConfirmModal && 'scale-110'} z-20 bg-white w-[450px] text-[#212529] min-h-[164px]
              rounded-lg transition-all duration-150 p-6`}>
                <div className="flex items-center gap-2">
                  <TiWarningOutline size={25} color="#f6aa2a" />
                  <p className="text-lg font-semibold">Confirmar Cambio de Contraseña</p>
                </div>
                <div>
                  <p className="text-base text-[#71717a]">
                    ¿Estás seguro de que deseas cambiar tu contraseña? Esta acción no se puede deshacer.
                  </p>
                </div>
                <div className="flex justify-end items-center gap-4 mt-4">
                  <div className="btn rounded-sm" onClick={() => {
                    document.body.classList.remove('overflow-hidden');
                    setConfirmModal(false);
                  }}>Cancelar</div>
                  <button className="btn rounded-sm btn-error">Confirmar</button>
                </div>
              </div>
            </div>
          </form>
        ) : (
          <div className="w-full mt-28 flex justify-center">
            <span className="loading loading-dots loading-xl"></span>
          </div>
        )
      }
    </>
  )
}
