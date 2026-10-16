import { create } from "zustand";
import { WishListItemType } from "../types/wishlist";
import { persist } from "zustand/middleware";

interface State {
  wishList: WishListItemType[];
  addWishListItem: (wishListItem: WishListItemType) => void;
  removeWishListItem: (id: string) => void;
  replaceWishList: (wishList: WishListItemType[]) => void;
}

export const useWishListStorage = create<State>()(
  persist(
    (set, get) => {
      return {
        wishList: [],

        addWishListItem: (wishListItem: WishListItemType) => {
          const wishListItems = get().wishList;

          set({ wishList: [...wishListItems, wishListItem] });
        },

        removeWishListItem: (id: string) => {
          const wishListItems = get().wishList;
          const newWishList = wishListItems.filter(item => item.id !== id);
          set({ wishList: [...newWishList] });
        },

        replaceWishList: (wishList: WishListItemType[]) => set({ wishList }),
      };
    },
    {
      name: "wishListItems",
      version: 1,
      migrate: persisted => {
        const { wishList = [] } = persisted as { wishList?: WishListItemType[] };
        return { wishList: wishList.map(({ id }) => ({ id })) } as State;
      },
      skipHydration: true,
    },
  ),
);
