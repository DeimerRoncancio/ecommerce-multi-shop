import { useState } from "react";
import { PasswordMatchInitialValues } from "../constants/password-match-initial-values.helper";
import { PasswordMatchType } from "../types/user";

export default function useValidationMatchPassword() {
  const [isPasswordMatch, setIsPasswordMatch] = useState(false);
  const [
    passwordMatch,
    setPasswordMatch
  ] = useState<PasswordMatchType>(PasswordMatchInitialValues)

  const onFieldsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const isMismatch =
      e.target.name === 'newPassword'
        ? passwordMatch.confirmPassword !== e.target.value
        : passwordMatch.newPassword !== e.target.value;

    setIsPasswordMatch(isMismatch);
    setPasswordMatch(prev => ({ ...prev, [e.target.name]: e.target.value }));
  }

  return {
    isPasswordMatch,
    onFieldsChange
  }
}
