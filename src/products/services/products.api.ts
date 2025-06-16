import { ProductsFromApiType } from "../types/product"
import { products } from "../api/productsApi"

export const getProducts = (): Promise<ProductsFromApiType[]> => {
  return products.get('awd').then(res => res.data);
}
