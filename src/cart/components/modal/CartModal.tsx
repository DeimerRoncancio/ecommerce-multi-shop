import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { IoCloseOutline } from "react-icons/io5";
import { FiArrowRight, FiLock, FiShoppingCart } from "react-icons/fi";
import { useLoaderData, useNavigate } from "react-router";
import useCart from "../../hooks/useCart";
import CartModalItem from "./CartModalItem";
import CartSuggestions from "./CartSuggestions";
import ClearButton from "../ClearButton";
import { formatPrice } from "../../../shared/utilities/format-price";
import { ProductTypes } from "../../../products/types/product";

type CartModalProps = {
  viewCart: boolean;
  hiddeCart: () => void;
};

export default function CartModal({ viewCart, hiddeCart }: CartModalProps) {
  const { cartItems, totalPrice, itemsQuantity, clear } = useCart();
  const navigate = useNavigate();
  const products = (useLoaderData()?.products ?? []) as ProductTypes[];
  const catalog = new Map(products.map(product => [product.id, product]));
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
        <header className="flex shrink-0 items-center justify-between gap-3 border-b border-t-4 border-line
          border-t-brand px-4 py-2.5">
          <div className="flex items-center gap-2.5">
            <span className="grid h-8 w-8 place-items-center rounded-full bg-brand text-white">
              <FiShoppingCart size={15} />
            </span>
            <div className="leading-tight">
              <p className="font-extrabold text-ink">Tu carrito</p>
              <p className="text-xs font-semibold text-brand">
                {itemsQuantity} {itemsQuantity === 1 ? "producto" : "productos"}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-1 whitespace-nowrap">
            {itemsQuantity > 0 && <ClearButton fontSize={13} clear={clear} />}
            <button
              type="button"
              aria-label="Cerrar carrito"
              onClick={hiddeCart}
              className="grid h-9 w-9 place-items-center rounded-full text-ink-soft transition-colors
                hover:bg-brand-soft hover:text-brand"
            >
              <IoCloseOutline size={24} />
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto">
          <ul>
            {!cartItems.length ? (
              <li className="flex flex-col items-center gap-3 px-5 pb-4 pt-10 text-center">
                <img src="/images/box-empty.png" alt="" width={100} />
                <p className="font-bold text-ink">Tu carrito está vacío</p>
                <p className="text-sm text-ink-soft">Agrega productos desde el catálogo y aparecerán aquí.</p>
                <button
                  type="button"
                  onClick={hiddeCart}
                  className="mt-2 inline-flex h-10 items-center gap-1.5 rounded-full bg-ink px-5 text-sm font-bold
                    text-white transition-colors hover:bg-brand"
                >
                  Seguir comprando
                </button>
              </li>
            ) : (
              cartItems.map(item => {
                const product = catalog.get(item.id);
                return (
                  <CartModalItem
                    key={item.id}
                    item={item}
                    image={product?.images[0]?.imageUrl}
                    category={product?.categories[0]?.categoryName}
                    onNavigate={hiddeCart}
                  />
                );
              })
            )}
          </ul>
          <CartSuggestions products={products} onNavigate={hiddeCart} />
        </div>

        <footer className="shrink-0 border-t border-brand/15 bg-brand-soft/70 px-4 pb-3 pt-3">
          <div className="mb-2.5 flex items-end justify-between gap-3">
            <div className="leading-tight">
              <p className="font-extrabold text-ink">Total</p>
              <p className="text-xs font-semibold text-success">Envío gratis incluido</p>
            </div>
            <p className="text-2xl font-extrabold leading-none text-ink">{formatPrice(totalPrice)}</p>
          </div>

          <button
            type="button"
            onClick={goCart}
            disabled={!itemsQuantity}
            className="flex h-11 w-full items-center justify-center gap-2 rounded-full bg-brand font-bold text-white
              transition-colors hover:bg-ink disabled:bg-base-300 disabled:text-ink-muted"
          >
            Ver carrito y pagar
            <FiArrowRight size={17} />
          </button>
          <div className="mt-2 flex items-center justify-between text-xs">
            <button
              type="button"
              onClick={hiddeCart}
              className="font-bold text-ink-soft underline-offset-4 transition-colors hover:text-brand hover:underline"
            >
              ← Seguir comprando
            </button>
            <span className="flex items-center gap-1 font-semibold text-ink-muted">
              <FiLock size={12} className="text-success" />
              Pago seguro
            </span>
          </div>
        </footer>
      </aside>
    </div>,
    document.body,
  );
}
