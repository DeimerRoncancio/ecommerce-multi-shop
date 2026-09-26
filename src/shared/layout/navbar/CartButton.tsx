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
        className="relative grid h-10 w-10 place-items-center rounded-xl text-ink
          transition-colors hover:bg-cream hover:text-brand"
      >
        <FiShoppingCart size={21} />
        {itemsQuantity > 0 && (
          <span
            className="absolute -right-0.5 -top-0.5 grid h-5 min-w-5 place-items-center rounded-full
              bg-brand px-1 text-[11px] font-semibold text-primary-content"
          >
            {itemsQuantity}
          </span>
        )}
      </button>

      <CartModal viewCart={showCart} hiddeCart={() => setShowCart(false)} />
    </>
  );
}
