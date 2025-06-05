import axios, { AxiosInstance } from "axios";
import { AxiosAuthInterceptor } from "./interceptors/axios-auth.interceptor";

export function createInstance(baseURL: string): AxiosInstance {
  const instance = axios.create({ baseURL });
  AxiosAuthInterceptor(instance);
  return instance;
}
