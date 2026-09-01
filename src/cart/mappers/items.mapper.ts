import { ProductTypes } from "../../products/types/product";
import { CartItemType, StripeItemType } from "../types/cart";

type ProductToCartProps = {
  product: ProductTypes,
  quantity: number,
  isExists: boolean
}

export const productToCart = ({ product, quantity, isExists }: ProductToCartProps): CartItemType => {
  return {
    id: product.id,
    productName: product.name,
    productDescription: product.description,
    productImage: product.images[0].imageUrl,
    isExists: isExists,
    productPrice: product.price,
    quantity: quantity,
    variants: product.variants
  }
}

// El backend valida description con @NotBlank, por eso se usa el nombre
// como respaldo cuando el producto no trae descripción.
export const cartItemToStripeItem = (item: CartItemType): StripeItemType => {
  return {
    name: item.productName,
    description: item.productDescription?.trim() || item.productName,
    price: Math.round(item.productPrice * 100),
    quantity: item.quantity
  }
}
