import { useRef, useState } from "react";

export const useUpdateAlert = () => {
  const [showAlert, setShowAlert] = useState(false);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleUpdatedAlert = () => {
    if (showAlert && timeoutRef.current !== null) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => setShowAlert(false), 4000);
  }

  const handleAlert = (showAlert: boolean) => setShowAlert(showAlert);

  return {
    showAlert,
    handleAlert,
    handleUpdatedAlert
  }
}
