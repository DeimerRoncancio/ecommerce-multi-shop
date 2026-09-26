import { MdDeleteOutline } from "react-icons/md";
import useCartItems from "../hooks/useCartItems";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { CartItemType } from "../types/cart";
import { useEffect } from "react";
import { formatPrice } from "../../shared/utilities/format-price";

type CartItemProps = {
  item: CartItemType;
  length: number;
  index: number;
};

export default function CartItem({ item, length, index }: CartItemProps) {
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

  const isLast = index === length - 1;

  return (
    <li className={`flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:gap-6 ${
      isLast ? "" : "border-b border-line"
    }`}>
      <div className="grid h-24 w-24 shrink-0 place-items-center rounded-xl bg-cream p-2">
        <img
          src={item.productImage}
          alt={item.productName}
          className="h-full w-full object-contain"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <p className="text-[11px] font-medium uppercase tracking-[0.08em] text-ink-muted">
          {item.productName}
        </p>
        <p className="line-clamp-2 font-medium text-ink">{item.productDescription}</p>
        <p className="font-display text-lg font-semibold text-ink sm:hidden">
          {formatPrice(totalPrice)}
        </p>
      </div>

      <p className="hidden w-32 shrink-0 text-right font-display text-lg font-semibold text-ink sm:block">
        {formatPrice(totalPrice)}
      </p>

      <div className="flex shrink-0 items-center gap-2">
        <div className="flex items-center overflow-hidden rounded-xl border border-line bg-base-100">
          <button
            type="button"
            aria-label="Quitar una unidad"
            disabled={item.quantity === 1}
            onClick={decreaseQuantity}
            className="grid h-10 w-10 place-items-center text-ink-soft transition-colors
              hover:bg-cream hover:text-brand disabled:text-base-300 disabled:hover:bg-transparent"
          >
            <FaMinus size={12} />
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
            className="h-10 w-12 border-x border-line bg-base-100 text-center text-ink outline-none
              [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none
              [&::-webkit-outer-spin-button]:appearance-none"
          />
          <button
            type="button"
            aria-label="Agregar una unidad"
            onClick={increaseQuantity}
            className="grid h-10 w-10 place-items-center text-ink-soft transition-colors
              hover:bg-cream hover:text-brand"
          >
            <FaPlus size={12} />
          </button>
        </div>

        <button
          type="button"
          aria-label="Eliminar producto"
          onClick={handleRemoveItem}
          className="grid h-10 w-10 place-items-center rounded-xl text-ink-muted transition-colors
            hover:bg-error/10 hover:text-error"
        >
          <MdDeleteOutline size={20} />
        </button>
      </div>
    </li>
  );
}
