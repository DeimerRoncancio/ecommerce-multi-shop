import Rating from "../../../wishlist/components/Rating";
import { FiHeart, FiShoppingCart } from "react-icons/fi";
import { IoMdHeart } from "react-icons/io";
import { ProductsFromApiType } from "../../types/product";
import useWishList from "../../../wishlist/hooks/useWishList";
import { mapApiToProducts } from "../../mappers/products.maper";
import useCart from "../../../cart/hooks/useCart";
import { formatPrice } from "../../../shared/utilities/format-price";

type Props = {
  product: ProductsFromApiType;
  index: number;
};

export default function RecommendationItem({ product, index }: Props) {
  const { isInWishList, handleAddWishListItem, handleRemoveWishListItem } = useWishList();
  const { handleAddItem, isInCart } = useCart();

  const inCart = isInCart(product.id);
  const inWishList = isInWishList(product.id);

  return (
    <>
      <div className="flex h-48 w-full items-center justify-center rounded-xl bg-cream p-4">
        <img
          src={product.productImages[0]?.imageUrl}
          alt={product.productName}
          loading="lazy"
          className="h-full w-full object-contain"
        />
      </div>

      <div className="mt-4 flex flex-1 flex-col gap-2">
        <ul className="flex gap-2 text-[11px] font-medium uppercase tracking-[0.08em] text-ink-muted">
          {product.categories.slice(0, 2).map(cat => (
            <li key={cat.categoryName}>{cat.categoryName}</li>
          ))}
        </ul>

        <h3 className="line-clamp-2 font-medium leading-snug text-ink">{product.productName}</h3>
        <Rating index={index} />

        <p className="font-display text-lg font-semibold text-ink">{formatPrice(product.price)}</p>

        <button
          type="button"
          disabled={inCart}
          onClick={event => {
            event.stopPropagation();
            handleAddItem(mapApiToProducts(product));
          }}
          className="btn mt-2 w-full gap-2 rounded-xl border-0 bg-neutral text-neutral-content
            shadow-none hover:bg-brand disabled:bg-base-300 disabled:text-ink-muted"
        >
          <FiShoppingCart size={16} />
          {inCart ? "Ya está en el carrito" : "Agregar al carrito"}
        </button>
      </div>

      <button
        type="button"
        aria-label={inWishList ? "Quitar de la lista de deseos" : "Agregar a la lista de deseos"}
        onClick={event => {
          event.stopPropagation();
          inWishList
            ? handleRemoveWishListItem(product.id)
            : handleAddWishListItem(mapApiToProducts(product));
        }}
        className="absolute right-4 top-4 z-10 grid h-9 w-9 place-items-center rounded-full border
          border-line bg-base-100/90 text-ink-soft backdrop-blur-sm transition-colors hover:text-brand"
      >
        {inWishList ? <IoMdHeart size={16} className="text-brand" /> : <FiHeart size={16} />}
      </button>
    </>
  );
}
