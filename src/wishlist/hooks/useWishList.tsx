import { useEffect, useState } from "react";
import { ProductTypes } from "../../products/types/product";
import { useWishListStorage } from "../storage/useWishListStorage";
import { productToWishList } from "../mappers/wishlist-mapper";
import useCart from "../../cart/hooks/useCart";

export default function useWishList() {
  const { wishList, addWishListItem, removeWishListItem } = useWishListStorage();
  const [ itemsInCart, setItemInCart ] = useState(0);
  const { cartItems, handleAddItem } = useCart();

  const handleAddWishListItem = (product: ProductTypes) => {
    const wishListItem = productToWishList({ product });
    addWishListItem(wishListItem);
  }

  const handleRemoveWishListItem = (id: string) => {
    removeWishListItem(id);
  }
  
  const handleAddToCartSinceWishList = (products: ProductTypes[]) => {
    const itemsToAdd = getItemsToAdd();
    const productsById = new Map(products.map(product => [product.id, product]));
    
    setItemInCart(itemsToAdd.length);
    itemsToAdd.forEach(({ id }) => {
      const product = productsById.get(id);
      product && handleAddItem(product);
    })
  }

  const getItemsToAdd = () => {
    const cartIds = new Set(cartItems.map(listItem => listItem.id));
    return wishList.filter(({ id }) => !cartIds.has(id));
  }

  useEffect(()=>{
    const itemsToAdd = getItemsToAdd();
    setItemInCart(itemsToAdd.length);
  }, [cartItems])

  return {
    wishList,
    itemsInCart,
    handleAddWishListItem,
    handleRemoveWishListItem,
    handleAddToCartSinceWishList,
  }
}
