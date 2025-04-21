import { useEffect } from "react";
import { ProductTypes } from "../../products/types/product";
import { useWishListStorage } from "../storage/useWishListStorage";

export default function useWishList() {
  const { wishList, addWishListItem, removeWishListItem, setWishListFromStorage } = useWishListStorage();

  const handleAddWishListItem = (product: ProductTypes) => {
    const wishListItem = {
      id: product.id,
      productImage: product.productImages[0].imageUrl,
      productName: product.productName,
      productPrice: product.price
    }

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
