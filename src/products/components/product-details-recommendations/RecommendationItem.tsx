import { ProductsFromApiType } from "../../types/product";
import useWishList from "../../../wishlist/hooks/useWishList";
import { mapApiToProducts } from "../../mappers/products.maper";
import useCart from "../../../cart/hooks/useCart";
import ProductCard from "../ProductCard";

type Props = {
  product: ProductsFromApiType;
};

export default function RecommendationItem({ product }: Props) {
  const { isInWishList, handleAddWishListItem, handleRemoveWishListItem } = useWishList();
  const { handleAddItem, handleRemoveItem, isInCart } = useCart();

  const item = mapApiToProducts(product);
  const inCart = isInCart(product.id);
  const inWishList = isInWishList(product.id);

  return (
    <ProductCard
      product={item}
      isInCart={inCart}
      isInWishList={inWishList}
      onToggleCart={() => (inCart ? handleRemoveItem(item) : handleAddItem(item))}
      onToggleWishList={() =>
        inWishList ? handleRemoveWishListItem(product.id) : handleAddWishListItem(item)
      }
    />
  );
}
