import { ProductsFromApiType } from "../types/product";
import { CatalogQuery, ProductPage, SearchFacets } from "../types/catalog";
import { products } from "../api/productsApi";

type HomeSection = {
  categoryName: string;
  productCount: number;
  products: ProductsFromApiType[];
};

type Home = {
  sections: HomeSection[];
  top: ProductsFromApiType[];
  budget: ProductsFromApiType[];
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

export const getHome = (): Promise<Home> => {
  return products.get("/home").then(res => res.data);
};

export const searchProducts = (query: string, size = 6): Promise<ProductsFromApiType[]> => {
  return products.get("/search", { params: { query, size } }).then(res => res.data.content);
};

export const searchCatalog = (
  params: CatalogQuery & { sort?: string; page: number; size: number },
): Promise<ProductPage> => {
  return products.get("/search", { params }).then(res => res.data);
};

export const getSearchFacets = (params: CatalogQuery): Promise<SearchFacets> => {
  return products.get("/search/facets", { params }).then(res => res.data);
};

export const getSuggestions = (params: SuggestionsParams): Promise<Suggestions> => {
  return products.get("/suggestions", { params }).then(res => res.data);
};

export const getProduct = (id: string): Promise<ProductsFromApiType> => {
  return products.get(`/${id}`).then(res => res.data);
};

export const getProductsByIds = (ids: string[]): Promise<ProductsFromApiType[]> => {
  return products.get("/by-ids", { params: { ids: ids.join(",") } }).then(res => res.data);
};
