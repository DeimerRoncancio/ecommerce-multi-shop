import { ProductItemType } from "./product";

export interface CategoriesType {
  id: string;
  name: string;
  productCount: number;
  fromPrice: number | null;
  products: ProductItemType[];
}

export interface CategoriesFromApiType {
  id: string;
  categoryName: string;
  productCount: number;
  fromPrice: number | null;
  products: ProductItemType[];
}
