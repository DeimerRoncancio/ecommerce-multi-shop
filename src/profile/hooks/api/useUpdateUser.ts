import { initialUserValues } from "../../constants/users-initial-values.helper";
import { UpdateRequestTypes, UserTypes, UserUpdateTypes } from "../../types/user";
import { updateTypesToRequestTypes } from "../../mappers/profile.mapper";
import { updateUserData } from "../../services/users.api";
import { useForm, useWatch } from "react-hook-form";
import { useEffect } from "react";

type UseUpdateUserProps = {
  user: UserTypes;
  token: string;
  updateUser: (user: UpdateRequestTypes) => void;
}

export const useUpdateUser = ({ user, token, updateUser }: UseUpdateUserProps) => {
  const { register, handleSubmit, reset, control } = useForm<UserUpdateTypes>();
  const userInitialValues = initialUserValues(user);
  const currentValues = useWatch({ control });

  const sendData = (data: UserUpdateTypes) => {
    const userInfo: UpdateRequestTypes = updateTypesToRequestTypes(data);
    updateUserData(user.id, token, userInfo);
    updateUser(userInfo);
  }

  useEffect(() => {
    if (user) reset(userInitialValues);
  }, [user, reset]);

  return {
    userInitialValues,
    currentValues,
    sendData,
    register,
    handleSubmit
  }
}
