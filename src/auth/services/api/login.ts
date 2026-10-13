import axios, { AxiosError } from "axios";
import { envs } from "../../../shared/config/env.config";
import { LoginAccessUserFormData } from "../../zod/routesAuth";

export const send = (data: LoginAccessUserFormData) => {
  return axios
    .post<{ token: string }>(`${envs.API}/login`, data)
    .then((res) => ({ ok: true as const, token: res.data.token }))
    .catch((err: AxiosError) => ({ ok: false as const, status: err.response?.status }));
}
