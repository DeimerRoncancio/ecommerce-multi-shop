import { FiCheckCircle, FiTruck } from "react-icons/fi";
import Rating from "../../wishlist/components/Rating";
import { ProductsFromApiType, ProductVariantType } from "../types/product";
import Variants from "./variants/Variants";
import PriceTag from "../../shared/ui/PriceTag";
import { categoryStyle } from "../../shared/utilities/category-color";

type ProductInfoProps = {
  product: ProductsFromApiType;
  variants?: ProductVariantType[];
};

export default function ProductInfo({ product, variants }: ProductInfoProps) {
  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <ul className="flex flex-wrap gap-2">
            {product.categories.map(cat => (
              <li
                key={cat.categoryName}
                style={categoryStyle(cat.categoryName)}
                className="bg-(--cat) px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-white"
              >
                {cat.categoryName}
              </li>
            ))}
          </ul>
          <Rating index={4} />
        </div>

        <h1 className="text-3xl font-extrabold leading-tight text-ink lg:text-4xl">{product.productName}</h1>

        <div className="flex flex-wrap items-end gap-x-5 gap-y-3">
          <PriceTag price={product.price} label="Precio" size="lg" />
          <ul className="flex flex-col gap-1 pb-1 text-sm font-bold">
            <li className="flex items-center gap-1.5 text-success">
              <FiCheckCircle size={15} />
              En stock · listo para despacho
            </li>
            <li className="flex items-center gap-1.5 text-(--cat,var(--color-brand))">
              <FiTruck size={15} />
              Envío gratis a todo el país
            </li>
          </ul>
        </div>
      </div>

      <div className="flex flex-col gap-1.5 border-t border-line pt-5">
        <p className="text-sm font-extrabold uppercase tracking-wide text-ink">Descripción</p>
        <p className="leading-relaxed text-ink-soft">{product.description}</p>
      </div>

      <Variants variants={variants} />
    </>
  );
}
