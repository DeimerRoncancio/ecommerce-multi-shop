import { create } from "zustand";
import { CartItemType } from "../types/cart";

interface State {
  cartItems: CartItemType[];
  setItemsFromStorage: () => void;
  addItem: (productItem: CartItemType) => void;
  removeItem: (id: String) => void;
}

export const useCartItems = create<State>((set, get) => {
  return {
    cartItems: [],

    setItemsFromStorage: () => {
      const cartItemsString = localStorage.getItem("cartItems");
      const cartItems: CartItemType[] = cartItemsString ? JSON.parse(cartItemsString) : [];
      set({ cartItems });
    },

    addItem: (productItem: CartItemType) => {
      const items = get().cartItems;
      const cartItemIndex = items.findIndex(item => item.id === productItem.id);

      if (cartItemIndex >= 0) {
        const newItems = [
          ...items.slice(0, cartItemIndex),
          { ...items[cartItemIndex], quantity: Number(items[cartItemIndex].quantity) + 1 },
          ...items.slice(cartItemIndex + 1)
        ]

        localStorage.setItem("cartItems", JSON.stringify(newItems));
        set({ cartItems: newItems });
        return;
      }

      localStorage.setItem("cartItems", JSON.stringify([ ...items, productItem ]));
      set({ cartItems: [ ...items, productItem ] });
    },

    removeItem: (id: String) => {
      const items = get().cartItems;
      const itemsUpdated = items.filter(item => item.id !== id);
      const cartItemIndex = items.findIndex(item => item.id === id);
      const cartItem = items[cartItemIndex];

      if (cartItem && Number(cartItem.quantity) > 1) {
        const newItems = [
          ...items.slice(0, cartItemIndex),
          { ...cartItem, quantity: Number(cartItem.quantity) - 1 },
          ...items.slice(cartItemIndex + 1)
        ]

        localStorage.setItem("cartItems", JSON.stringify([ ...newItems ]))
        set({ cartItems: [ ...newItems ] });
        return;
      }
      
      localStorage.setItem("cartItems", JSON.stringify([ ...itemsUpdated ]));
      set({ cartItems: [ ...itemsUpdated ] })
    },
  }
})
