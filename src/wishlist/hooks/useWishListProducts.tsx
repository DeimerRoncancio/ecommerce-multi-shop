import { useEffect, useState } from "react";
import { mapApiToProducts } from "../../products/mappers/products.mapper";
import { findProduct } from "../../products/services/products.api";
import { ProductTypes } from "../../products/types/product";
import { WishListItemType } from "../types/wishlist";

export default function useWishListProducts(wishList: WishListItemType[]) {
  const [products, setProducts] = useState<ProductTypes[]>([]);
  const ids = wishList.map(item => item.id).join(",");

  useEffect(() => {
    if (!ids || products.length) return;

    let current = true;

    Promise.all(ids.split(",").map(id => findProduct(id).catch(() => null)))
      .then(found => current && setProducts(found.filter(product => product !== null).map(mapApiToProducts)));

    return () => {
      current = false;
    };
  }, [ids]);

  return products;
}
