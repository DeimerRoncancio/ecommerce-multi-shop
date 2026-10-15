import { enqueueSnackbar } from "notistack";

export const SnackbarUtilities = {
  success(message: string) {
    enqueueSnackbar(message, { variant: "success", autoHideDuration: 3000 });
  },
  warning(message: string) {
    enqueueSnackbar(message, { variant: "warning", persist: true });
  },
  error(message: string) {
    enqueueSnackbar(message, { variant: "errorAlert", persist: true });
  },
};
