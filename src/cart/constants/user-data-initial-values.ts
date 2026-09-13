import { UserTypes } from "../../profile/types/user";
import { UserDataForm } from "../zod/routesCart";

export const UserDataInitialValues = (
  orderUser: UserDataForm,
  user?: UserTypes,
): UserDataForm => {
  return {
    names: user?.name || orderUser.names || "",
    lastnames: user?.lastnames || orderUser.lastnames || "",
    email: user?.email || orderUser.email || "",
    phone: user?.phoneNumber ? String(user.phoneNumber) : orderUser.phone || "",
    term1: false,
    term2: false,
    term3: false,
  };
};
