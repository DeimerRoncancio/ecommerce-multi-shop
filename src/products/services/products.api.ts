import { ProductsFromApiType } from "../types/product"
import { products } from "../api/productsApi"

type ProductsPage = {
  content: ProductsFromApiType[];
  totalElements: number;
};

export const getProducts = (size = 60, sort?: string): Promise<ProductsFromApiType[]> => {
  return products.get('', { params: { size, sort } }).then(res => res.data.content);
}

export const getCategoryProducts = (categories: string, size: number): Promise<ProductsPage> => {
  const params = { categories, sort: 'productName,asc', size };
  return products.get('/search', { params }).then(res => res.data);
}

export const searchProducts = (query: string, size = 6): Promise<ProductsFromApiType[]> => {
  return products.get('/search', { params: { query, size } }).then(res => res.data.content);
}

export const getSuggestedProducts = (categories: string, size: number): Promise<ProductsFromApiType[]> => {
  const params = { categories: categories || undefined, sort: 'price,desc', size };
  return products.get('/search', { params }).then(res => res.data.content);
}

export const getProduct = (id: string): Promise<ProductsFromApiType> => {
  return products.get(`/${id}`).then(res => {
    console.log(res.data.variants[0]);
    return res.data
  });
}
