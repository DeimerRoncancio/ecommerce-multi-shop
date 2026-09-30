import useValidationMatchPassword from "../../hooks/change-password/useValidationMatchPassword";
import { PasswordType } from "../../types/user";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import PasswordField from "../../../shared/ui/PasswordField";

type Errors = 'currentPassword' | 'newPassword';

type Props = {
  errors: FieldErrors<PasswordType>;
  handlerErrors: Partial<Record<Errors, string>>;
  clearErrors: () => void;
  register: UseFormRegister<PasswordType>;
}

export default function NewPasswordFields({ errors, handlerErrors, clearErrors, register }: Props) {
  const { isPasswordMatch, onFieldsChange } = useValidationMatchPassword({ clearErrors });

  return (
    <div className="grid gap-x-4 gap-y-3 sm:grid-cols-2">
      <PasswordField
        label="Nueva contraseña"
        placeholder="Tu nueva contraseña"
        autoComplete="new-password"
        error={errors.newPassword?.message ?? handlerErrors.newPassword}
        {...register("newPassword", { onChange: onFieldsChange })}
      />
      <PasswordField
        label="Confirma la nueva contraseña"
        placeholder="Escríbela otra vez"
        autoComplete="new-password"
        error={errors.confirmPassword?.message ?? (isPasswordMatch ? "Las contraseñas no coinciden" : undefined)}
        {...register("confirmPassword", { onChange: onFieldsChange })}
      />
    </div>
  );
}
