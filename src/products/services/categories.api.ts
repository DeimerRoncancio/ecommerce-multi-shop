import { CategoriesFromApiType } from "../types/categories";
import { categories } from "../api/categoriesApi";

export const getCategories = (size = 100): Promise<CategoriesFromApiType[]> => {
  return categories.get('', { params: { size } }).then(res => res.data.content);
}
