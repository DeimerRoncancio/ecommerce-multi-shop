import { Link } from "react-router";
import ChangePasswordConfirmationModal from "./ChangePasswordConfirmationModal";
import NewPasswordFields from "./NewPasswordFields";
import useChangePasswordForm from "../../hooks/change-password/useChangePasswordForm";
import { useUserService } from "../../hooks/api/useUserService";
import { UserTypes } from "../../types/user";
import useChangePassword from "../../hooks/change-password/useChangePassword";
import PasswordField from "../../../shared/ui/PasswordField";

type Props = {
  user: UserTypes;
  token: string;
}

export default function ChangePasswordForm({ user, token }: Props) {
  const { passwordLoading, sendPassword } = useUserService({ user, token });

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
      <h3 className="text-xs font-extrabold uppercase tracking-[0.08em] text-brand">Seguridad</h3>
      <p className="mt-1 text-lg font-extrabold text-ink">Cambiar contraseña</p>
      <p className="text-sm text-ink-muted">Usa al menos 8 caracteres. Te pediremos confirmar el cambio.</p>

      <div className="mt-4 flex flex-col gap-3">
        <PasswordField
          label="Contraseña actual"
          placeholder="Tu contraseña actual"
          autoComplete="current-password"
          error={errors.currentPassword?.message ?? handlerErrors.currentPassword}
          {...register("currentPassword", { onChange: () => clearErrors() })}
        />
        <NewPasswordFields
          errors={errors}
          register={register}
          handlerErrors={handlerErrors}
          clearErrors={clearErrors}
        />
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <Link to="" className="text-sm font-semibold text-brand underline-offset-4 hover:underline">
          ¿Olvidaste tu contraseña?
        </Link>
        <button
          type="submit"
          className="h-10 rounded-full bg-brand px-6 text-sm font-bold text-white transition-colors hover:bg-ink"
        >
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
