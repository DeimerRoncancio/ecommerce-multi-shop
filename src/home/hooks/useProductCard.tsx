import useCart from "../../cart/hooks/useCart";
import useWishList from "../../wishlist/hooks/useWishList";
import ProductCard from "../../products/components/ProductCard";
import { ProductTypes } from "../../products/types/product";

export default function useProductCard() {
  const { wishList, handleAddWishListItem, handleRemoveWishListItem } = useWishList();
  const { cartItems, handleAddItem, handleRemoveItem } = useCart();

  const toggleCart = (product: ProductTypes) => {
    cartItems.some(item => item.id === product.id)
      ? handleRemoveItem(product)
      : handleAddItem(product);
  };

  const toggleWishList = (product: ProductTypes) => {
    wishList.some(item => item.id === product.id)
      ? handleRemoveWishListItem(product.id)
      : handleAddWishListItem(product);
  };

  const renderCard = (product: ProductTypes, category?: string) => (
    <ProductCard
      category={category}
      product={product}
      isInCart={cartItems.some(item => item.id === product.id)}
      isInWishList={wishList.some(item => item.id === product.id)}
      onToggleCart={toggleCart}
      onToggleWishList={toggleWishList}
    />
  );

  return renderCard;
}
