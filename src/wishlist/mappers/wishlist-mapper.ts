import { ProductTypes } from "../../products/types/product"
import { WishListItemType } from "../types/wishlist";

type ProductToWishListProps = {
  product: ProductTypes
}

export const productToWishList = ({ product }: ProductToWishListProps): WishListItemType => {
  return {
    id: product.id,
    productImage: product.images[0].imageUrl,
    productName: product.name,
    productPrice: product.price
  }
}
