import { create } from "zustand";
import { CartItemType, OrderType } from "../types/cart";
import { persist } from "zustand/middleware";
import { UserDataForm } from "../zod/routesCart";

type Props = {
  order: OrderType;
  addUser: (user: UserDataForm) => void;
  addProducts: (products: CartItemType[]) => void;
  cleanOrder: () => void;
}

export const useOrderStorage = create<Props>()(persist((set) => ({
  order: {
    items: [] as CartItemType[],
    user: { names: "", lastnames: "", email: "", phone: "", term1: false, term2: false, term3: false },
  },

  addProducts: (products: CartItemType[]) => set((state) => ({ order: { ...state.order, items: products } })),
  addUser: (user: UserDataForm) => set((state) => ({ order: { ...state.order, user } })),
  cleanOrder: () => set(() => ({ 
    order: {
      items: [],
      user: { names: "", lastnames: "", email: "", phone: "", term1: false, term2: false, term3: false }
    }
  })),
}), {
  name: 'orders'
}));
