import { ProductTypes } from "./product";

export interface CategoriesType {
    id: string;
    name: string;
    products: ProductTypes[]
}

export interface CategoriesFromApiType {
    id: string;
    categoryName: string;
    products: ProductTypes[];
}
