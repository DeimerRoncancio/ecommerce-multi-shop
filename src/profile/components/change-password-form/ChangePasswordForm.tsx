import { Link } from "react-router";
import ChangePasswordConfirmationModal from "./ChangePasswordConfirmationModal";
import NewPasswordFields from "./NewPasswordFields";
import useChangePasswordForm from "../../hooks/change-password/useChangePasswordForm";
import { useUpdateUser } from "../../hooks/api/useUserService";
import { UserTypes } from "../../types/user";
import useChangePassword from "../../hooks/change-password/useChangePassword";

type Props = {
  user: UserTypes;
  token: string;
}

export default function ChangePasswordForm({ user, token }: Props) {
  const { passwordLoading, sendPassword } = useUpdateUser({ user, token });

  const {
    showConfirmModal, isSucces, handlerErrors,
    confirmModal, success, clearErrors,
    handleErrors, onCloseConfirmModal
  } = useChangePassword();

  const {
    formData, errors,
    handleSubmit, submit,
    reset, register,
  } = useChangePasswordForm({ handlerErrors, confirmModal });

  const sendData = () => {
    if (!formData) return;
    sendPassword(formData)
      .then(() => success(reset))
      .catch(handleErrors);
  }

  return (
    <form onSubmit={handleSubmit(submit)}>
      <div className="text-base border border-[#ebebeb] p-6 rounded-2xl text-black">
        <h2 className="mb-6 text-lg font-semibold text-[#84633f]">Cambiar Contraseña</h2>
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
                onChange: () => clearErrors()
              })}
            />
            {errors.currentPassword?.message ? (
              <span className="text-red-500 ml-2">{errors.currentPassword?.message}</span>
            ) : handlerErrors.currentPassword && (
              <span className="text-red-500 ml-2">{handlerErrors.currentPassword}</span>
            )}
          </div>
          <NewPasswordFields
            errors={errors}
            register={register}
            handlerErrors={handlerErrors}
            clearErrors={clearErrors}
          />
        </div>
        <div className="flex mt-7 justify-between items-center">
          <Link to="" className="text-[#f17147] hover:text-[#f04913] hover:underline">
            ¿Olvidaste tu contraseña?
          </Link>
          <button className={`btn btn-neutral p-1 px-7 h-9`} type="submit">
            Cambiar contraseña
          </button>
        </div>
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
