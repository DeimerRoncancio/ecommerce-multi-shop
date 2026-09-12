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

export const cartItemToStripeItem = (item: CartItemType): StripeItemType => {
  return {
    name: item.productName,
    description: item.productDescription?.trim() || item.productName,
    price: Math.round(item.productPrice * 100),
    quantity: item.quantity
  }
}

// El endpoint /update-products recibe List<ProductItemDTO> y /create-transaction lo
// envuelve en NewTransactionDTO.productItems; en ambos casos el objeto es el mismo.
export const cartItemToProductItem = (item: CartItemType) => {
  return {
    id: item.id,
    price: item.productPrice,
    quantity: item.quantity
  }
}
