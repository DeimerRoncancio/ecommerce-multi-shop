import { envs } from "../../config/env.config";
import axios from "axios";

export default function useGetUser() {
  const getUser = (token: string | undefined) => {
    return axios.get(`${envs.API}/app/users/get-user/${token}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
  }

  return {
    getUser
  }
}
