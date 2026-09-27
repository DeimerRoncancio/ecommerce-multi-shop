import { ProductsFromApiType } from "../types/product"
import { products } from "../api/productsApi"

export const getProducts = (size = 60): Promise<ProductsFromApiType[]> => {
  return products.get('', { params: { size } }).then(res => res.data.content);
}

export const getProduct = (id: string): Promise<ProductsFromApiType> => {
  return products.get(`/${id}`).then(res => {
    console.log(res.data.variants[0]);
    return res.data
  });
}
