import { AxiosInstance, AxiosResponse } from "axios";

export const AxiosError = (instance: AxiosInstance) => {
  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error) => {
      console.log(error);
      return Promise.resolve(error);
    }
  );
}
