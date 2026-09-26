import { MdDeleteOutline } from "react-icons/md";
import { FaPlus, FaMinus } from "react-icons/fa6";
import useCartItems from "../../hooks/useCartItems";
import { CartItemType } from "../../types/cart";
import { useEffect } from "react";
import { formatPrice } from "../../../shared/utilities/format-price";

type CartModalItemProps = {
  item: CartItemType;
  length: number;
  index: number;
};

export default function CartModalItem({ item, length, index }: CartModalItemProps) {
  const {
    totalPrice,
    handleRemoveItem,
    increaseQuantity,
    decreaseQuantity,
    handleTotalPrice,
  } = useCartItems({ itemId: item.id });

  useEffect(() => handleTotalPrice(), [item.quantity]);

  return (
    <li className={`flex gap-3 p-4 ${index === length - 1 ? "" : "border-b border-line"}`}>
      <div className="grid h-20 w-20 shrink-0 place-items-center rounded-xl bg-cream p-2">
        <img
          src={item.productImage}
          alt={item.productName}
          className="h-full w-full object-contain"
        />
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1">
        <p className="truncate text-[10px] font-medium uppercase tracking-[0.08em] text-ink-muted">
          {item.productName}
        </p>
        <p className="line-clamp-2 text-sm font-medium leading-snug text-ink">
          {item.productDescription}
        </p>

        <div className="mt-1 flex items-center justify-between gap-2">
          <p className="font-display font-semibold text-ink">{formatPrice(totalPrice)}</p>

          <div className="flex items-center gap-1">
            <div className="flex items-center overflow-hidden rounded-lg border border-line">
              <button
                type="button"
                aria-label="Quitar una unidad"
                disabled={item.quantity === 1}
                onClick={decreaseQuantity}
                className="grid h-8 w-8 place-items-center text-ink-soft transition-colors
                  hover:bg-cream hover:text-brand disabled:text-base-300 disabled:hover:bg-transparent"
              >
                <FaMinus size={10} />
              </button>
              <span className="grid h-8 w-8 place-items-center border-x border-line text-sm text-ink">
                {item.quantity}
              </span>
              <button
                type="button"
                aria-label="Agregar una unidad"
                onClick={increaseQuantity}
                className="grid h-8 w-8 place-items-center text-ink-soft transition-colors
                  hover:bg-cream hover:text-brand"
              >
                <FaPlus size={10} />
              </button>
            </div>

            <button
              type="button"
              aria-label="Eliminar producto"
              onClick={handleRemoveItem}
              className="grid h-8 w-8 place-items-center rounded-lg text-ink-muted transition-colors
                hover:bg-error/10 hover:text-error"
            >
              <MdDeleteOutline size={17} />
            </button>
          </div>
        </div>
      </div>
    </li>
  );
}
