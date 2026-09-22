import { ProductVariantType } from "../../products/types/product";
import { IconName } from "../../shared/types/icon-list";

export interface CartItemType {
  id: string;
  productName: string;
  productDescription: string;
  productPrice: number;
  isExists: boolean;
  productImage: string;
  quantity: number;
  variants?: ProductVariantType[];
}

export interface UserData {
  names: string;
  lastnames: string;
  email: string;
  phone: string;
  term1: boolean;
  term2: boolean;
  term3?: boolean | undefined;
}

export type CheckoutUserData = Pick<
  UserData,
  "names" | "lastnames" | "email" | "phone"
>;

export interface StepType {
  name: string;
  isComplete: boolean;
  path: string;
  icon: IconName;
}

export interface AddressType {
  id: string | number;
  name: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  country: string;
  phone: string;
}

export interface PaymentMethodType {
  id: string;
  name: string;
  description: string;
}

export interface StripeSessionResponseType {
  status: string;
  message: string;
  sessionId: string;
  sessionUrl: string;
}
