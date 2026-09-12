import { createInstance } from "../../shared/api/axios-factory";
import { envs } from "../../shared/config/env.config";
import { StripeItemType, StripeSessionResponseType } from "../types/cart";

export interface CustomerAddressRequest {
  addressName: string;
  address: string;
  city: string;
  state: string;
  country: string;
  addressNumber: string;
}

export interface CustomerTransactionRequest {
  userNames: string;
  userEmail: string;
  userPhone: string;
  userAddress: CustomerAddressRequest;
}

export interface CheckoutCustomerResponse {
  userNames: string;
  userEmail: string;
  userPhone: string;
  addresses: CustomerAddressRequest[];
}

export const payments = createInstance(`${envs.API}/app/payments`);

export const PAYMENT_CURRENCY = "COP";

export const createPaymentSession = async (
  transactionId: string,
  items: StripeItemType[],
  currency: string = PAYMENT_CURRENCY,
): Promise<StripeSessionResponseType> => {
  const { data } = await payments.post<StripeSessionResponseType>(
    `/create-payment-session/${transactionId}`,
    {
      currency,
      items,
    },
  );

  return data;
};

export const updateTransactionCustomer = async (
  transactionId: string,
  customer: CustomerTransactionRequest,
): Promise<string | null> => {
  const { data } = await payments.put<string | null>(
    `/add-user/${transactionId}`,
    customer,
  );

  return data;
};

export const getCheckoutCustomer = async (
  transactionId: string,
  email: string,
): Promise<CheckoutCustomerResponse | null> => {
  const response = await payments.get<CheckoutCustomerResponse>(
    `/customer/${encodeURIComponent(transactionId)}/${encodeURIComponent(email)}`,
    { validateStatus: (status) => status === 200 || status === 404 },
  );

  return response.status === 200 ? response.data : null;
};
