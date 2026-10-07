import { AxiosInstance, AxiosResponse } from "axios";
import { getValidationError } from "../../utilities/get-validation-error";
import { SnackbarUtilities } from "../../utilities/snackbar-manager";

export const AxiosError = (instance: AxiosInstance) => {
  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error) => {
      if (typeof window === "undefined") return Promise.reject(error);
      if (error.status === 401 || error.code === "ERR_CANCELED") return Promise.reject(error);
      SnackbarUtilities.error(getValidationError(error));
      return Promise.reject(error);
    }
  );
}
