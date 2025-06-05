import { AxiosInstance, InternalAxiosRequestConfig } from "axios";
import Cookies from 'js-cookie';

export const AxiosAuthInterceptor = (instance: AxiosInstance) => {
  const handleAuth = (request: InternalAxiosRequestConfig) => {
    const token = Cookies.get("accessHome");
    if (token) request.headers.Authorization = `Bearer ${token}`;
    return request;
  }

  instance.interceptors.request.use(request => {
    const auth = ["get-user"];
    if (auth.some(endPoint => request.url?.includes(endPoint)))
      return handleAuth(request);

    return request;
  });
}
