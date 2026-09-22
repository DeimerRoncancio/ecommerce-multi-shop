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

// Con sesión, el backend asocia el pedido a la cuenta y guarda la dirección;
// sin sesión, la compra es de invitado. Si la sesión venció (401), sigue como invitado.
export const updateTransactionCustomer = async (
  transactionId: string,
  checkoutAccessToken: string,
  customer: CustomerTransactionRequest,
  authToken?: string,
): Promise<string | null> => {
  const url = `/add-user/${encodeURIComponent(transactionId)}`;
  const checkoutAccess = withCheckoutAccess(checkoutAccessToken);

  if (authToken) {
    const response = await payments.put<string | null>(url, customer, {
      headers: { ...checkoutAccess.headers, Authorization: `Bearer ${authToken}` },
      validateStatus: (status) => status < 400 || status === 401,
    });

    if (response.status !== 401) return response.data;
  }

  const { data } = await payments.put<string | null>(url, customer, checkoutAccess);
  return data;
};

export const getSavedAddresses = async (
  authToken: string,
): Promise<CustomerAddressRequest[]> => {
  const response = await payments.get<CustomerAddressRequest[]>(
    "/saved-addresses",
    {
      headers: { Authorization: `Bearer ${authToken}` },
      validateStatus: () => true,
    },
  ).catch(() => null);

  return response?.status === 200 ? response.data : [];
};
