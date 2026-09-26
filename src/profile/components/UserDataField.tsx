import { UseFormRegister } from "react-hook-form"
import { UserUpdateTypes } from "../types/user"

type UserDataFieldProps = {
  register: UseFormRegister<UserUpdateTypes>,
  fieldName: string,
  name: any,
}

export default function UserDataField({ register, name, fieldName }: UserDataFieldProps) {
  return (
    <div>
      <span className="text-line">{fieldName}</span>
      <input
        type="text"
        className="p-3 pl-4 mt-3 border-[1px] border-line rounded-xl outline-0 w-full focus:outline-2 
          focus:outline-brand-soft focus:border-brand"
        {...register(name)}
      />
    </div>
  )
}
