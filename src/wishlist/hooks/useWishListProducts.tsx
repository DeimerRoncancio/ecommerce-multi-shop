import { useEffect, useState } from "react";
import { mapApiToProducts } from "../../products/mappers/products.mapper";
import { getProductsByIds } from "../../products/services/products.api";
import { ProductTypes } from "../../products/types/product";
import { WishListItemType } from "../types/wishlist";

export default function useWishListProducts(wishList: WishListItemType[]) {
  const [products, setProducts] = useState<ProductTypes[]>([]);
  const [loaded, setLoaded] = useState(false);
  const ids = wishList.map(item => item.id).join(",");

  useEffect(() => {
    if (!ids || products.length) return;

    let current = true;

    getProductsByIds(ids.split(","))
      .catch(() => [])
      .then(found => {
        if (!current) return;
        setProducts(found.map(mapApiToProducts));
        setLoaded(true);
      });

    return () => {
      current = false;
    };
  }, [ids]);

  return { products, loaded };
}
