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
      <label className="text-[#c7c7c7]">{fieldName}</label>
      <div className="p-2 border-b-[1px] border-b-[#c7c7c7]">
        <input
          type="text"
          className="outline-0 w-full"
          {...register(name)}
        />
      </div>
    </div>
  )
}
