import { Link } from "react-router";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { FiArrowRight, FiCheck, FiPlus, FiTruck } from "react-icons/fi";
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
  const circle = `absolute -bottom-4 right-2 grid h-9 w-9 place-items-center rounded-full text-white
    shadow-card-hover ring-4 ring-base-100 transition-all duration-200 hover:scale-110`;

  return (
    <article style={categoryStyle(category)} className="group relative flex h-full flex-col">
      <div className="relative">
        <Link
          to={to}
          onClick={onNavigate}
          className="block aspect-square w-full overflow-hidden rounded-2xl border-b-4 border-(--cat) bg-(--cat-soft) p-4"
        >
          <ProductImage
            src={image}
            width={300}
            alt={name}
            className="mix-blend-darken transition-transform duration-300 group-hover:scale-110"
          />
        </Link>

        {onToggleWishList && (
          <button
            type="button"
            aria-label={isInWishList ? "Quitar de la lista de deseos" : "Agregar a la lista de deseos"}
            aria-pressed={isInWishList}
            onClick={onToggleWishList}
            className={`absolute right-2.5 top-2.5 grid h-8 w-8 place-items-center rounded-full bg-base-100
              shadow-sm transition-colors hover:text-brand ${isInWishList ? "text-brand" : "text-ink"}`}
          >
            {isInWishList ? <FaHeart size={14} /> : <FaRegHeart size={14} />}
          </button>
        )}

        <span className="pointer-events-none absolute -bottom-3.5 left-2 -rotate-2 shadow-sm">
          <PriceTag price={price} />
        </span>

        {onToggleCart ? (
          <button
            type="button"
            aria-label={isInCart ? "Quitar del carrito" : "Agregar al carrito"}
            aria-pressed={isInCart}
            onClick={onToggleCart}
            className={`${circle} ${isInCart ? "bg-success" : "bg-ink group-hover:bg-(--cat)"}`}
          >
            {isInCart ? <FiCheck size={17} strokeWidth={3} /> : <FiPlus size={18} strokeWidth={3} />}
          </button>
        ) : (
          <Link
            to={to}
            onClick={onNavigate}
            aria-label={`Ver ${name}`}
            className={`${circle} bg-ink group-hover:bg-(--cat)`}
          >
            <FiArrowRight size={17} className="transition-transform group-hover:translate-x-0.5" />
          </Link>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-1 px-1 pt-5">
        {category && (
          <p className="pr-12 text-[11px] font-extrabold uppercase tracking-wider text-(--cat)">{category}</p>
        )}
        <Link
          to={to}
          onClick={onNavigate}
          className="line-clamp-2 pr-10 text-sm font-extrabold leading-snug text-ink hover:text-(--cat)"
        >
          {name}
        </Link>
        <p className="mt-auto flex items-center gap-1 pt-1 text-xs font-bold text-success">
          <FiTruck size={12} />
          Envío gratis
        </p>
      </div>
    </article>
  );
}
