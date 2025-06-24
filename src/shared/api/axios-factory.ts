import axios, { AxiosInstance } from "axios";
import { AxiosError } from "./interceptors/axios-error.interceptor";

export function createInstance(baseURL: string): AxiosInstance {
  const instance = axios.create({ baseURL });
  AxiosError(instance);
  return instance;
}
