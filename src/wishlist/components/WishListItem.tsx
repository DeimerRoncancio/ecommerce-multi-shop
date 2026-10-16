import { Link } from "react-router";
import { FiCheck, FiShoppingCart } from "react-icons/fi";
import useWishList from "../hooks/useWishList";
import useCart from "../../cart/hooks/useCart";
import { ProductTypes } from "../../products/types/product";
import PriceTag from "../../shared/ui/PriceTag";
import ProductImage from "../../shared/ui/ProductImage";
import { categoryStyle } from "../../shared/utilities/category-color";

type WishListItemProps = {
  id: string;
  product?: ProductTypes;
  loaded: boolean;
};

const rowStyles = "grid grid-cols-[72px_1fr] items-center gap-x-4 gap-y-3 rounded-2xl border border-line p-2.5";

export default function WishListItem({ id, product, loaded }: WishListItemProps) {
  const { handleRemoveWishListItem } = useWishList();
  const { cartItems, handleAddItem } = useCart();

  if (!product && !loaded) {
    return (
      <li aria-hidden className={`${rowStyles} sm:grid-cols-[96px_1fr_auto]`}>
        <span className="h-18 w-18 animate-pulse rounded-xl bg-base-200 sm:h-24 sm:w-24" />
        <span className="flex min-w-0 flex-col gap-2">
          <span className="h-4 w-3/4 max-w-60 animate-pulse rounded bg-base-200" />
          <span className="h-3 w-28 animate-pulse rounded bg-base-200" />
          <span className="h-3 w-20 animate-pulse rounded bg-success/15" />
        </span>
        <span
          className="col-span-2 flex items-center justify-between gap-3 sm:col-span-1 sm:flex-col sm:items-end
          sm:justify-center sm:gap-2"
        >
          <span className="h-7.5 w-24 animate-pulse self-start bg-sun/40" />
          <span className="flex items-center gap-3">
            <span className="h-3 w-10 animate-pulse rounded bg-base-200" />
            <span className="h-9 w-28 animate-pulse rounded-full bg-base-200" />
          </span>
        </span>
      </li>
    );
  }

  if (!product) {
    return (
      <li className={`${rowStyles} border-dashed`}>
        <span className="h-18 w-18 rounded-xl bg-cream sm:h-24 sm:w-24" />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="font-bold text-ink-muted">Este producto ya no está disponible</p>
          <button
            type="button"
            onClick={() => handleRemoveWishListItem(id)}
            className="text-xs font-bold text-ink-muted underline underline-offset-4 transition-colors hover:text-error"
          >
            Quitar
          </button>
        </div>
      </li>
    );
  }

  const categories = product.categories.map(({ categoryName }) => categoryName);
  const isInCart = cartItems.some(itemCart => itemCart.id === id);

  return (
    <li
      style={categoryStyle(categories[0])}
      className={`${rowStyles} transition-colors hover:border-(--cat,var(--color-brand)) sm:grid-cols-[96px_1fr_auto]`}
    >
      <Link
        to={`/product/${id}`}
        className="group h-18 w-18 overflow-hidden rounded-xl bg-(--cat-soft,var(--color-photo)) p-2 sm:h-24 sm:w-24"
        aria-label={`Ver ${product.name}`}
      >
        <ProductImage
          src={product.images[0]?.imageUrl}
          width={200}
          alt={product.name}
          loading="lazy"
          className="mix-blend-darken transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      <div className="min-w-0">
        <Link
          to={`/product/${id}`}
          className="line-clamp-1 font-extrabold text-ink hover:text-(--cat,var(--color-brand))"
        >
          {product.name}
        </Link>
        {categories.length > 0 && (
          <p className="text-xs font-bold uppercase tracking-wide text-(--cat,var(--color-ink-soft))">
            {categories.join(" · ")}
          </p>
        )}
        <p className="mt-1 text-xs font-bold text-success">Envío gratis</p>
      </div>

      <div
        className="col-span-2 flex items-center justify-between gap-3 sm:col-span-1 sm:flex-col sm:items-end
        sm:justify-center sm:gap-2"
      >
        <PriceTag price={product.price} />
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => handleRemoveWishListItem(id, product)}
            className="text-xs font-bold text-ink-muted underline underline-offset-4 transition-colors hover:text-error"
          >
            Quitar
          </button>
          <button
            type="button"
            disabled={isInCart}
            onClick={() => handleAddItem(product)}
            className={`flex h-9 items-center gap-1.5 rounded-full px-4 text-sm font-bold transition-colors ${
              isInCart
                ? "bg-success/10 text-success"
                : "bg-(--cat,var(--color-brand)) text-white hover:bg-ink disabled:bg-base-300 disabled:text-ink-muted"
            }`}
          >
            {isInCart ? <FiCheck size={15} strokeWidth={3} /> : <FiShoppingCart size={15} />}
            {isInCart ? "En el carrito" : "Agregar"}
          </button>
        </div>
      </div>
    </li>
  );
}
