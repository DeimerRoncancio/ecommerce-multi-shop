import { create } from "zustand";
import { AddressType, CartItemType, OrderType } from "../types/cart";
import { persist } from "zustand/middleware";
import { UserDataForm } from "../zod/routesCart";

type Props = {
  order: OrderType;
  addUser: (user: UserDataForm) => void;
  addProducts: (products: CartItemType[]) => void;
  addAddress: (address: AddressType) => void;
  cleanOrder: () => void;
}

export const useOrderStorage = create<Props>()(persist((set) => ({
  order: {
    items: [],
    user: { names: "", lastnames: "", email: "", phone: "", term1: false, term2: false, term3: false },
    address: { id: 0, name: "", addressLine1: "", addressLine2: "", city: "", state: "", country: "", phone: "" }
  },

  addProducts: (products: CartItemType[]) => set((state) => ({ order: { ...state.order, items: products } })),
  addUser: (user: UserDataForm) => set((state) => ({ order: { ...state.order, user } })),
  addAddress: (address: AddressType) => set((state) => ({ order: { ...state.order, address } })),
  cleanOrder: () => set(() => ({ 
    order: {
      items: [],
      user: { names: "", lastnames: "", email: "", phone: "", term1: false, term2: false, term3: false },
      address: { id: 0, name: "", addressLine1: "", addressLine2: "", city: "", state: "", country: "", phone: "" }
    }
  })),
}), {
  name: 'orders'
}));
