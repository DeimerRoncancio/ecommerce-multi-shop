import { enqueueSnackbar } from "notistack";

export const SnackbarUtilities = {
  success(message: string) {
    enqueueSnackbar(message, { variant: "success", autoHideDuration: 3000 });
  },
  warning(message: string) {
    enqueueSnackbar(message, { variant: "warning", persist: true });
  },
  productAdded(kind: "cart" | "wishlist", name: string, image?: string) {
    enqueueSnackbar(name, { variant: "productAdded", kind, image, autoHideDuration: 3500 });
  },
  productRemoved(kind: "cart" | "wishlist", name: string, image?: string, onUndo?: () => void, heading?: string) {
    enqueueSnackbar(name, {
      variant: "productAdded",
      kind,
      image,
      removed: true,
      onUndo,
      heading,
      autoHideDuration: 5000,
    });
  },
  error(message: string) {
    enqueueSnackbar(message, { variant: "errorAlert", persist: true });
  },
};
