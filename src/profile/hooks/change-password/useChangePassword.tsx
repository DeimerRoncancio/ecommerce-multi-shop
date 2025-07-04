import { useState } from "react";
import { PasswordFieldErrors, PasswordType } from "../../types/user";
import { UseFormReset } from "react-hook-form";

export default function useChangePassword() {
  const [handlerErrors, setHandlerErrors] = useState<Partial<Record<PasswordFieldErrors, string>>>({});
  const [showConfirmModal, setConfirmModal] = useState(false);
  const [isSucces, setSucces] = useState(false);

  const success = (reset: UseFormReset<PasswordType>) => {
    setSucces(true);
    reset();
    setTimeout(() => {
      setConfirmModal(false);
      setSucces(false);
    }, 1000)
  }

  const handleErrors = (err: any) => {
    if (err.response.data == 'PASSWORD_UNAUTHORIZED' && err.status == 401) {
      setHandlerErrors({
        currentPassword: 'Esta no es tu contraseña actual'
      });
      setConfirmModal(false);
    } else if (err.response.data == 'SAME_PASSWORD' && err.status == 401) {
      setHandlerErrors({
        newPassword: 'Esta ya es tu contraseña actual'
      });
      setConfirmModal(false);
    }
  }
  
  const onCloseConfirmModal = () => {
    document.body.classList.remove('overflow-hidden');
    setConfirmModal(false);
  }
  
  const clearErrors = () => setHandlerErrors({});

  const confirmModal = () => setConfirmModal(true);

  return {
    showConfirmModal,
    isSucces,
    handlerErrors,
    confirmModal,
    success,
    clearErrors,
    handleErrors,
    onCloseConfirmModal,
  }
}