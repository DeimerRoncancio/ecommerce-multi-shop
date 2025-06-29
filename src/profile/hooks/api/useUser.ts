import { UserInitialValues } from "../../constants/users-initial-values.helper";
import { getUser } from "../../services/users.api";
import { ImageType, UpdateRequestTypes, UserTypes } from "../../types/user";
import { useEffect, useState } from "react";
import { toUserTypes } from "../../mappers/profile.mapper";
import { useUserImage } from "../../storage/userUserImage";

type UseUserTypes = {
  token: string;
}

export default function useUser({ token }: UseUserTypes) {
  const [user, setUser] = useState<UserTypes>(UserInitialValues);
  const { userImage, setImage } = useUserImage();
  const [loading, setLoading] = useState(false);
  
  const updateUser = (newUserData: UpdateRequestTypes) => {
    const newUser: UserTypes = toUserTypes(newUserData, user);
    setUser(newUser);
  }

  const updateImageUser = (image: ImageType) => {
    user.profileImage = image;
    setImage(image.imageUrl);
    setUser(user);
  }
  
  const toGetUser = (token: string) => {
    setLoading(true);

    getUser(token)
      .then(data => {
        setUser(data)
        setImage(data.profileImage?.imageUrl as string);
      })
      .finally(() => setLoading(false));
  }

  useEffect(() => { token && toGetUser(token) }, [token]);

  return {
    user,
    userImage,
    loading,
    toGetUser,
    updateUser,
    updateImageUser
  }
}
