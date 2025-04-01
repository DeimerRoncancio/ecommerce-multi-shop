import { create } from "zustand";
import { CartItemType } from "../types/cart";
import { ProductTypes } from "../../products/types/product";

interface State {
  cartItems: CartItemType[];
  setItemsFromStorage: () => void;
  addItem: (item: ProductTypes) => void;
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

    addItem: (product: ProductTypes) => {
      const items = get().cartItems;

      const productItem = {
        id: product.id,
        productName: product.productName,
        productDescription: product.description,
        productImage: product.productImages[0].imageUrl,
        isExists: true,
        productPrice: product.price
      }

      localStorage.setItem("cartItems", JSON.stringify([ ...items, productItem ]));

      set({ cartItems: [ ...items, productItem ] });
    },

    removeItem: (id: String) => {
      const itemsUpdated = get().cartItems.filter(item => item.id !== id);
      
      localStorage.removeItem("cartItems");
      localStorage.setItem("cartItems", JSON.stringify([ ...itemsUpdated ]));
      
      set({ cartItems: [ ...itemsUpdated ] })
    },

  }
})
