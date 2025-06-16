import axios, { AxiosInstance } from "axios";
import { AxiosAuthInterceptor } from "./interceptors/axios-auth.interceptor";
import { AxiosError } from "./interceptors/axios-error.interceptor";

export function createInstance(baseURL: string): AxiosInstance {
  const instance = axios.create({ baseURL });
  AxiosAuthInterceptor(instance);
  AxiosError(instance);
  return instance;
}
