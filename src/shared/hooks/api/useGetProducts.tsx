import axios from "axios";
import { useEffect, useState } from "react";
import { ProductTypes } from "../../../products/types/product";
import { InitialValues } from "../../../products/helpers/InitialValues.helper";
import { envs } from "../../config/env.config";

export default function useGetProducts() {
  const [products, setProducts] = useState<ProductTypes[]>(InitialValues);
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
