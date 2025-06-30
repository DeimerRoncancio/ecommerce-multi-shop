import { useOutletContext } from "react-router"
import { PasswordType, UserTypes } from "../types/user";
import { useForm } from "react-hook-form";
import { Route } from "./+types/profile-settings";
import { getSession } from "../../sessions.server";
import { useUpdateUser } from "../hooks/api/useUpdateUser";

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
              <button className={`btn btn-neutral mt-7 p-1 px-7 h-9`} type="submit">
                Cambiar contraseña
              </button>
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
