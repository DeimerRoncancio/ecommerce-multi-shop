import { Link, useOutletContext } from "react-router"
import { PasswordType, UserTypes } from "../types/user";
import { Route } from "./+types/profile-settings";
import { getSession } from "../../sessions.server";
import { useState } from "react";
import ConfirmChangePassword from "../components/change-password/PasswordChangeConfirmationModal";
import { useUpdateUser } from "../hooks/api/useUpdateUser";
import NewPasswordFields from "../components/change-password/NewPasswordFields";
import useChangePasswordForm from "../hooks/change-password/useChangePasswordForm";

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
  
  const { passwordLoading, sendPassword } = useUpdateUser({ user, token });
  const [data, setData] = useState<PasswordType | null>(null);
  const [isCurrentPassword, setCurrentPassword] = useState(false);
  const [showConfirmModal, setConfirmModal] = useState(false);
  const [isSucces, setSucces] = useState(false);

  const {
    errors,
    handleSubmit,
    submit, reset,
    register 
  } = useChangePasswordForm({ isCurrentPassword, setData, setConfirmModal });

  const sendData = () => {
    if (!data) return;
    sendPassword(data)
      .then(() => {
        setSucces(true);
        reset();
        setTimeout(() => {
          setConfirmModal(false);
          setSucces(false);
        }, 2000)
      }).catch((err) => {
        if (err.response.data == 'PASSWORD_UNAUTHORIZED' || err.status == 401) {
          setCurrentPassword(true);
          setConfirmModal(false);
        }
      })
  }

  const onCloseConfirmModal = () => {
    document.body.classList.remove('overflow-hidden');
    setConfirmModal(false);
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
                    className="p-3 pl-4 mt-3 border-[1px] border-[#ebebeb] rounded-xl outline-0 w-full 
                    focus:outline-2 focus:outline-[#ffc1ad] focus:border-[#f14913]"
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
                <NewPasswordFields errors={errors} register={register} />
              </div>
            </div>
            <div className="flex mt-7 justify-between">
              <Link to="" className="text-[#f17147] hover:text-[#f04913] hover:underline">
                ¿Olvidaste tu contraseña?
              </Link>
              <button className={`btn btn-neutral p-1 px-7 h-9`} type="submit">
                Cambiar contraseña
              </button>
            </div>
            <ConfirmChangePassword 
              onClose={onCloseConfirmModal}
              onSubmit={sendData}
              showModal={showConfirmModal}
              loading={passwordLoading}
              isSucces={isSucces}
            />
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
