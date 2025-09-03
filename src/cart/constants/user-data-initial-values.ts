import { UserData } from "../types/cart";
import { UserDataForm } from "../zod/routesCart";

export const UserDataInitialValues = (user: UserData): UserDataForm => {
  return {
    names: user?.names || "",
    lastnames: user?.lastnames || "",
    email: user?.email || "",
    phone: user?.phone || "",
    term1: user?.term1 || false,
    term2: user?.term2 || false,
    term3: user?.term3 || false,
  };
};