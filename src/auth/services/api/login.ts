import axios, { AxiosError } from "axios";
import { envs } from "../../../shared/config/env.config";
import { LoginAccesUserFormData } from "../../zod/routesAuth";

export const send = (data: LoginAccesUserFormData) => {
  return axios
    .post(`${envs.API}/login`, data)
    .then((res) => res.data)
    .catch((err) => {
      return (err as AxiosError).response?.data;
    });
}
