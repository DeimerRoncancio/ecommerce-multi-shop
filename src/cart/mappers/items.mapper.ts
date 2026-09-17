import { ProductTypes } from "../../products/types/product";
import { CartItemType } from "../types/cart";

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

// El endpoint /update-products recibe List<ProductItemDTO> y /create-transaction lo
// envuelve en NewTransactionDTO.productItems; en ambos casos el objeto es el mismo.
// Sin precio: el servidor lo toma del catalogo (Product.price).
export const cartItemToProductItem = (item: CartItemType) => {
  return {
    id: item.id,
    quantity: item.quantity
  }
}
