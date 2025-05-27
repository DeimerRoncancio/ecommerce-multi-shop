import { useState } from "react"

type UserDataRadioProps = {
  data?: string
}

export default function UserDataRadio({ data }: UserDataRadioProps) {
  const [selected, setSelected] = useState(data)
  
  return (
    <div>
      <label className="text-[#c7c7c7]">Género</label>
      <div className="flex pt-4 gap-6">
        <label className="flex items-center space-x-3 cursor-pointer">
          <input 
            type="radio" id="H" name="radio-3"
            className="radio radio-neutral radio-sm"
            checked={selected == 'male'}
          />
          <span>Hombre</span>
        </label>
        <label className="flex items-center space-x-3 cursor-pointer">
          <input 
            type="radio" id="M" name="radio-3"
            className="radio radio-neutral radio-sm"
            checked={selected == 'female'}
          />
          <span>Mujer</span>
        </label>
      </div>
    </div>
  )
}
