import { ProductTypes } from "../../products/types/product";
import { CartItemType } from "../types/cart";

type ProductToCartProps = {
  product: ProductTypes;
  quantity: number;
  isExists: boolean;
};

export const productToCart = ({ product, quantity, isExists }: ProductToCartProps): CartItemType => {
  return {
    id: product.id,
    productName: product.name,
    productDescription: product.description,
    productImage: product.images[0].imageUrl,
    category: product.categories[0]?.categoryName,
    isExists: isExists,
    productPrice: product.price,
    quantity: quantity,
    variants: product.variants,
  };
};

export const cartItemToProductItem = (item: CartItemType) => {
  return {
    id: item.id,
    quantity: item.quantity,
  };
};
