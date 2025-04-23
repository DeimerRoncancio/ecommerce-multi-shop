import { create } from "zustand"
import { WishListItemType } from "../types/wishlist";
import { persist } from "zustand/middleware";

interface State {
  wishList: WishListItemType[];
  addWishListItem: (wishListItem: WishListItemType) => void;
  removeWishListItem: (id: string) => void;
}

export const useWishListStorage = create<State>()(persist((set, get) => {
  return {
    wishList: [],

    addWishListItem: (wishListItem: WishListItemType) => {
      const wishListItems = get().wishList;
      
      localStorage.setItem("wishListItems", JSON.stringify([...wishListItems, wishListItem]));
      set({ wishList: [...wishListItems, wishListItem] });
    },

    removeWishListItem: (id: string) => {
      const wishListItems = get().wishList;
      const newWishList = wishListItems.filter(item => item.id !== id);
      localStorage.setItem("wishListItems", JSON.stringify([ ...newWishList ]));
      set({ wishList: [ ...newWishList ] });
    },
  }
}, {
  name: 'wishListItems'
}))
