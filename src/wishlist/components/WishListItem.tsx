import { FaRegTrashAlt } from "react-icons/fa";
import { WishListItemType } from "../types/wishlist";
import useWishList from "../hooks/useWishList";
import useCart from "../../cart/hooks/useCart";
import Rating from "./Rating";
import { ProductTypes } from "../../products/types/product";
import { formatPrice } from "../../shared/utilities/format-price";

type WishListItemProps = {
  item: WishListItemType;
  index: number;
  products: ProductTypes[];
};

export default function WishListItem({ item, index, products }: WishListItemProps) {
  const { handleRemoveWishListItem } = useWishList();
  const { cartItems, handleAddItem } = useCart();

  const isInCart = cartItems.some(itemCart => itemCart.id === item.id);

  const handleAddToCart = (id: string) => {
    const product = products.filter(product => product.id == id)[0];
    if (product) handleAddItem(product);
  };

  return (
    <li className="group relative flex flex-col overflow-hidden rounded-2xl border border-line
      bg-base-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover">
      <div className="aspect-square w-full overflow-hidden bg-cream p-5">
        <img
          src={item.productImage}
          alt={item.productName}
          loading="lazy"
          className="h-full w-full object-contain transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-4">
        <h2 className="line-clamp-2 font-medium leading-snug text-ink">{item.productName}</h2>
        <Rating index={index} />
        <p className="mt-auto font-display text-lg font-semibold text-ink">
          {formatPrice(item.productPrice)}
        </p>

        <button
          type="button"
          disabled={isInCart}
          onClick={() => handleAddToCart(item.id)}
          className="btn mt-3 w-full rounded-xl border-0 bg-neutral text-neutral-content shadow-none
            hover:bg-brand disabled:bg-base-300 disabled:text-ink-muted"
        >
          {isInCart ? "Producto añadido" : "Agregar al carrito"}
        </button>
      </div>

      <button
        type="button"
        aria-label="Quitar de la lista"
        onClick={() => handleRemoveWishListItem(item.id)}
        className="absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full border
          border-line bg-base-100/90 text-ink-soft opacity-0 backdrop-blur-sm transition-all
          duration-300 hover:text-error group-hover:opacity-100"
      >
        <FaRegTrashAlt size={14} />
      </button>
    </li>
  );
}
