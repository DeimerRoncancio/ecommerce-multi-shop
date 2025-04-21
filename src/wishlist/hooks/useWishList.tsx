import { useEffect } from "react";
import { ProductTypes } from "../../products/types/product";
import { useWishListStorage } from "../storage/useWishListStorage";
import { productToWishList } from "../mappers/wishlist-mapper";

export default function useWishList() {
  const { wishList, addWishListItem, removeWishListItem, setWishListFromStorage } = useWishListStorage();

  const handleAddWishListItem = (product: ProductTypes) => {
    const wishListItem = productToWishList({ product });

    addWishListItem(wishListItem);
  }

  const handleRemoveWishListItem = (id: string) => {
    removeWishListItem(id);
  }

  const loadWishListFromStorage =() => {
    if (!wishList.length) setWishListFromStorage();
  }

  useEffect(() => {
    loadWishListFromStorage();
  }, [])

  return {
    wishList,
    handleAddWishListItem,
    handleRemoveWishListItem,
    loadWishListFromStorage
  }
}
