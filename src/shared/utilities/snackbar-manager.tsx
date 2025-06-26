import { VariantType, enqueueSnackbar } from "notistack";

let useSnackbarRef;
export const setSnackbarRef = () => {
  useSnackbarRef = enqueueSnackbar;
};

export const SnackbarUtilities = {
  toast(msg: string, variant: VariantType = "default") {
    enqueueSnackbar(msg, { variant, persist: true })
  },
  succes(mess: string) {
    this.toast(mess, "success")
  },
  error(mess: string) {
    this.toast(mess, "errorAlert");
  }
}
