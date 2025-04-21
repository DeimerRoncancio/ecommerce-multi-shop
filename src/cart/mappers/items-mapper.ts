import { ProductTypes } from "../../products/types/product";
import { CartItemType } from "../types/cart";

type ProductToCartProps = {
  product: ProductTypes,
  quantity: number,
  isExists: boolean
}

export const productToCar = ({ product, quantity, isExists }: ProductToCartProps): CartItemType => {
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
