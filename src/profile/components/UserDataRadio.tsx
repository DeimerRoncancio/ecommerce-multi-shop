import { UseFormRegister } from "react-hook-form"
import { UserUpdateTypes } from "../types/user"
import { profileGenderOptions } from "../constants/profile.helper";

type UserDataRadioProps = {
  register: UseFormRegister<UserUpdateTypes>,
}

export default function UserDataRadio({ register }: UserDataRadioProps) {
  return (
    <fieldset>
      <legend className="text-xs font-bold text-ink">Género</legend>
      <div className="mt-1 flex gap-2">
        {profileGenderOptions.map(option => (
          <label
            key={option.id}
            className="flex h-10 cursor-pointer items-center gap-2 rounded-lg border border-line px-4 text-sm text-ink
              transition-colors hover:border-ink-muted has-checked:border-brand has-checked:bg-brand-soft/60
              has-checked:font-bold has-checked:text-brand"
          >
            <input type="radio" id={option.id} value={option.value} className="peer sr-only" {...register('gender')} />
            <span className="grid h-4 w-4 place-items-center rounded-full border-2 border-line peer-checked:border-brand
              peer-checked:[&>span]:opacity-100 peer-focus-visible:ring-4 peer-focus-visible:ring-brand/20">
              <span className="h-1.5 w-1.5 rounded-full bg-brand opacity-0" />
            </span>
            {option.label}
          </label>
        ))}
      </div>
    </fieldset>
  )
}
