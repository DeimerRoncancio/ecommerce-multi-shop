import useValidationMatchPassword from "../../hooks/change-password/useValidationMatchPassword";
import { PasswordType } from "../../types/user";
import { FieldErrors, UseFormRegister } from "react-hook-form";

type Props = {
  errors: FieldErrors<PasswordType>;
  register: UseFormRegister<PasswordType>
}

export default function NewPasswordFields({ errors, register }: Props) {
  const { isPasswordMatch, onFieldsChange } = useValidationMatchPassword();

  return (
    <div className="grid grid-cols-2 gap-5">
      <div>
        <span className="text-[#c7c7c7]">Nueva contraseña</span>
        <input
          type="text"
          className={`p-3 pl-4 mt-3 border-[1px] border-[#ebebeb] rounded-xl outline-0 w-full 
          focus:outline-2 focus:outline-[#ffdacd] focus:border-[#ff9b7a]
          ${errors.newPassword?.message && 'border-red-500'}`}
          placeholder="Ingresa tu neva contraseña"
          {...register("newPassword", {
            onChange: onFieldsChange
          })}
        />
        {errors.newPassword?.message && (
          <span className="text-red-500 ml-2">{errors.newPassword.message}</span>
        )}
      </div>
      <div>
        <span className="text-[#c7c7c7]">Confirma tu nueva contraseña</span>
        <input
          type="text"
          className={`p-3 pl-4 mt-3 border-[1px] border-[#ebebeb] rounded-xl outline-0 w-full
          focus:outline-2 focus:outline-[#ffdacd] focus:border-[#ff9b7a]
          ${errors.confirmPassword?.message && 'border-red-500'}`}
          placeholder="Confirma tu neva contraseña"
          {...register("confirmPassword", {
            onChange: onFieldsChange
          })}
        />
        {errors.confirmPassword?.message ? (
          <span className="text-red-500  ml-2">{errors.confirmPassword?.message}</span>
        ) : isPasswordMatch && (
          <span className="text-red-500  ml-2">Las contraseñas no coinciden</span>
        )}
      </div>
    </div>
  );
}
