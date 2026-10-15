import { Link } from "react-router";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { FiArrowRight, FiCheck, FiShoppingCart, FiTruck } from "react-icons/fi";
import ProductImage from "./ProductImage";
import PriceTag from "./PriceTag";
import { categoryStyle } from "../utilities/category-color";

type MiniProductCardProps = {
  id: string;
  name: string;
  price: number;
  image?: string;
  category?: string;
  onNavigate?: () => void;
  isInCart?: boolean;
  isInWishList?: boolean;
  onToggleCart?: () => void;
  onToggleWishList?: () => void;
};

export default function MiniProductCard({
  id,
  name,
  price,
  image,
  category,
  onNavigate,
  isInCart,
  isInWishList,
  onToggleCart,
  onToggleWishList,
}: MiniProductCardProps) {
  const to = `/product/${id}`;

  return (
    <article
      style={categoryStyle(category)}
      className="group relative flex h-full flex-col gap-2 border border-line border-b-4 border-b-(--cat) bg-base-100
        p-2.5 transition-all duration-200 hover:-translate-y-0.5 hover:border-(--cat) hover:shadow-card-hover"
    >
      <Link to={to} onClick={onNavigate} className="block aspect-square w-full overflow-hidden bg-(--cat-soft) p-3">
        <ProductImage
          src={image}
          width={300}
          alt={name}
          className="mix-blend-darken transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      {onToggleWishList && (
        <button
          type="button"
          aria-label={isInWishList ? "Quitar de la lista de deseos" : "Agregar a la lista de deseos"}
          aria-pressed={isInWishList}
          onClick={onToggleWishList}
          className={`absolute right-4 top-4 grid h-8 w-8 place-items-center rounded-full bg-base-100 shadow-sm
            transition-colors hover:text-brand ${isInWishList ? "text-brand" : "text-ink"}`}
        >
          {isInWishList ? <FaHeart size={14} /> : <FaRegHeart size={14} />}
        </button>
      )}

      <Link
        to={to}
        onClick={onNavigate}
        className="line-clamp-2 text-sm font-extrabold leading-snug text-ink group-hover:text-(--cat)"
      >
        {name}
      </Link>
      <p className="-mt-1 flex items-center gap-1 text-xs font-bold text-success">
        <FiTruck size={12} />
        Envío gratis
      </p>
      <div className="mt-auto flex items-end justify-between gap-2">
        <PriceTag price={price} />
        {onToggleCart ? (
          <button
            type="button"
            aria-label={isInCart ? "Quitar del carrito" : "Agregar al carrito"}
            aria-pressed={isInCart}
            onClick={onToggleCart}
            className={`grid h-9 w-9 shrink-0 place-items-center rounded-full text-white transition-colors ${
              isInCart ? "bg-success" : "bg-(--cat) hover:bg-ink"
            }`}
          >
            {isInCart ? <FiCheck size={16} strokeWidth={3} /> : <FiShoppingCart size={15} />}
          </button>
        ) : (
          <Link to={to} onClick={onNavigate} aria-label={`Ver ${name}`} className="mb-1 text-(--cat)">
            <FiArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
          </Link>
        )}
      </div>
    </article>
  );
}
