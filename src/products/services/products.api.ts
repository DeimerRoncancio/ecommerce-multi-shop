import { ProductsFromApiType } from "../types/product"
import { products } from "../api/productsApi"

export const getProducts = (): Promise<ProductsFromApiType[]> => {
  return products.get('').then(res => res.data.content);
}

export const getProduct = (id: string): Promise<ProductsFromApiType> => {
  return products.get(`/${id}`).then(res => res.data);
}
