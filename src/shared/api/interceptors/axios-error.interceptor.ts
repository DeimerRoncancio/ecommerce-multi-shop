import { AxiosInstance, AxiosResponse } from "axios";
import { getValidationError } from "../../utilities/get-validation-error";

export const AxiosError = (instance: AxiosInstance) => {
  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error) => {
      console.log(getValidationError(error.code));
      return Promise.resolve(error);
    }
  );
}
