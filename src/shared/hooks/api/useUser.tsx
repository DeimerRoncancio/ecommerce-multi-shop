import { useEffect, useState } from "react";
import { envs } from "../../config/env.config";
import { UserInitialValues } from "../../../profile/helpers/users-initial-values.helper";
import { UserTypes } from "../../../profile/types/user";
import Cookies from "js-cookie";
import axios from "axios";

export default function useUser() {
  const [user, setUser] = useState<UserTypes>(UserInitialValues);
  const [loading, setLoading] = useState(false);
  
  const getUser = (token: string) => {
    setLoading(true);

    axios.get(`${envs.API}/app/users/get-user/${token}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then(res => setUser(res.data))
      .finally(() => setLoading(false));
  }

  useEffect(() => {
    const token = Cookies.get("accessHome");
    token && getUser(token);
  }, []);

  return {
    user,
    loading
  }
}
