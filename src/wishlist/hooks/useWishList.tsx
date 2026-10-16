import { useEffect, useState } from "react";
import { ProductTypes } from "../../products/types/product";
import { useWishListStorage } from "../storage/useWishListStorage";
import { productToWishList } from "../mappers/wishlist-mapper";
import useCart from "../../cart/hooks/useCart";
import { SnackbarUtilities } from "../../shared/utilities/snackbar-manager";

export default function useWishList() {
  const { wishList, addWishListItem, removeWishListItem } = useWishListStorage();
  const [itemsInCart, setItemInCart] = useState(0);
  const { cartItems, handleAddItem } = useCart();

  const handleAddWishListItem = (product: ProductTypes) => {
    const wishListItem = productToWishList({ product });
    addWishListItem(wishListItem);
    SnackbarUtilities.productAdded("wishlist", product.name, product.images[0]?.imageUrl);
  };

  const handleRemoveWishListItem = (id: string, product?: ProductTypes) => {
    removeWishListItem(id);
    if (product)
      SnackbarUtilities.productRemoved("wishlist", product.name, product.images[0]?.imageUrl, () =>
        addWishListItem({ id }),
      );
  };

  const handleAddToCartSinceWishList = (products: ProductTypes[]) => {
    const itemsToAdd = getItemsToAdd();
    const productsById = new Map(products.map(product => [product.id, product]));

    setItemInCart(itemsToAdd.length);
    const added = itemsToAdd.flatMap(({ id }) => productsById.get(id) ?? []);
    added.forEach(product => handleAddItem(product, 1, false));

    if (added.length === 1) SnackbarUtilities.productAdded("cart", added[0].name, added[0].images[0]?.imageUrl);
    if (added.length > 1) SnackbarUtilities.productAdded("cart", `${added.length} productos de tus favoritos`);
  };

  const getItemsToAdd = () => {
    const cartIds = new Set(cartItems.map(listItem => listItem.id));
    return wishList.filter(({ id }) => !cartIds.has(id));
  };

  const isInWishList = (id: string) => {
    return wishList.some(item => item.id === id);
  };

  useEffect(() => {
    const itemsToAdd = getItemsToAdd();
    setItemInCart(itemsToAdd.length);
  }, [cartItems, wishList]);

  return {
    wishList,
    itemsInCart,
    isInWishList,
    handleAddWishListItem,
    handleRemoveWishListItem,
    handleAddToCartSinceWishList,
  };
}
