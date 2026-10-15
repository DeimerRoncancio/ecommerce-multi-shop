import { ProductsFromApiType } from "./product";

export type ProductPage = {
  content: ProductsFromApiType[];
  totalElements: number;
  totalPages: number;
  number: number;
};

export type CategoryCount = {
  categoryName: string;
  productCount: number;
};

export type SearchFacets = {
  minPrice: number | null;
  maxPrice: number | null;
  categories: CategoryCount[];
};

export type CatalogQuery = {
  query?: string;
  categories?: string;
  minPrice?: number;
  maxPrice?: number;
};

export type CatalogFilters = {
  text: string;
  categories: string[];
  min: number | null;
  max: number | null;
  sort: string;
  page: number;
};
