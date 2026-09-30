import { FaRegTrashAlt } from "react-icons/fa";
import { FiCheck, FiPlus, FiTruck } from "react-icons/fi";
import { WishListItemType } from "../types/wishlist";
import useWishList from "../hooks/useWishList";
import useCart from "../../cart/hooks/useCart";
import Rating from "./Rating";
import { ProductTypes } from "../../products/types/product";
import { formatPrice } from "../../shared/utilities/format-price";
import ProductImage from "../../shared/ui/ProductImage";

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
    <li className="group relative flex flex-col overflow-hidden border border-line
      bg-base-100 transition-all duration-200 hover:border-transparent hover:shadow-card-hover">
      <div className="border-b border-line bg-photo p-3">
        <div className="aspect-square w-full overflow-hidden">
          <ProductImage
            src={item.productImage}
            width={500}
            alt={item.productName}
            loading="lazy"
            className="transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-1.5 p-3.5">
        <h2 className="line-clamp-2 text-sm leading-snug text-ink-soft">{item.productName}</h2>
        <Rating index={index} />
        <p className="mt-auto pt-1 text-xl font-extrabold tracking-tight text-ink">
          {formatPrice(item.productPrice)}
        </p>
        <p className="flex items-center gap-1 text-xs font-bold text-success">
          <FiTruck size={13} />
          Envío gratis
        </p>

        <button
          type="button"
          disabled={isInCart}
          onClick={() => handleAddToCart(item.id)}
          className="btn btn-sm mt-2 w-full gap-1.5 sticker sticker-hover bg-action text-primary-content hover:bg-action-dark disabled:bg-success/10 disabled:text-success font-semibold"
        >
          {isInCart ? <FiCheck size={16} /> : <FiPlus size={16} />}
          {isInCart ? "En el carrito" : "Agregar al carrito"}
        </button>
      </div>

      <button
        type="button"
        aria-label="Quitar de la lista"
        onClick={() => handleRemoveWishListItem(item.id)}
        className="absolute right-2.5 top-2.5 grid h-8 w-8 place-items-center rounded-full bg-base-100
          text-ink-muted shadow-card transition-all hover:scale-110 hover:text-deal"
      >
        <FaRegTrashAlt size={13} />
      </button>
    </li>
  );
}
