import { VariantType, enqueueSnackbar } from "notistack";

let useSnackbarRef;
export const setSnackbarRef = () => {
  useSnackbarRef = enqueueSnackbar;
};

export const SnackbarUtilities = {
  toastError(msg: string, variant: VariantType = "default") {
    enqueueSnackbar(msg, { variant, persist: true })
  },
  toast(msg: string, variant: VariantType = "default") {
    enqueueSnackbar(msg, {
      variant, autoHideDuration: 3000, anchorOrigin: {
        vertical: 'bottom',
        horizontal: 'right'
      }
    })
  },
  succes(mess: string) {
    this.toast(mess, "success")
  },
  error(mess: string) {
    this.toastError(mess, "errorAlert");
  }
}
