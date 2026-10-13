import { ProductsFromApiType } from "../types/product"
import { products } from "../api/productsApi"

type ProductsPage = {
  content: ProductsFromApiType[];
  totalElements: number;
};

type Suggestions = {
  products: ProductsFromApiType[];
  filled: boolean;
};

type SuggestionsParams = {
  categories: string;
  exclude: string;
  size: number;
  min?: number;
  sort?: string;
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

export const getSuggestions = (params: SuggestionsParams): Promise<Suggestions> => {
  return products.get('/suggestions', { params }).then(res => res.data);
}

export const getProduct = (id: string): Promise<ProductsFromApiType> => {
  return products.get(`/${id}`).then(res => res.data);
}

export const findProduct = (id: string): Promise<ProductsFromApiType | null> => {
  return products
    .get(`/${id}`, { validateStatus: status => status === 200 || status === 404 })
    .then(res => (res.status === 200 ? res.data : null));
}
