import { useEffect, useState } from "react";
import { ProductTypes } from "../../types/product";
import { ProductsInitialValues } from "../../constants/products-initial-values.helper";
import { getProducts } from "../../services/products.api";
import { mapApiToProducts } from "../../mappers/products.maper";

export default function useProducts() {
  const [products, setProducts] = useState<ProductTypes[]>(ProductsInitialValues);
  const [loading, setLoading] = useState(false);

  const loadProducts = () => {
    setLoading(true);

    getProducts()
      .then(res => res.map(mapApiToProducts))
      .then(setProducts)
      .finally(() => setLoading(false));
  }

  useEffect(() => loadProducts(), []);

  return {
    products,
    loading
  }
}
