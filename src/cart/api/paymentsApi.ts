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

export const getCheckoutAccessToken = (): string | null =>
  sessionStorage.getItem(CHECKOUT_ACCESS_TOKEN_STORAGE_KEY);

const withCheckoutAccess = (checkoutAccessToken: string) => ({
  headers: { "X-Checkout-Access-Token": checkoutAccessToken },
});

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
    withCheckoutAccess(checkoutAccessToken),
  );

  return data;
};

export const updateTransactionProducts = async (
  transactionId: string,
  checkoutAccessToken: string,
  productItems: Array<{ id: string; quantity: number }>,
): Promise<void> => {
  await payments.put(
    `/update-products/${encodeURIComponent(transactionId)}`,
    productItems,
    withCheckoutAccess(checkoutAccessToken),
  );
};

export const deleteTransaction = async (
  transactionId: string,
  checkoutAccessToken: string,
): Promise<void> => {
  await payments.delete(`/${encodeURIComponent(transactionId)}`, {
    ...withCheckoutAccess(checkoutAccessToken),
    validateStatus: (status) => status < 500,
  });
};

export const createPaymentSession = async (
  transactionId: string,
  checkoutAccessToken: string,
): Promise<StripeSessionResponseType> => {
  const { data } = await payments.post<StripeSessionResponseType>(
    `/create-payment-session/${encodeURIComponent(transactionId)}`,
    undefined,
    withCheckoutAccess(checkoutAccessToken),
  );

  return data;
};

export const cancelPaymentSession = async (
  transactionId: string,
  checkoutAccessToken: string,
): Promise<void> => {
  await payments.post(
    `/cancel-payment-session/${encodeURIComponent(transactionId)}`,
    undefined,
    withCheckoutAccess(checkoutAccessToken),
  );
};

export const updateTransactionCustomer = async (
  transactionId: string,
  checkoutAccessToken: string,
  customer: CustomerTransactionRequest,
): Promise<string | null> => {
  const { data } = await payments.put<string | null>(
    `/add-user/${encodeURIComponent(transactionId)}`,
    customer,
    withCheckoutAccess(checkoutAccessToken),
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
