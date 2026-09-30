import { MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router";
import useCartItems from "../hooks/useCartItems";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { CartItemType } from "../types/cart";
import { useEffect } from "react";
import { formatPrice } from "../../shared/utilities/format-price";
import PriceTag from "../../shared/ui/PriceTag";
import ProductImage from "../../shared/ui/ProductImage";
import { categoryStyle } from "../../shared/utilities/category-color";

type CartItemProps = {
  item: CartItemType;
  image?: string;
  category?: string;
};

export default function CartItem({ item, image, category }: CartItemProps) {
  const {
    quantity,
    totalPrice,
    handleRemoveItem,
    increaseQuantity,
    decreaseQuantity,
    handleTotalPrice,
    changeQuantity,
    updateQuantity,
  } = useCartItems({ itemId: item.id });

  useEffect(() => handleTotalPrice(), [item.quantity]);

  return (
    <li
      style={categoryStyle(category)}
      className="flex gap-4 border-b border-line py-5 sm:items-center sm:gap-5"
    >
      <Link
        to={`/product/${item.id}`}
        className="group h-24 w-24 shrink-0 overflow-hidden rounded-2xl bg-(--cat-soft,var(--color-cream)) sm:h-28
          sm:w-28"
        aria-label={`Ver ${item.productName}`}
      >
        <ProductImage
          src={image ?? item.productImage}
          width={240}
          alt={item.productName}
          className="transition-transform duration-300 group-hover:scale-105"
          cutoutClassName="p-2.5 mix-blend-darken"
        />
      </Link>

      <div className="flex min-w-0 flex-1 flex-col gap-3 sm:flex-row sm:items-center sm:gap-5">
        <div className="min-w-0 flex-1">
          {category && <p className="text-xs font-bold uppercase tracking-wide text-(--cat)">{category}</p>}
          <Link
            to={`/product/${item.id}`}
            className="line-clamp-1 text-lg font-extrabold text-ink hover:text-(--cat,var(--color-brand))"
          >
            {item.productName}
          </Link>
          <p className="line-clamp-1 text-sm text-ink-muted">{item.productDescription}</p>
          {item.quantity > 1 && (
            <p className="mt-0.5 text-xs font-semibold text-ink-soft">{formatPrice(item.productPrice)} c/u</p>
          )}
        </div>

        <div className="flex items-center justify-between gap-4 sm:contents">
          <div className="flex items-center rounded-full border border-line bg-base-100">
            <button
              type="button"
              aria-label="Quitar una unidad"
              disabled={item.quantity === 1}
              onClick={decreaseQuantity}
              className="grid h-10 w-10 place-items-center rounded-full text-ink transition-colors
                hover:bg-brand-soft hover:text-brand disabled:text-base-300 disabled:hover:bg-transparent"
            >
              <FaMinus size={11} />
            </button>
            <input
              value={quantity}
              type="number"
              aria-label="Cantidad"
              onChange={event => changeQuantity(Number(event.target.value))}
              onBlur={updateQuantity}
              onKeyDown={event => {
                if (event.key === "Enter") {
                  updateQuantity();
                  event.currentTarget.blur();
                }
              }}
              className="h-10 w-9 bg-transparent text-center font-extrabold text-ink outline-none
                [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none
                [&::-webkit-outer-spin-button]:appearance-none"
            />
            <button
              type="button"
              aria-label="Agregar una unidad"
              onClick={increaseQuantity}
              className="grid h-10 w-10 place-items-center rounded-full text-ink transition-colors
                hover:bg-brand-soft hover:text-brand"
            >
              <FaPlus size={11} />
            </button>
          </div>

          <div className="flex items-center gap-2 sm:w-44 sm:justify-end">
            <PriceTag price={totalPrice} />
            <button
              type="button"
              aria-label="Eliminar producto"
              onClick={handleRemoveItem}
              className="grid h-10 w-10 place-items-center rounded-full text-ink-muted transition-colors
                hover:bg-error/10 hover:text-error"
            >
              <MdDeleteOutline size={20} />
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
