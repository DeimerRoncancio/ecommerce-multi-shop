import { useState } from "react";
import { ERROR_MESSAGES, ERROR, PasswordFieldErrors, PasswordType } from "../../types/user";
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
    if (err.response.data == ERROR.PASSWORD_UNAUTHORIZED && err.status == 401) {
      setHandlerErrors({
        currentPassword: ERROR_MESSAGES.currentPassword
      });
      setConfirmModal(false);
    }

    if (err.response.data == ERROR.SAME_PASSWORD && err.status == 401) {
      setHandlerErrors({
        newPassword: ERROR_MESSAGES.newPassword
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