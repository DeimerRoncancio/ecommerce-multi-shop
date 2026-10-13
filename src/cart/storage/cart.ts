import { create } from "zustand";
import { CartItemType } from "../types/cart";
import { persist } from "zustand/middleware";

interface State {
  cartItems: CartItemType[];
  addItem: (productItem: CartItemType) => void;
  setItemQuantity: (productItem: CartItemType) => void;
  decreaseItem: (id: string) => void;
  removeItem: (id: string) => void;
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

    setItemQuantity: (productItem: CartItemType) => {
      const items = get().cartItems;

      const newItems = items.map(item =>
        item.id === productItem.id ? productItem : item
      );

      set({ cartItems: newItems });
      return;
    },

    decreaseItem: (id: string) => {
      const items = get().cartItems
        .map(item => (item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
        .filter(item => item.quantity > 0);

      set({ cartItems: items });
    },

    removeItem: (id: string) => {
      set({ cartItems: get().cartItems.filter(item => item.id !== id) });
    },

    clearCart: () => {
      set({ cartItems: [] })
    }
  }
}, {
  name: 'cartItems',
  skipHydration: true,
}));
