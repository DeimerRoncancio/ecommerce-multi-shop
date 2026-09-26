import { FaCheckCircle } from "react-icons/fa";
import Rating from "../../wishlist/components/Rating";
import { ProductsFromApiType, ProductVariantType } from "../types/product";
import Variants from "./variants/Variants";
import { formatPrice } from "../../shared/utilities/format-price";

type ProductInfoProps = {
  product: ProductsFromApiType;
  variants?: ProductVariantType[];
};

export default function ProductInfo({ product, variants }: ProductInfoProps) {
  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <ul className="flex flex-wrap gap-2">
            {product.categories.map(cat => (
              <li
                key={cat.categoryName}
                className="rounded-full bg-brand-soft px-3 py-1 text-[11px] font-medium
                  uppercase tracking-[0.08em] text-secondary-content"
              >
                {cat.categoryName}
              </li>
            ))}
          </ul>
          <Rating index={4} />
        </div>

        <h1 className="font-display text-3xl font-bold leading-tight text-ink lg:text-4xl">
          {product.productName}
        </h1>

        <p className="font-display text-3xl font-semibold text-brand">
          {formatPrice(product.price)}
        </p>
      </div>

      <div className="flex items-center gap-2 text-sm">
        <FaCheckCircle className="text-success" />
        <span className="font-medium text-ink">En stock</span>
        <span className="text-ink-muted">· Listo para despacho</span>
      </div>

      <div className="flex flex-col gap-1.5 border-t border-line pt-5">
        <p className="font-medium text-ink">Descripción</p>
        <p className="leading-relaxed text-ink-soft">{product.description}</p>
      </div>

      <Variants variants={variants} />
    </>
  );
}
