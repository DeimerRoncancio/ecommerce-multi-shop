import { ProductsFromApi, ProductTypes } from "../types/product";

export const mapApiToProducts = (product: ProductsFromApi): ProductTypes => {
    return {
        id: product.id,
        name: product.productName,
        description: product.description,
        price: product.price,
        images: product.productImages,
        categories: product.categories
    }
}