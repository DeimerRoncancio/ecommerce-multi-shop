import { createInstance } from "../../shared/api/axios-factory";
import { envs } from "../../shared/config/env.config";
import { StripeSessionResponseType } from "../types/cart";

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

export interface TransactionAccessResponse {
  transactionId: string;
  checkoutAccessToken: string;
}

export interface CheckoutSummaryResponse {
  transactionId: string;
  status: string;
  totalPrice: number;
  customer: {
    userNames: string;
    userEmail: string;
    userPhone: string | null;
  } | null;
  addresses: CustomerAddressRequest[];
  selectedAddress: CustomerAddressRequest | null;
  items: Array<{
    id: string;
    productName: string;
    price: number;
    quantity: number;
  }>;
}

export const payments = createInstance(`${envs.API}/app/payments`);

export const CHECKOUT_ACCESS_TOKEN_STORAGE_KEY = "checkoutAccessToken";

export const createTransaction = async (
  productItems: Array<{ id: string; quantity: number }>,
): Promise<TransactionAccessResponse> => {
  const { data } = await payments.post<TransactionAccessResponse>(
    "/create-transaction",
    { productItems, status: "pending" },
  );

  return data;
};

export const getCheckoutSummary = async (
  transactionId: string,
  checkoutAccessToken: string,
): Promise<CheckoutSummaryResponse> => {
  const { data } = await payments.get<CheckoutSummaryResponse>(
    `/checkout/${encodeURIComponent(transactionId)}`,
    { headers: { "X-Checkout-Access-Token": checkoutAccessToken } },
  );

  return data;
};

// Sin productos ni precios: el servidor cobra lo guardado en la transacción.
export const createPaymentSession = async (
  transactionId: string,
): Promise<StripeSessionResponseType> => {
  const { data } = await payments.post<StripeSessionResponseType>(
    `/create-payment-session/${transactionId}`,
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
