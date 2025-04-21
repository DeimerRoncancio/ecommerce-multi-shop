import { create } from "zustand"
import { WishListItemType } from "../types/wishlist";

interface State {
  wishList: WishListItemType[];
  addWishListItem: (wishListItem: WishListItemType) => void;
  removeWishListItem: (id: string) => void;
  setWishListFromStorage: () => void;
}

export const useWishListStorage = create<State>((set, get) => {
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

    setWishListFromStorage: () => {
      const wishListString = localStorage.getItem("wishListItems");
      const wishList: WishListItemType[] = wishListString ? JSON.parse(wishListString) : []
      set({ wishList });
    }
  }
})
