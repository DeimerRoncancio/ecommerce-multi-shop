import { createInstance } from "../../shared/api/axios-factory";
import { envs } from "../../shared/config/env.config";
import { StripeItemType, StripeSessionResponseType } from "../types/cart";

export const payments = createInstance(`${envs.API}/app/payments`);

export const PAYMENT_CURRENCY = "COP";

export const createPaymentSession = async (
  items: StripeItemType[],
  currency: string = PAYMENT_CURRENCY
): Promise<StripeSessionResponseType> => {
  const { data } = await payments.post<StripeSessionResponseType>("/create-payment-session", {
    currency,
    items
  });

  return data;
}
