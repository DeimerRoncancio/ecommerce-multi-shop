import { Link } from "react-router";
import { FiArrowRight, FiRefreshCw, FiTruck } from "react-icons/fi";
import { ProductItemType } from "../../../../products/types/product";
import { slugify } from "../../../utilities/slugify";
import { categoryStyle } from "../../../utilities/category-color";
import { formatPrice } from "../../../utilities/format-price";
import ProductItem from "./ProductItem";

type CategoriesModalProps = {
  categoryName: string;
  products: ProductItemType[];
  showModal: boolean;
  changeVisibility: (isVisible: boolean) => void;
};

const MAX_ITEMS = 4;

export default function CategoriesModal({
  categoryName,
  products,
  showModal,
  changeVisibility,
}: CategoriesModalProps) {
  const href = `/#${slugify(categoryName)}`;
  const shown = products.slice(0, MAX_ITEMS);
  const fromPrice = products.length ? Math.min(...products.map(product => product.price)) : null;
  const countLabel = `${products.length} ${products.length === 1 ? "producto" : "productos"}`;

  return (
    <div
      className={`${!showModal ? "invisible -translate-y-2 opacity-0" : "visible opacity-100"} absolute
        inset-x-0 top-full mx-auto hidden w-full max-w-7xl px-8 transition-all duration-150 lg:block`}
      onMouseEnter={() => changeVisibility(true)}
      onMouseLeave={() => changeVisibility(false)}
    >
      <div
        style={categoryStyle(categoryName)}
        className="grid grid-cols-[17rem_1fr] overflow-hidden border border-t-4 border-line border-t-(--cat) bg-base-100
          shadow-card-hover"
      >
        <aside className="flex flex-col gap-4 bg-(--cat-soft) p-6">
          <div>
            <p className="text-xs font-bold uppercase tracking-wider text-ink-muted">Categoría</p>
            <p className="text-3xl font-extrabold leading-tight text-(--cat)">{categoryName}</p>
            <p className="mt-1 text-sm font-semibold text-ink-soft">{countLabel}</p>
          </div>

          {fromPrice !== null && (
            <p className="text-sm text-ink-soft">
              Desde <b className="bg-sun px-1.5 py-0.5 text-base font-extrabold text-ink">{formatPrice(fromPrice)}</b>
            </p>
          )}

          <ul className="flex flex-col gap-2 text-sm font-semibold text-ink-soft">
            <li className="flex items-center gap-2">
              <FiTruck size={16} className="text-(--cat)" />
              Envío gratis a todo el país
            </li>
            <li className="flex items-center gap-2">
              <FiRefreshCw size={15} className="text-(--cat)" />
              30 días para devolver
            </li>
          </ul>

          {products.length > 0 && (
            <Link
              to={href}
              onClick={() => changeVisibility(false)}
              className="mt-auto inline-flex h-11 items-center justify-center gap-1.5 rounded-full bg-(--cat) px-5
                text-sm font-bold text-white transition-colors hover:bg-ink"
            >
              Ver todo en {categoryName}
              <FiArrowRight size={16} />
            </Link>
          )}
        </aside>

        {!products.length ? (
          <div className="flex flex-col items-center justify-center gap-4 p-10">
            <img src="/images/list-empty.png" alt="" width={110} />
            <p className="text-lg font-bold text-ink-muted">Aún no hay productos en esta categoría</p>
          </div>
        ) : (
          <ul className="grid grid-cols-4 gap-3 p-5">
            {shown.map(product => (
              <ProductItem key={product.id} product={product} closeModal={changeVisibility} />
            ))}

            {shown.length < MAX_ITEMS && (
              <li style={{ gridColumn: `span ${MAX_ITEMS - shown.length}` }}>
                <Link
                  to={href}
                  onClick={() => changeVisibility(false)}
                  className="group flex h-full min-h-40 flex-col items-center justify-center gap-2 border-2 border-dashed
                    border-(--cat) bg-(--cat-soft) p-4 text-center transition-colors hover:bg-base-100"
                >
                  <span className="grid h-11 w-11 place-items-center rounded-full bg-(--cat) text-white
                    transition-transform group-hover:translate-x-1">
                    <FiArrowRight size={20} />
                  </span>
                  <span className="font-extrabold text-(--cat)">Ver {countLabel}</span>
                  <span className="text-xs text-ink-muted">con envío gratis</span>
                </Link>
              </li>
            )}

            {products.length > MAX_ITEMS && (
              <li className="col-span-4 -mb-1 text-right">
                <Link
                  to={href}
                  onClick={() => changeVisibility(false)}
                  className="text-sm font-bold text-(--cat) hover:underline"
                >
                  Y {products.length - MAX_ITEMS} más en {categoryName} →
                </Link>
              </li>
            )}
          </ul>
        )}
      </div>
    </div>
  );
}
