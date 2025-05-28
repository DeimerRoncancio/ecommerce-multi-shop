import { UseFormRegister } from "react-hook-form"
import { UserUpdateTypes } from "../types/user"

type UserDataRadioProps = {
  register: UseFormRegister<UserUpdateTypes>,
}

export default function UserDataRadio({ register }: UserDataRadioProps) {
  return (
    <div>
      <label className="text-[#c7c7c7]">Género</label>
      <div className="flex pt-4 gap-6">
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="radio" id="H" value="male"
            className="radio radio-neutral radio-sm"
            {...register('gender')}
          />
          <span>Hombre</span>
        </label>
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="radio" id="M" value="female"
            className="radio radio-neutral radio-sm"
            {...register('gender')}
          />
          <span>Mujer</span>
        </label>
      </div>
    </div>
  )
}
