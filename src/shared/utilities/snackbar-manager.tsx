import { VariantType, enqueueSnackbar } from "notistack";

export const SnackbarUtilities = {
  toastError(msg: string, variant: VariantType = "default") {
    if (!enqueueSnackbar) return; 
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
