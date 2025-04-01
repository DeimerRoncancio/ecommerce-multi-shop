import { create } from "zustand";
import { CartItem } from "../types/cart";

interface State {
  cartItems: CartItem[];
  removeItem: (id: String) => void;
  addItem: (item: CartItem) => void
}

export const useCartItems = create<State>((set, get) => {
  return {
    cartItems: [],

    removeItem: (id: String) => {
      const itemsUpdated = get().cartItems.filter(item => item.id !== id);
      set({ cartItems: [ ...itemsUpdated ] })
    },

    addItem: (item: CartItem) => {
      const items = get().cartItems;
      set({ cartItems: [ ...items, item ] });
    }
  }
})
