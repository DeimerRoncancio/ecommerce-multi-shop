import { UserInitialValues } from "../../helpers/users-initial-values.helper";
import { getUser } from "../../services/api/users";
import { UpdateRequestTypes, UserTypes } from "../../types/user";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { toUserTypes } from "../../mappers/profile-mapper";

export default function useUser() {
  const [user, setUser] = useState<UserTypes>(UserInitialValues);
  const [loading, setLoading] = useState(false);
  
  const updateUser = (newUserData: UpdateRequestTypes) => {
    const newUser: UserTypes = toUserTypes(newUserData, user);
    setUser(newUser);
  }
  
  const toGetUser = (token: string) => {
    setLoading(true);

    getUser(token)
      .then(data => setUser(data))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    const token = Cookies.get("accessHome");
    token && toGetUser(token);
  }, []);

  return {
    user,
    loading,
    updateUser
  }
}
