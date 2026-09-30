import { UseFormRegister } from "react-hook-form"
import { UserUpdateTypes } from "../types/user"
import TextField from "../../shared/ui/TextField"

type UserDataFieldProps = {
  register: UseFormRegister<UserUpdateTypes>,
  fieldName: string,
  name: any,
  type?: string,
}

export default function UserDataField({ register, name, fieldName, type = "text" }: UserDataFieldProps) {
  return <TextField label={fieldName} type={type} {...register(name)} />
}
