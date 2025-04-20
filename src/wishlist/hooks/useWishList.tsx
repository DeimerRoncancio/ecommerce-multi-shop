import { useEffect, useState } from "react";
import { WishListItemType } from "../types/wishlist";
import { ProductTypes } from "../../products/types/product";

export default function useWishList() {
  const [wishListItems, setWishListItems] = useState<Array<WishListItemType>>([]);

  const addWishListItem = (product: ProductTypes) => {
    const wishListItem = {
      id: product.id,
      productImage: product.productImages[0].imageUrl,
      productName: product.productName,
      productPrice: product.price
    }

    localStorage.setItem("wishListItems", JSON.stringify([...wishListItems, wishListItem]));
    setWishListItems([ ...wishListItems, wishListItem ]);
  }

  const removeWishListItem = (id: string) => {
    const newWishList = wishListItems.filter(item => item.id != id);
    localStorage.setItem("wishListItems", JSON.stringify(newWishList));
    setWishListItems(newWishList);
  }

  const loadWishListFromStorage =() => {
    const wishListString = localStorage.getItem("wishListItems");
    const wishList: WishListItemType[] = wishListString ? JSON.parse(wishListString) : []
    setWishListItems(wishList);
  }

  useEffect(() => {
    loadWishListFromStorage();
  }, [])
  
  return {
    wishListItems,
    addWishListItem,
    removeWishListItem,
    loadWishListFromStorage
  }
}
