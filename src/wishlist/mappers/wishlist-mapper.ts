import { ProductTypes } from "../../products/types/product"
import { WishListItemType } from "../types/wishlist";

type ProductToWishListProps = {
  product: ProductTypes
}

export const productToWishList = ({ product }: ProductToWishListProps): WishListItemType => {
  return {
    id: product.id,
    productImage: product.productImages[0].imageUrl,
    productName: product.productName,
    productPrice: product.price
  }
}
