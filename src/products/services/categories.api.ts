import { CategoriesFromApiType } from "../types/categories";
import { categories } from "../api/categoriesApi";

export const getCategories = (): Promise<CategoriesFromApiType[]> => {
  return categories.get('').then(res => res.data);
}
