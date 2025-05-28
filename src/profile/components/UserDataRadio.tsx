import { useState } from "react"
import { FieldValues, UseFormRegister } from "react-hook-form"

type UserDataRadioProps = {
  register: UseFormRegister<FieldValues>,
  data?: string
}

export default function UserDataRadio({ data, register }: UserDataRadioProps) {
  const [selected, setSelected] = useState(data)
  
  return (
    <div>
      <label className="text-[#c7c7c7]">Género</label>
      <div className="flex pt-4 gap-6">
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="radio" id="H" value="male"
            className="radio radio-neutral radio-sm"
            checked={selected == 'male'}
            {...register('gender')}
            onChange={() => {}}
          />
          <span>Hombre</span>
        </label>
        <label className="flex items-center space-x-3 cursor-pointer">
          <input
            type="radio" id="M" value="female"
            className="radio radio-neutral radio-sm"
            checked={selected == 'female'}
            {...register('gender')}
            onChange={() => {}}
          />
          <span>Mujer</span>
        </label>
      </div>
    </div>
  )
}
