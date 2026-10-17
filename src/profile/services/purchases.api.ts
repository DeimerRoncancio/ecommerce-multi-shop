import { createInstance } from "../../shared/api/axios-factory";
import { envs } from "../../shared/config/env.config";
import { Purchase } from "../types/purchase";

const payments = createInstance(`${envs.API}/app/payments`);
const guests = createInstance(`${envs.API}/app/guests`);

export const getUserPurchases = (token: string) =>
  payments.get<Purchase[]>("/purchases", { headers: { Authorization: `Bearer ${token}` } }).then(res => res.data);

export const getGuestPurchases = (email: string) =>
  guests.get<Purchase[]>("/purchases", { params: { email } }).then(res => res.data);
