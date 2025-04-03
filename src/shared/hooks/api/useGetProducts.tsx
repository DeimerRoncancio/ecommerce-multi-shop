import axios from "axios";
import { useEffect, useState } from "react";
import { ProductTypes } from "../../../products/types/product";
import { ProductsInitialValues } from "../../../products/helpers/products-initial-values.helper";
import { envs } from "../../config/env.config";

export default function useGetProducts() {
  const [products, setProducts] = useState<ProductTypes[]>(ProductsInitialValues);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    axios.get(`${envs.API}/app/products`)
      .then(res => setProducts(res.data));
    setLoading(false);
  }, [])

  return {
    products,
    loading
  }
}
