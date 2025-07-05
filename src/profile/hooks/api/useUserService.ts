import { initialUserValues } from "../../constants/users-initial-values.helper";
import { ImageType, PasswordRequestType, UpdateRequestTypes, UserTypes, UserUpdateTypes } from "../../types/user";
import { updateTypesToRequestTypes } from "../../mappers/profile.mapper";
import { deleteUserAccount, updatePassword, updateUserData, updateUserImage } from "../../services/users.api";
import { useForm, useWatch } from "react-hook-form";
import { useEffect, useState } from "react";

type UseUpdateUserProps = {
  user: UserTypes;
  token: string;
  updateUser?: (user: UpdateRequestTypes) => void;
  updateImageUser?: (image: ImageType) => void;
}

export const useUserService = ({ user, token, updateUser, updateImageUser }: UseUpdateUserProps) => {
  const { register, handleSubmit, reset, control } = useForm<UserUpdateTypes>();
  const [passwordLoading, setLoadingPassword] = useState(false);
  const userInitialValues = initialUserValues(user);
  const currentValues = useWatch({ control });

  const sendData = (data: UserUpdateTypes) => {
    const userInfo: UpdateRequestTypes = updateTypesToRequestTypes(data);
    updateUserData(user.id, token, userInfo);
    updateUser && updateUser(userInfo);
  }

  const sendImage =(formData: FormData) => {
    return updateUserImage(user.id, token, formData)
      .then((res) => updateImageUser && updateImageUser(res.data));
  }

  const sendPassword = (data: PasswordRequestType) => {
    setLoadingPassword(true);
    return updatePassword(user.id, token, data)
      .finally(() => setLoadingPassword(false));
  }

  const deleteAccount = (id: string, token: string) =>  deleteUserAccount(id, token);

  useEffect(() => user && reset(userInitialValues), [user, reset]);

  return {
    userInitialValues,
    currentValues,
    passwordLoading,
    register,
    handleSubmit,
    sendData,
    sendImage,
    sendPassword,
    deleteAccount
  }
}
