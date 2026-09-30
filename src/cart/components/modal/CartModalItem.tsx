import { MdDeleteOutline } from "react-icons/md";
import { FaPlus, FaMinus } from "react-icons/fa6";
import { Link } from "react-router";
import useCartItems from "../../hooks/useCartItems";
import { CartItemType } from "../../types/cart";
import { useEffect } from "react";
import PriceTag from "../../../shared/ui/PriceTag";
import ProductImage from "../../../shared/ui/ProductImage";
import { categoryStyle } from "../../../shared/utilities/category-color";

type CartModalItemProps = {
  item: CartItemType;
  image?: string;
  category?: string;
  onNavigate: () => void;
};

export default function CartModalItem({ item, image, category, onNavigate }: CartModalItemProps) {
  const {
    totalPrice,
    handleRemoveItem,
    increaseQuantity,
    decreaseQuantity,
    handleTotalPrice,
  } = useCartItems({ itemId: item.id });

  useEffect(() => handleTotalPrice(), [item.quantity]);

  return (
    <li style={categoryStyle(category)} className="flex gap-3 border-b border-line px-4 py-3 last:border-b-0">
      <Link
        to={`/product/${item.id}`}
        onClick={onNavigate}
        className="group h-20 w-20 shrink-0 overflow-hidden rounded-xl bg-(--cat-soft,var(--color-cream)) p-2"
        aria-label={`Ver ${item.productName}`}
      >
        <ProductImage
          src={image ?? item.productImage}
          width={200}
          alt={item.productName}
          className="mix-blend-darken transition-transform duration-300 group-hover:scale-105"
        />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <Link
              to={`/product/${item.id}`}
              onClick={onNavigate}
              className="line-clamp-1 font-extrabold leading-snug text-ink hover:text-(--cat,var(--color-brand))"
            >
              {item.productName}
            </Link>
            {category && <p className="text-xs font-bold text-(--cat)">{category}</p>}
          </div>

          <button
            type="button"
            aria-label="Eliminar producto"
            onClick={handleRemoveItem}
            className="-mr-1 -mt-1 grid h-8 w-8 shrink-0 place-items-center rounded-full text-ink-muted transition-colors
              hover:bg-error/10 hover:text-error"
          >
            <MdDeleteOutline size={18} />
          </button>
        </div>

        <div className="mt-auto flex items-end justify-between gap-2">
          <PriceTag price={totalPrice} />

          <div className="flex items-center rounded-full border border-line">
            <button
              type="button"
              aria-label="Quitar una unidad"
              disabled={item.quantity === 1}
              onClick={decreaseQuantity}
              className="grid h-8 w-8 place-items-center rounded-full text-ink transition-colors
                hover:bg-brand-soft hover:text-brand disabled:text-base-300 disabled:hover:bg-transparent"
            >
              <FaMinus size={10} />
            </button>
            <span className="w-6 text-center text-sm font-bold text-ink">{item.quantity}</span>
            <button
              type="button"
              aria-label="Agregar una unidad"
              onClick={increaseQuantity}
              className="grid h-8 w-8 place-items-center rounded-full text-ink transition-colors
                hover:bg-brand-soft hover:text-brand"
            >
              <FaPlus size={10} />
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
