import { useOutletContext } from "react-router"
import { PasswordType, UserTypes } from "../types/user";
import { useForm } from "react-hook-form";
import { Route } from "./+types/profile-settings";
import { getSession } from "../../sessions.server";
import { useUpdateUser } from "../hooks/api/useUpdateUser";
import { TiWarningOutline } from "react-icons/ti";
import { useState } from "react";
import { ChangePasswordUser, ChangePasswordUserFormData } from "../zod/routesProfile";
import { zodResolver } from "@hookform/resolvers/zod";
import { BsCheck2Circle } from "react-icons/bs";

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
  const [showConfirmModal, setConfirmModal] = useState(false);
  const [data, setData] = useState<PasswordType | null>(null);
  const [updateData, setUpdateData] = useState<{ newPassword: string, confirmPassword: string }>({
    newPassword: '',
    confirmPassword: ''
  })
  const [ isCurrentPassword, setCurrentPassword ] = useState(false);

  const [ isSucces, setSucces ] = useState(false);

  const [
    newPasswordConfirmation,
    setPasswordConfirmation
  ] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ChangePasswordUserFormData>({ resolver: zodResolver(ChangePasswordUser) });
  const { user, loading } = useOutletContext<userContext>();
  const { token } = loaderData;

  const { passwordLoading, sendPassword } = useUpdateUser({ user, token });

  const submit = (data: PasswordType) => {
    if (data.newPassword !== data.confirmPassword) throw Error('Las contraseñas no coinciden');
    if (!validationFields(data)) return;

    setConfirmModal(true);
    setData(data);
  }

  const sendData = () => {
    if (!data) return;
    sendPassword(data)
      .then(() => {
        setSucces(true);
        setTimeout(() => {
          setConfirmModal(false);
          setSucces(false);
        }, 2000)
      })
      .catch((err) => {
        if (err.response.data == 'PASSWORD_UNAUTHORIZED' || err.status == 401) {
          setCurrentPassword(true);
          setConfirmModal(false);
        }
      })
  }

  const onFieldsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isMismatch =
      e.target.name === 'newPassword'
        ? updateData.confirmPassword !== e.target.value
        : updateData.newPassword !== e.target.value;

    setPasswordConfirmation(isMismatch);
    setUpdateData(prev =>  ({ ...prev, [e.target.name]: e.target.value }));
  }

  const validationFields = (data: PasswordType) => {
    const result = ChangePasswordUser.safeParse(data);
    if (!result.success || isCurrentPassword) return false;
    return true;
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
                    {...register("currentPassword", {
                      onChange: () => setCurrentPassword(false)
                    })}
                  />
                  {errors.currentPassword?.message ? (
                    <span style={{ color: "red" }}>{errors.currentPassword?.message}</span>
                  ) : isCurrentPassword && (
                    <span style={{ color: "red" }}>Esta no es tu contraseña actual</span>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-5">
                  <div>
                    <span className="text-[#c7c7c7]">Nueva contraseña</span>
                    <input
                      type="text"
                      className="p-3 pl-4 mt-3 border-[1px] border-[#ebebeb] rounded-xl outline-0 w-full focus:outline-2 
                      focus:outline-[#ffc1ad] focus:border-[#f14913]"
                      placeholder="Ingresa tu neva contraseña"
                      {...register("newPassword", {
                        onChange: onFieldsChange
                      })}
                    />
                    {errors.newPassword?.message && (
                      <span style={{ color: "red" }}>{errors.newPassword.message}</span>
                    )}
                  </div>
                  <div>
                    <span className="text-[#c7c7c7]">Confirma tu nueva contraseña</span>
                    <input
                      type="text"
                      className="p-3 pl-4 mt-3 border-[1px] border-[#ebebeb] rounded-xl outline-0 w-full focus:outline-2 
                      focus:outline-[#ffc1ad] focus:border-[#f14913]"
                      placeholder="Confirma tu neva contraseña"
                      {...register("confirmPassword", {
                        onChange: onFieldsChange
                      })}
                    />
                    {errors.confirmPassword?.message ? (
                      <span style={{ color: "red" }}>{errors.confirmPassword?.message}</span>
                    ) : newPasswordConfirmation && (
                      <span style={{ color: "red" }}>Las contraseñas no coinciden</span>
                    )}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex justify-end">
              <button className={`btn btn-neutral mt-7 p-1 px-7 h-9`} type="submit">
                Cambiar contraseña
              </button>
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
                {
                  isSucces ? (
                    <span className="flex p-3 mt-4 items-center gap-2 bg-green-50 border border-green-200 rounded-md">
                      <BsCheck2Circle />
                      <p className="text-sm text-green-800">Contraseña cambiada exitosamente</p>
                    </span>
                  ) : (
                    <div className="flex justify-end items-center gap-4 mt-4">
                      <div className="btn rounded-sm" onClick={() => {
                        document.body.classList.remove('overflow-hidden');
                        setConfirmModal(false);
                      }}>Cancelar</div>
                      <div className={`btn rounded-sm btn-error ${passwordLoading && 'btn-disabled'}`}
                        onClick={sendData}>{
                          passwordLoading ? 'Confirmando...' : 'Confirmar'}
                      </div>
                    </div>
                  )
                }
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
