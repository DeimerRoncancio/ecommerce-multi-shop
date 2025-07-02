import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordType } from "../../types/user";
import { ChangePasswordUser, ChangePasswordUserFormData } from "../../zod/routesProfile";

type Props = {
  isCurrentPassword: boolean;
  setData: React.Dispatch<React.SetStateAction<PasswordType | null>>;
  setConfirmModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function useChangePasswordForm({ isCurrentPassword, setData, setConfirmModal }: Props) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ChangePasswordUserFormData>({ resolver: zodResolver(ChangePasswordUser) });

  const submit = (data: PasswordType) => {
    if (!validationFields(data)) return;
    setConfirmModal(true);
    setData(data);
  }
  
  const validationFields = (data: PasswordType) => {
    const result = ChangePasswordUser.safeParse(data);
    if (!result.success || isCurrentPassword) return false;
    return true;
  }

  return {
    errors,
    submit,
    reset,
    handleSubmit,
    register
  }
}