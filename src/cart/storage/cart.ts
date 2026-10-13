import { create } from "zustand";
import { CartItemType } from "../types/cart";
import { persist } from "zustand/middleware";

interface State {
  cartItems: CartItemType[];
  addItem: (productItem: CartItemType) => void;
  addItems: (productItem: CartItemType) => void;
  removeItem: (productItem: CartItemType) => void;
  clearCart: () => void;
}

export const useCartStore = create<State>()(persist((set, get) => {
  return {
    cartItems: [],

    addItem: (productItem: CartItemType) => {
      const items = get().cartItems;
      const cartItemIndex = items.findIndex(item => item.id === productItem.id);

      if (cartItemIndex >= 0) {
        const newItems = [
          ...items.slice(0, cartItemIndex),
          { ...items[cartItemIndex], quantity: items[cartItemIndex].quantity + 1 },
          ...items.slice(cartItemIndex + 1)
        ]

        set({ cartItems: newItems });
        return;
      }

      set({ cartItems: [ ...items, productItem ] });
    },

    addItems: (productItem: CartItemType) => {
      const items = get().cartItems;

      const newItems = items.map(item =>
        item.id === productItem.id ? productItem : item
      );

      set({ cartItems: newItems });
      return;
    },

    removeItem: (productItem: CartItemType) => {
      const items = get().cartItems;
      const cartItemIndex = items.findIndex(item => item.id === productItem.id);

      if (productItem && productItem.quantity > 1) {
        const newItems = [
          ...items.slice(0, cartItemIndex),
          { ...productItem, quantity: productItem.quantity - 1 },
          ...items.slice(cartItemIndex + 1)
        ]
        
        set({ cartItems: [ ...newItems ] });
        return;
      }

      const itemsUpdated = items.filter(item => item.id !== productItem.id);
      
      set({ cartItems: [ ...itemsUpdated ] })
    },

    clearCart: () => {
      set({ cartItems: [] })
    }
  }
}, {
  name: 'cartItems',
  skipHydration: true,
}));
