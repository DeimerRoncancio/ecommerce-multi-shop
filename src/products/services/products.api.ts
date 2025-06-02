import { ProductsFromApiType } from "../types/product"
import { products } from "../api/products.axios"

export const getProducts = (): Promise<ProductsFromApiType[]> => {
  return products.get('').then(res => res.data);
}
