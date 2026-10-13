import { CategoriesFromApiType, CategoriesType } from "../types/categories"

export const mapApiToCategories = (apiResponse: CategoriesFromApiType): CategoriesType => {
  return {
    id: apiResponse.id,
    name: apiResponse.categoryName,
    productCount: apiResponse.productCount,
    fromPrice: apiResponse.fromPrice,
    products: apiResponse.products
  }
}
