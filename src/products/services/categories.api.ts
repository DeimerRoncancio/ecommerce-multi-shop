import { CategoriesFromApiType } from "../types/categories";
import { categories } from "../api/categories.axios";

export const getCategories = (): Promise<CategoriesFromApiType[]> => {
  return categories.get('').then(res => res.data);
}
