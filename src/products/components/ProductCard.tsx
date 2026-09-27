import { Link } from "react-router";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { FiCheck, FiShoppingBag } from "react-icons/fi";
import { ProductTypes } from "../types/product";
import { formatPrice } from "../../shared/utilities/format-price";
import ProductImage from "../../shared/ui/ProductImage";

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
  const categories = product.categories.slice(0, 2);

  return (
    <article
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line
        bg-base-100 shadow-card transition-all duration-300 hover:-translate-y-1
        hover:border-brand/40 hover:shadow-card-hover"
    >
      <button
        type="button"
        aria-label={isInWishList ? "Quitar de la lista de deseos" : "Agregar a la lista de deseos"}
        aria-pressed={isInWishList}
        onClick={() => onToggleWishList(product)}
        className="absolute right-3 top-3 z-10 grid h-9 w-9 place-items-center rounded-full border
          border-line bg-base-100/90 text-ink-soft backdrop-blur-sm transition-colors
          hover:border-brand hover:text-brand"
      >
        {isInWishList ? <FaHeart size={15} className="text-brand" /> : <FaRegHeart size={15} />}
      </button>

      <Link
        to={`/product/${product.id}`}
        className="block bg-cream"
      >
        <div className="aspect-square w-full overflow-hidden">
          <ProductImage
            src={product.images[0]?.imageUrl}
            width={500}
            alt={product.name}
            loading="lazy"
            className="transition-transform duration-500 group-hover:scale-105"
          />
        </div>
      </Link>

      <div className="flex flex-1 flex-col gap-3 p-5">
        {categories.length > 0 && (
          <ul className="flex flex-wrap gap-1.5">
            {categories.map(({ categoryName }) => (
              <li
                key={categoryName}
                className="rounded-full bg-brand-soft px-2.5 py-0.5 text-[11px] font-semibold
                  uppercase tracking-[0.06em] text-secondary-content"
              >
                {categoryName}
              </li>
            ))}
          </ul>
        )}

        <Link
          to={`/product/${product.id}`}
          className="line-clamp-2 font-medium leading-snug text-ink transition-colors hover:text-brand"
        >
          {product.name}
        </Link>

        <p className="mt-auto font-display text-xl font-bold text-brand">
          {formatPrice(product.price)}
        </p>

        <button
          type="button"
          onClick={() => onToggleCart(product)}
          className={`btn w-full gap-2 rounded-xl border-0 font-medium shadow-none transition-colors ${
            isInCart
              ? "bg-brand-soft text-secondary-content hover:bg-brand-tint"
              : "bg-brand text-primary-content hover:bg-brand-dark"
          }`}
        >
          {isInCart ? <FiCheck size={17} /> : <FiShoppingBag size={17} />}
          {isInCart ? "En el carrito" : "Agregar"}
        </button>
      </div>
    </article>
  );
}
