import { UserInitialValues } from "../../helpers/users-initial-values.helper";
import { getUser } from "../../services/api/users";
import { UserTypes } from "../../types/user";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

export default function useUser() {
  const [user, setUser] = useState<UserTypes>(UserInitialValues);
  const [loading, setLoading] = useState(true);
  
  const toGetUser = (token: string) => {
    // setLoading(true);

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
    loading
  }
}
