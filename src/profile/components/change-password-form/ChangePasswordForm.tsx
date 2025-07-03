import { Link } from "react-router";
import ChangePasswordConfirmationModal from "./ChangePasswordConfirmationModal";
import NewPasswordFields from "./NewPasswordFields";
import useChangePasswordForm from "../../hooks/change-password/useChangePasswordForm";
import { useState } from "react";
import { useUpdateUser } from "../../hooks/api/useUpdateUser";
import { UserTypes } from "../../types/user";

type Props = {
  user: UserTypes;
  token: string;
}

export default function ChangePasswordForm({ user, token }: Props) {
  const { passwordLoading, sendPassword } = useUpdateUser({ user, token });
  const [isCurrentPasswordInvalid, setCurrentPassword] = useState(false);
  const [showConfirmModal, setConfirmModal] = useState(false);
  const [isSucces, setSucces] = useState(false);

  const {
    formData,
    errors,
    handleSubmit,
    register,
    submit,
    reset
  } = useChangePasswordForm({ isCurrentPasswordInvalid, setConfirmModal });

  const sendData = () => {
    if (!formData) return;
    sendPassword(formData)
      .then(() => {
        setSucces(true);
        reset();
        setTimeout(() => {
          setConfirmModal(false);
          setSucces(false);
        }, 1000)
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
    <form onSubmit={handleSubmit(submit)}>
      <div className="text-base border border-[#ebebeb] p-6 rounded-2xl text-black">
        <h2 className="mb-6 text-lg font-semibold text-[#84633f]">Cambiar contraseña</h2>
        <div className="flex flex-col gap-5">
          <div>
            <span className="text-[#c7c7c7]">Contraseña actual</span>
            <input
              type="text"
              className={`p-3 pl-4 mt-3 border-[1px] border-[#ebebeb] rounded-xl outline-0 w-full 
              focus:outline-2 focus:outline-[#ffdacd] focus:border-[#ff9b7a]
              ${errors.currentPassword?.message && 'border-red-500'}`}
              placeholder="Ingresa tu contraseña actual"
              {...register("currentPassword", {
                onChange: () => setCurrentPassword(false)
              })}
            />
            {errors.currentPassword?.message ? (
              <span className="text-red-500 ml-2">{errors.currentPassword?.message}</span>
            ) : isCurrentPasswordInvalid && (
              <span className="text-red-500 ml-2">Esta no es tu contraseña actual</span>
            )}
          </div>
          <NewPasswordFields
            errors={errors}
            register={register}
          />
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
      <ChangePasswordConfirmationModal
        onClose={onCloseConfirmModal}
        onSubmit={sendData}
        showModal={showConfirmModal}
        loading={passwordLoading}
        isSucces={isSucces}
      />
    </form>
  );
}
