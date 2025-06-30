import { initialUserValues } from "../../constants/users-initial-values.helper";
import { ImageType, PasswordRequestType, UpdateRequestTypes, UserTypes, UserUpdateTypes } from "../../types/user";
import { updateTypesToRequestTypes } from "../../mappers/profile.mapper";
import { updatePassword, updateUserData, updateUserImage } from "../../services/users.api";
import { useForm, useWatch } from "react-hook-form";
import { useEffect } from "react";

type UseUpdateUserProps = {
  user: UserTypes;
  token: string;
  updateUser?: (user: UpdateRequestTypes) => void;
  updateImageUser?: (image: ImageType) => void;
}

export const useUpdateUser = ({ user, token, updateUser, updateImageUser }: UseUpdateUserProps) => {
  const { register, handleSubmit, reset, control } = useForm<UserUpdateTypes>();
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
    return updatePassword(user.id, token, data);
  }

  useEffect(() => user && reset(userInitialValues), [user, reset]);

  return {
    userInitialValues,
    currentValues,
    sendData,
    sendImage,
    sendPassword,
    register,
    handleSubmit
  }
}
