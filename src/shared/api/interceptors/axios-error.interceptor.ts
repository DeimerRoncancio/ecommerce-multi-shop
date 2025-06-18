import { AxiosInstance, AxiosResponse } from "axios";
import { getValidationError } from "../../utilities/get-validation-error";
import { SnackbarUtilities } from "../../utilities/snackbar-manager";

export const AxiosError = (instance: AxiosInstance) => {
  instance.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error) => {
      if (error.status === 401) return;
      
      SnackbarUtilities.error(getValidationError(error.code, error.stack));
      return Promise.resolve(error);
    }
  );
}
