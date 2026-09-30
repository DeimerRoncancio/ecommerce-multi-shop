import { useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import CartModal from "../../../cart/components/modal/CartModal";
import useCart from "../../../cart/hooks/useCart";

export default function CartButton() {
  const [showCart, setShowCart] = useState(false);
  const { itemsQuantity } = useCart();

  return (
    <>
      <button
        type="button"
        aria-label={`Carrito, ${itemsQuantity} productos`}
        onClick={() => setShowCart(!showCart)}
        className="relative flex h-14 min-w-16 flex-col items-center justify-center gap-0.5 rounded-xl px-2
          text-white transition-colors hover:bg-white/15"
      >
        <span className="relative">
          <FiShoppingCart size={22} />
          {itemsQuantity > 0 && (
            <span
              className="absolute -top-3 left-4.25 grid h-5 min-w-5 place-items-center rounded-full bg-sun px-1
                text-[11px] font-extrabold text-ink ring-2 ring-brand"
            >
              {itemsQuantity}
            </span>
          )}
        </span>
        <span className="text-xs font-bold">Carrito</span>
      </button>

      <CartModal viewCart={showCart} hiddeCart={() => setShowCart(false)} />
    </>
  );
}
