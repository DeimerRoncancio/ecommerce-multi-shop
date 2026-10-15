import { Link } from "react-router";
import { FaHeart, FaRegHeart } from "react-icons/fa6";
import { FiCheck, FiPlus, FiTruck } from "react-icons/fi";
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
  const mainCategory = category ?? product.categories[0]?.categoryName;

  return (
    <article style={categoryStyle(mainCategory)} className="group relative flex h-full flex-col">
      <div className="relative">
        <Link
          to={`/product/${product.id}`}
          className="relative block aspect-square w-full overflow-hidden rounded-2xl
            bg-(--cat-soft,var(--color-photo)) p-5"
        >
          <ProductImage
            src={product.images[0]?.imageUrl}
            width={500}
            alt={product.name}
            loading="lazy"
            className="mix-blend-darken transition-transform duration-300 group-hover:scale-110"
          />
        </Link>

        <button
          type="button"
          aria-label={isInWishList ? "Quitar de la lista de deseos" : "Agregar a la lista de deseos"}
          aria-pressed={isInWishList}
          onClick={() => onToggleWishList(product)}
          className={`absolute right-3 top-3 grid h-9 w-9 place-items-center rounded-full bg-base-100 shadow-sm
            transition-colors hover:text-brand ${isInWishList ? "text-brand" : "text-ink"}`}
        >
          {isInWishList ? <FaHeart size={15} /> : <FaRegHeart size={15} />}
        </button>

        <button
          type="button"
          aria-label={isInCart ? "Quitar del carrito" : "Agregar al carrito"}
          aria-pressed={isInCart}
          onClick={() => onToggleCart(product)}
          className={`absolute -bottom-5 right-3 grid h-11 w-11 place-items-center rounded-full text-white
            shadow-card-hover ring-4 ring-base-100 transition-all duration-200 hover:scale-110 ${
              isInCart ? "bg-success" : "bg-ink group-hover:bg-(--cat,var(--color-brand))"
            }`}
        >
          {isInCart ? <FiCheck size={19} strokeWidth={3} /> : <FiPlus size={20} strokeWidth={3} />}
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-1 px-1 pt-4">
        {mainCategory && (
          <p className="pr-14 text-[11px] font-extrabold uppercase tracking-wider text-(--cat,var(--color-brand))">
            {mainCategory}
          </p>
        )}
        <Link
          to={`/product/${product.id}`}
          className="line-clamp-2 text-[15px] font-extrabold leading-snug text-ink
            hover:text-(--cat,var(--color-brand))"
        >
          {product.name}
        </Link>

        <div className="mt-auto flex flex-col items-start gap-1.5 pt-2">
          <PriceTag price={product.price} />
          <p className="flex items-center gap-1.5 text-xs font-bold text-success">
            <FiTruck size={13} />
            Envío gratis
          </p>
        </div>
      </div>
    </article>
  );
}
