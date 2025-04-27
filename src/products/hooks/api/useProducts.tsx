import { useEffect, useState } from "react";
import { ProductTypes } from "../../types/product";
import { ProductsInitialValues } from "../../helpers/products-initial-values.helper";
import { getProducts } from "../../services/api/products";

export default function useProducts() {
  const [products, setProducts] = useState<ProductTypes[]>(ProductsInitialValues);
  const [loading, setLoading] = useState(false);

  const loadProducts = () => {
    setLoading(true);

    getProducts()
      .then(data => setProducts(data))
      .finally(() => setLoading(false));
  }

  useEffect(() => loadProducts(), []);

  return {
    products,
    loading
  }
}
