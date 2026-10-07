import { AxiosError } from "axios";

export const getValidationError = (error: AxiosError) => {
  const status = error.response?.status;

  if (error.code === "ERR_NETWORK") return "No pudimos conectar con el servidor. Revisa tu conexión.";
  if (error.code === "ECONNABORTED" || error.code === "ETIMEDOUT") return "El servidor tardó demasiado en responder.";
  if (status === 404) return "No encontramos lo que buscabas.";
  if (status === 403) return "No tienes permiso para hacer esto.";
  if (status && status >= 500) return "El servicio no está disponible en este momento. Inténtalo en unos minutos.";
  if (status && status >= 400) return "Revisa los datos e inténtalo de nuevo.";

  return "Algo salió mal. Inténtalo de nuevo.";
}
