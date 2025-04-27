import { envs } from "../../../shared/config/env.config";
import axios from "axios";

export const getUser = (token: string) => {
  return axios.get(`${envs.API}/app/users/get-user/${token}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  }).then(res => res.data)
}
