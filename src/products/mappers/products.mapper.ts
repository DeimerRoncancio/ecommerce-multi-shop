import { sortImages } from "../../shared/utilities/image-order";
import { ProductsFromApiType, ProductTypes } from "../types/product";

export const mapApiToProducts = (product: ProductsFromApiType): ProductTypes => {
  return {
    id: product.id,
    name: product.productName,
    description: product.description,
    price: product.price,
    images: sortImages(product.productImages),
    categories: product.categories,
    variants: product.variants
  }
}
