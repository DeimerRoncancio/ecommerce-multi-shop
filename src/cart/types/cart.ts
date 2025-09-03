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

export interface OrderType {
  items: CartItemType[];
  user: UserData;
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

export interface StepType {
  name: string;
  isComplete: boolean;
  path: string;
  icon: IconName;
  isActive?: boolean;
}
