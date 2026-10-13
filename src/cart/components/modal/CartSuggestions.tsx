import { useEffect, useState } from "react";
import { FiPlus } from "react-icons/fi";
import { Link } from "react-router";
import useCart from "../../hooks/useCart";
import { mapApiToProducts } from "../../../products/mappers/products.mapper";
import { getSuggestions } from "../../../products/services/products.api";
import { ProductTypes } from "../../../products/types/product";
import ProductImage from "../../../shared/ui/ProductImage";
import { categoryStyle } from "../../../shared/utilities/category-color";
import { formatPrice } from "../../../shared/utilities/format-price";

type Props = {
  visible: boolean;
  onNavigate: () => void;
};

const LIMIT = 3;

export default function CartSuggestions({ visible, onNavigate }: Props) {
  const { cartItems, handleAddItem } = useCart();
  const [products, setProducts] = useState<ProductTypes[]>([]);

  const inCart = new Set(cartItems.map(item => item.id));
  const categories = [...new Set(cartItems.flatMap(item => item.category ?? []))].join(",");
  const exclude = cartItems.map(item => item.id).join(",");

  useEffect(() => {
    if (!visible) return;

    let current = true;

    getSuggestions({ categories, exclude, size: LIMIT, sort: "price,desc" })
      .then(found => current && setProducts(found.products.map(mapApiToProducts)))
      .catch(() => current && setProducts([]));

    return () => {
      current = false;
    };
  }, [visible]);

  const suggestions = products.filter(product => !inCart.has(product.id));

  if (!suggestions.length) return null;

  return (
    <section className="px-4 pb-4 pt-5">
      <h3 className="mb-2.5 text-xs font-extrabold uppercase tracking-[0.08em] text-brand">
        {cartItems.length ? "Completa tu pedido" : "Para empezar"}
      </h3>
      <ul className="flex flex-col gap-2">
        {suggestions.map(product => {
          const category = product.categories[0]?.categoryName;
          return (
            <li
              key={product.id}
              style={categoryStyle(category)}
              className="flex items-center gap-3 rounded-xl border border-line p-2 transition-colors
                hover:border-(--cat,var(--color-brand))"
            >
              <Link
                to={`/product/${product.id}`}
                onClick={onNavigate}
                className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-(--cat-soft,var(--color-cream)) p-1"
                aria-label={`Ver ${product.name}`}
              >
                <ProductImage
                  src={product.images[0]?.imageUrl}
                  width={120}
                  alt={product.name}
                  cutoutClassName="mix-blend-darken"
                />
              </Link>
              <div className="min-w-0 flex-1 leading-tight">
                <Link
                  to={`/product/${product.id}`}
                  onClick={onNavigate}
                  className="line-clamp-1 text-sm font-bold text-ink hover:text-(--cat,var(--color-brand))"
                >
                  {product.name}
                </Link>
                <p className="text-sm font-extrabold text-ink">{formatPrice(product.price)}</p>
              </div>
              <button
                type="button"
                onClick={() => handleAddItem(product)}
                aria-label={`Agregar ${product.name} al carrito`}
                className="flex h-8 shrink-0 items-center gap-1 rounded-full bg-(--cat,var(--color-brand)) px-3 text-xs
                  font-bold text-white transition-colors hover:bg-ink"
              >
                <FiPlus size={13} strokeWidth={3} />
                Agregar
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
