import type {
  CheckoutCustomerResponse,
  CustomerTransactionRequest,
} from "../api/paymentsApi";
import type { AddressType, CheckoutUserData } from "../types/cart";

export const checkoutCustomerAddressesToAddresses = (
  addresses: CheckoutCustomerResponse["addresses"],
): AddressType[] =>
  addresses.map((address, index) => ({
    id: `${address.addressName}-${index}`,
    name: address.addressName,
    addressLine1: address.address,
    addressLine2: "",
    city: address.city,
    state: address.state,
    country: address.country,
    phone: address.addressNumber,
  }));

export const checkoutToCustomerTransaction = (
  user: CheckoutUserData,
  address: AddressType,
): CustomerTransactionRequest => ({
  userNames: user.names + " " + user.lastnames,
  userEmail: user.email,
  userPhone: user.phone,
  userAddress: {
    addressName: address.name,
    address: address.addressLine1,
    city: address.city,
    state: address.state,
    country: address.country,
    addressNumber: address.phone,
  },
});
