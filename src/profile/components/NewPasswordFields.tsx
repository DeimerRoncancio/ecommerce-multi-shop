import { PasswordType } from "../types/user";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import useValidationMatchPassword from "../hooks/useValidationMatchPassword";

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
          className="p-3 pl-4 mt-3 border-[1px] border-[#ebebeb] rounded-xl outline-0 w-full 
          focus:outline-2 focus:outline-[#ffc1ad] focus:border-[#f14913]"
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
          className="p-3 pl-4 mt-3 border-[1px] border-[#ebebeb] rounded-xl outline-0 w-full
          focus:outline-2 focus:outline-[#ffc1ad] focus:border-[#f14913]"
          placeholder="Confirma tu neva contraseña"
          {...register("confirmPassword", {
            onChange: onFieldsChange
          })}
        />
        {errors.confirmPassword?.message ? (
          <span style={{ color: "red" }}>{errors.confirmPassword?.message}</span>
        ) : isPasswordMatch && (
          <span style={{ color: "red" }}>Las contraseñas no coinciden</span>
        )}
      </div>
    </div>
  );
}
