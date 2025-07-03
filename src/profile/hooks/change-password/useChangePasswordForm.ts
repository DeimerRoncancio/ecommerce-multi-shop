import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordType } from "../../types/user";
import { ChangePasswordUser, ChangePasswordUserFormData } from "../../zod/routesProfile";
import { useState } from "react";

type FieldErros = 'currentPassword' | 'newPassword';

type Props = {
  handlerErrors: Partial<Record<FieldErros, string>>;
  setConfirmModal: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function useChangePasswordForm({ handlerErrors, setConfirmModal }: Props) {
  const [formData, setFormData] = useState<PasswordType | null>(null);
  
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm<ChangePasswordUserFormData>({ resolver: zodResolver(ChangePasswordUser) });

  const submit = (data: PasswordType) => {
    if (!isValid(data)) return;
    setConfirmModal(true);
    setFormData(data);
  }

  const isValid = (data: PasswordType) => {
    const result = ChangePasswordUser.safeParse(data);
    return result.success && !Object.keys(handlerErrors).length;
  }

  return {
    formData,
    errors,
    submit,
    reset,
    handleSubmit,
    register
  }
}