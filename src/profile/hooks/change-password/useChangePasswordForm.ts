import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PasswordFieldErrors, PasswordType } from "../../types/user";
import { ChangePasswordUser, ChangePasswordUserFormData } from "../../zod/routesProfile";
import { useState } from "react";

type Props = {
  handlerErrors: Partial<Record<PasswordFieldErrors, string>>;
  confirmModal: () => void;
}

export default function useChangePasswordForm({ handlerErrors, confirmModal }: Props) {
  const [formData, setFormData] = useState<PasswordType | null>(null);
  
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<ChangePasswordUserFormData>({ resolver: zodResolver(ChangePasswordUser) });

  const submit = (data: PasswordType) => {
    if (!isValid(data)) return;
    setFormData(data);
    confirmModal();
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