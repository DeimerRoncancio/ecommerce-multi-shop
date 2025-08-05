import { ProductItemType, ProductTypes } from "./product";

export interface CategoriesType {
    id: string;
    name: string;
    products: ProductItemType[]
}

export interface CategoriesFromApiType {
    id: string;
    categoryName: string;
    products: ProductTypes[];
}
