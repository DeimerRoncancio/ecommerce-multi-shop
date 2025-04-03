import { ProductTypes } from "../../products/types/product";
import { CartItemType } from "../types/cart";

type productToCartProps = {
  product: ProductTypes,
  quantity: Number,
  isExists: Boolean
}

export const productToCar = ({ product, quantity, isExists }: productToCartProps): CartItemType => {
  return {
    id: product.id,
    productName: product.productName,
    productDescription: product.description,
    productImage: product.productImages[0].imageUrl,
    isExists: isExists,
    productPrice: product.price,
    quantity: quantity
  }
}
