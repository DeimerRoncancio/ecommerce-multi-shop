import { envs } from "../../shared/config/env.config";
import Cookies from 'js-cookie';
import axios from "axios";

export const users = axios.create({ baseURL: `${envs.API}/app/users` });

users.interceptors.request.use(config => {
  const token = Cookies.get("accessHome");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});
