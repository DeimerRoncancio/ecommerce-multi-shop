import axios from "axios";
import { useEffect, useState } from "react";
import { ProductTypes } from "../../../products/types/product";
import { ProductsInitialValues } from "../../../products/helpers/products-initial-values.helper";
import { envs } from "../../config/env.config";

export default function useProducts() {
  const [products, setProducts] = useState<ProductTypes[]>(ProductsInitialValues);
  const [loading, setLoading] = useState(false);

  const loadProducts = () => {
    setLoading(true);

    axios.get(`${envs.API}/app/products`)
      .then(res => setProducts(res.data))
      .finally(() => setLoading(false));
  }

  useEffect(() => loadProducts(), []);

  return {
    products,
    loading
  }
}
