import { Link } from "react-router";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { FiCheck, FiShoppingBag } from "react-icons/fi";
import { ProductTypes } from "../types/product";
import { formatPrice } from "../../shared/utilities/format-price";

type ProductCardProps = {
  product: ProductTypes;
  isInCart: boolean;
  isInWishList: boolean;
  onToggleCart: (product: ProductTypes) => void;
  onToggleWishList: (product: ProductTypes) => void;
};

export default function ProductCard({
  product,
  isInCart,
  isInWishList,
  onToggleCart,
  onToggleWishList,
}: ProductCardProps) {
  const category = product.categories[0]?.categoryName;

  return (
    <article
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-line
        bg-base-100 shadow-card transition-all duration-300 hover:-translate-y-1 hover:shadow-card-hover"
    >
      <button
        type="button"
        aria-label={isInWishList ? "Quitar de la lista de deseos" : "Agregar a la lista de deseos"}
        aria-pressed={isInWishList}
        onClick={() => onToggleWishList(product)}
        className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full border
          border-line bg-base-100/80 text-ink-soft backdrop-blur-sm transition-colors
          hover:text-brand"
      >
        {isInWishList ? <FaHeart size={15} className="text-brand" /> : <FaRegHeart size={15} />}
      </button>

      <Link to={`/product/${product.id}`} className="block bg-cream p-6">
        <div className="aspect-square w-full overflow-hidden">
          <img
            src={product.images[0]?.imageUrl}
            alt={product.name}
            loading="lazy"
            className="h-full w-full object-contain transition-transform duration-500
              group-hover:scale-105"
          />
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex flex-col gap-1">
          {category && (
            <span className="text-[11px] font-medium uppercase tracking-[0.08em] text-ink-muted">
              {category}
            </span>
          )}
          <Link
            to={`/product/${product.id}`}
            className="line-clamp-2 font-medium leading-snug text-ink transition-colors hover:text-brand"
          >
            {product.name}
          </Link>
        </div>

        <p className="mt-auto font-display text-xl font-semibold text-ink">
          {formatPrice(product.price)}
        </p>

        <button
          type="button"
          onClick={() => onToggleCart(product)}
          className={`btn w-full gap-2 rounded-xl border-0 font-medium shadow-none ${
            isInCart
              ? "bg-secondary text-secondary-content hover:bg-brand-soft"
              : "bg-neutral text-neutral-content hover:bg-brand"
          }`}
        >
          {isInCart ? <FiCheck size={17} /> : <FiShoppingBag size={17} />}
          {isInCart ? "En el carrito" : "Agregar"}
        </button>
      </div>
    </article>
  );
}
