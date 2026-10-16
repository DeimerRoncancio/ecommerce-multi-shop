import useCart from "../../cart/hooks/useCart";
import useWishList from "../../wishlist/hooks/useWishList";
import ProductCard from "../../products/components/ProductCard";
import MiniProductCard from "../../shared/ui/MiniProductCard";
import { ProductTypes } from "../../products/types/product";

export default function useProductCard(mini = false) {
  const { wishList, handleAddWishListItem, handleRemoveWishListItem } = useWishList();
  const { cartItems, handleAddItem, handleRemoveItem } = useCart();

  const toggleCart = (product: ProductTypes) => {
    cartItems.some(item => item.id === product.id) ? handleRemoveItem(product) : handleAddItem(product);
  };

  const toggleWishList = (product: ProductTypes) => {
    wishList.some(item => item.id === product.id)
      ? handleRemoveWishListItem(product.id, product)
      : handleAddWishListItem(product);
  };

  const renderCard = (product: ProductTypes, category?: string) =>
    mini ? (
      <MiniProductCard
        id={product.id}
        name={product.name}
        price={product.price}
        image={product.images[0]?.imageUrl}
        category={category ?? product.categories[0]?.categoryName}
        isInCart={cartItems.some(item => item.id === product.id)}
        isInWishList={wishList.some(item => item.id === product.id)}
        onToggleCart={() => toggleCart(product)}
        onToggleWishList={() => toggleWishList(product)}
      />
    ) : (
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
