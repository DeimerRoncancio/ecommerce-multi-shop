import { Link } from "react-router";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { FiCheck, FiShoppingCart } from "react-icons/fi";
import { ProductTypes } from "../types/product";
import PriceTag from "../../shared/ui/PriceTag";
import ProductImage from "../../shared/ui/ProductImage";
import { categoryStyle } from "../../shared/utilities/category-color";

type ProductCardProps = {
  product: ProductTypes;
  isInCart: boolean;
  isInWishList: boolean;
  onToggleCart: (product: ProductTypes) => void;
  onToggleWishList: (product: ProductTypes) => void;
  category?: string;
};

export default function ProductCard({
  product,
  isInCart,
  isInWishList,
  onToggleCart,
  onToggleWishList,
  category,
}: ProductCardProps) {
  return (
    <article
      style={categoryStyle(category ?? product.categories[0]?.categoryName)}
      className="group relative flex h-full flex-col gap-2 border border-line bg-base-100 p-3 transition-all
        duration-200 hover:border-(--cat,var(--color-brand)) hover:shadow-card-hover"
    >
      <Link to={`/product/${product.id}`} className="block aspect-square w-full bg-(--cat-soft,var(--color-photo)) p-3">
        <ProductImage
          src={product.images[0]?.imageUrl}
          width={500}
          alt={product.name}
          loading="lazy"
          className="mix-blend-darken transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      <button
        type="button"
        aria-label={isInWishList ? "Quitar de la lista de deseos" : "Agregar a la lista de deseos"}
        aria-pressed={isInWishList}
        onClick={() => onToggleWishList(product)}
        className={`absolute right-5 top-5 grid h-8 w-8 place-items-center rounded-full bg-base-100
          transition-colors hover:text-brand ${isInWishList ? "text-brand" : "text-ink"}`}
      >
        {isInWishList ? <FaHeart size={14} /> : <FaRegHeart size={14} />}
      </button>

      <div className="flex flex-1 flex-col gap-1 pt-1">
        <Link
          to={`/product/${product.id}`}
          className="line-clamp-2 text-[15px] font-extrabold leading-snug text-ink hover:text-(--cat,var(--color-brand))"
        >
          {product.name}
        </Link>
        <p className="text-[13px] font-semibold text-(--cat,var(--color-ink-soft))">
          {product.categories.map(({ categoryName }) => categoryName).join(" · ")}
        </p>

        <div className="mt-auto flex items-end justify-between gap-2 pt-2">
          <PriceTag price={product.price} />
          <button
            type="button"
            aria-label={isInCart ? "Quitar del carrito" : "Agregar al carrito"}
            aria-pressed={isInCart}
            onClick={() => onToggleCart(product)}
            className={`grid h-10 w-10 shrink-0 place-items-center rounded-full text-white transition-colors
              ${isInCart ? "bg-success" : "bg-(--cat,var(--color-brand)) hover:bg-ink"}`}
          >
            {isInCart ? <FiCheck size={18} strokeWidth={3} /> : <FiShoppingCart size={17} />}
          </button>
        </div>
        <p className="text-xs font-bold text-success">Envío gratis</p>
      </div>
    </article>
  );
}
