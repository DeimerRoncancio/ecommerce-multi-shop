import { initialUserValues } from "../../constants/users-initial-values.helper";
import { UserTypes, UserUpdateTypes } from "../../types/user";
import { useForm, useWatch } from "react-hook-form";
import { useEffect } from "react";

type UseUpdateUserProps = {
  user: UserTypes;
}

export const useUserService = ({ user }: UseUpdateUserProps) => {
  const { register, handleSubmit, reset, control } = useForm<UserUpdateTypes>();
  const userInitialValues = initialUserValues(user);
  const currentValues = useWatch({ control });

  useEffect(() => user && reset(userInitialValues), [user, reset]);

  return {
    userInitialValues,
    currentValues,
    register,
    handleSubmit,
    reset
  }
}
