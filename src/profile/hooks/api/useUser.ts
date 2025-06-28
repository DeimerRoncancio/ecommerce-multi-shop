import { UserInitialValues } from "../../constants/users-initial-values.helper";
import { getUser } from "../../services/users.api";
import { ImageType, UpdateRequestTypes, UserTypes } from "../../types/user";
import { useEffect, useState } from "react";
import { toUserTypes } from "../../mappers/profile.mapper";

type UseUserTypes = {
  token: string;
}

export default function useUser({ token }: UseUserTypes) {
  const [user, setUser] = useState<UserTypes>(UserInitialValues);
  const [loading, setLoading] = useState(false);
  
  const updateUser = (newUserData: UpdateRequestTypes) => {
    const newUser: UserTypes = toUserTypes(newUserData, user);
    setUser(newUser);
  }

  const updateImageUser = (image: ImageType) => {
    user.profileImage = image;
    setUser(user);
  }
  
  const toGetUser = (token: string) => {
    setLoading(true);

    getUser(token)
      .then(data => setUser(data))
      .finally(() => setLoading(false));
  }

  useEffect(() => { token && toGetUser(token) }, [token]);

  return {
    user,
    loading,
    toGetUser,
    updateUser,
    updateImageUser
  }
}
