import { enqueueSnackbar } from "notistack";

export const SnackbarUtilities = {
  success(message: string) {
    enqueueSnackbar(message, { variant: "success", autoHideDuration: 3000 });
  },
  error(message: string) {
    enqueueSnackbar(message, { variant: "errorAlert", persist: true });
  },
}
