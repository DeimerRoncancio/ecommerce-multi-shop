import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { IoCloseOutline } from "react-icons/io5";
import { useNavigate } from "react-router";
import useCart from "../../hooks/useCart";
import CartModalItem from "./CartModalItem";
import ClearButton from "../ClearButton";
import { formatPrice } from "../../../shared/utilities/format-price";

type CartModalProps = {
  viewCart: boolean;
  hiddeCart: () => void;
};

export default function CartModal({ viewCart, hiddeCart }: CartModalProps) {
  const { cartItems, totalPrice, itemsQuantity, clear } = useCart();
  const navigate = useNavigate();
  // El panel se monta en <body>: la navbar usa backdrop-blur y eso la convierte en
  // el marco de referencia de sus hijos con position: fixed, que quedarían
  // encerrados dentro de la barra.
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true), []);

  const goCart = () => {
    navigate("/cart");
    hiddeCart();
  };

  if (!isMounted) return null;

  return createPortal(
    <div
      className={`fixed inset-0 z-40 transition-opacity duration-300 ${
        viewCart ? "visible opacity-100" : "invisible opacity-0"
      }`}
    >
      <div className="absolute inset-0 bg-ink/40 backdrop-blur-[2px]" onClick={hiddeCart} />

      <aside
        className={`absolute right-0 top-0 flex h-full w-full max-w-sm flex-col bg-base-100
          shadow-card-hover transition-transform duration-300 ${
            viewCart ? "translate-x-0" : "translate-x-full"
          }`}
      >
        <header className="flex shrink-0 items-center justify-between gap-3 border-b border-line
          bg-cream px-5 py-4">
          <div>
            <p className="font-display text-base font-semibold text-ink">Tu carrito</p>
            <p className="text-sm text-ink-muted">
              {itemsQuantity} {itemsQuantity === 1 ? "producto" : "productos"}
            </p>
          </div>
          <button
            type="button"
            aria-label="Cerrar carrito"
            onClick={hiddeCart}
            className="grid h-9 w-9 place-items-center rounded-xl text-ink-soft transition-colors
              hover:bg-base-100 hover:text-brand"
          >
            <IoCloseOutline size={24} />
          </button>
        </header>

        <ul className="flex-1 overflow-y-auto">
          {!cartItems.length ? (
            <li className="flex flex-col items-center gap-3 px-5 py-14 text-center">
              <img src="/images/box-empty.png" alt="" width={100} />
              <p className="text-ink-soft">No tienes productos en tu carrito</p>
            </li>
          ) : (
            cartItems.map((item, index) => (
              <CartModalItem key={item.id} item={item} length={cartItems.length} index={index} />
            ))
          )}
        </ul>

        <footer className="shrink-0 border-t border-line p-5">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-ink-soft">Subtotal</span>
            <span className="font-display text-xl font-semibold text-ink">
              {formatPrice(totalPrice)}
            </span>
          </div>

          <button
            type="button"
            onClick={goCart}
            disabled={!itemsQuantity}
            className="btn h-12 w-full rounded-xl border-0 bg-brand text-primary-content shadow-none
              hover:bg-brand-dark disabled:bg-base-300 disabled:text-ink-muted"
          >
            Ver carrito y pagar
          </button>

          {itemsQuantity > 0 && (
            <div className="mt-3 flex justify-center">
              <ClearButton fontSize={14} clear={clear} />
            </div>
          )}
        </footer>
      </aside>
    </div>,
    document.body,
  );
}
