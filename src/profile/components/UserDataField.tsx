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
      <span className="text-[#c7c7c7]">{fieldName}</span>
      {/* <div className="p-3 pl-4 mt-3 border-[1px] border-[#ebebeb] rounded-xl"> */}
        <input
          type="text"
          className="p-3 pl-4 mt-3 border-[1px] border-[#ebebeb] rounded-xl outline-0 w-full focus:outline-2 
          focus:outline-[#ffc1ad] focus:border-[#f14913]"
          {...register(name)}
        />
      {/* </div> */}
    </div>
  )
}
