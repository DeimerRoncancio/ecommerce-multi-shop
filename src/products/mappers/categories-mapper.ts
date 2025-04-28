import { CategoriesFromApiType, CategoriesType } from "../types/categories"

export const mapApiToCategories = (apiResponse: CategoriesFromApiType): CategoriesType => {
  return {
    id: apiResponse.id,
    name: apiResponse.categoryName,
    products: apiResponse.products
  }
}