import { Link } from "react-router";
import { FiChevronRight, FiTruck } from "react-icons/fi";
import { CatalogFilters } from "../../types/catalog";
import { ProductTypes } from "../../types/product";
import ProductImage from "../../../shared/ui/ProductImage";
import { categoryColor, categoryStyle } from "../../../shared/utilities/category-color";
import { formatPrice } from "../../../shared/utilities/format-price";

type CatalogHeaderProps = {
  filters: CatalogFilters;
  total: number;
  minPrice: number | null;
  products: ProductTypes[];
  categories: { name: string; productCount: number }[];
  onChange: (changes: Partial<CatalogFilters>) => void;
};

const photoCards = ["right-52 top-10 -rotate-6 z-0", "right-24 top-4 rotate-3 z-10", "right-0 top-14 rotate-6 z-20"];

const titleOf = ({ text, categories }: CatalogFilters) => {
  if (text) return { lead: "Resultados para", accent: `"${text}"` };
  if (categories.length === 1) return { lead: "", accent: categories[0] };
  return { lead: "Todo el", accent: "catálogo" };
};

export default function CatalogHeader({
  filters,
  total,
  minPrice,
  products,
  categories,
  onChange,
}: CatalogHeaderProps) {
  const single = !filters.text && filters.categories.length === 1 ? filters.categories[0] : undefined;
  const photos = products.filter(({ images }) => images[0]).slice(0, photoCards.length);
  const title = titleOf(filters);

  return (
    <section
      style={categoryStyle(single)}
      className="relative overflow-hidden rounded-2xl bg-(--cat-soft,var(--color-brand-soft)) p-6 sm:p-8"
    >
      <span
        aria-hidden
        className="absolute -right-16 -top-24 h-72 w-72 rounded-full bg-(--cat,var(--color-brand)) opacity-20"
      />
      <span
        aria-hidden
        className="absolute -bottom-20 right-80 h-40 w-40 rounded-full bg-(--cat,var(--color-brand)) opacity-20"
      />

      <div className="relative flex items-center justify-between gap-6">
        <div className="min-w-0">
          <nav aria-label="Ruta de navegación">
            <ol className="flex flex-wrap items-center gap-1 text-sm text-ink-muted">
              <li>
                <Link to="/" className="transition-colors hover:text-(--cat,var(--color-brand))">
                  Inicio
                </Link>
              </li>
              <li className="flex items-center gap-1">
                <FiChevronRight size={14} className="opacity-60" />
                {single ? (
                  <button
                    type="button"
                    onClick={() => onChange({ categories: [] })}
                    className="transition-colors hover:text-(--cat,var(--color-brand))"
                  >
                    Catálogo
                  </button>
                ) : (
                  <span className="font-semibold text-ink">Catálogo</span>
                )}
              </li>
              {single && (
                <li className="flex items-center gap-1">
                  <FiChevronRight size={14} className="opacity-60" />
                  <span className="font-semibold text-(--cat)">{single}</span>
                </li>
              )}
            </ol>
          </nav>

          <h1 className="mt-3 text-3xl font-extrabold leading-tight text-ink sm:text-5xl">
            {title.lead && `${title.lead} `}
            <span className="text-(--cat,var(--color-brand))">{title.accent}</span>
          </h1>

          <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
            <span className="rounded-full bg-(--cat,var(--color-brand)) px-3 py-1 font-bold text-white">
              {total} {total === 1 ? "producto" : "productos"}
            </span>
            {minPrice !== null && total > 0 && (
              <span className="bg-sun px-2.5 py-1 text-ink">
                Desde <b className="font-extrabold">{formatPrice(minPrice)}</b>
              </span>
            )}
            <span className="flex items-center gap-1.5 rounded-full bg-base-100 px-3 py-1 font-bold text-success">
              <FiTruck size={14} />
              Envío gratis
            </span>
          </div>
        </div>
        <div aria-hidden className="relative hidden h-44 w-80 shrink-0 lg:block">
          {photos.map(({ id, images, categories: productCategories }, index) => (
            <span
              key={id}
              style={categoryStyle(productCategories[0]?.categoryName)}
              className={`absolute block h-32 w-32 border-b-4 border-(--cat,var(--color-brand)) bg-white p-2.5
                shadow-card-hover ${photoCards[index]}`}
            >
              <ProductImage src={images[0].imageUrl} width={300} alt="" />
            </span>
          ))}
        </div>
      </div>

      <ul className="relative -mx-6 mt-7 flex gap-2 overflow-x-auto px-6 pb-1 sm:-mx-8 sm:px-8 lg:flex-wrap">
        <li className="shrink-0">
          <button
            type="button"
            onClick={() => onChange({ categories: [] })}
            className={`h-10 rounded-full px-5 text-sm font-bold transition-colors ${
              filters.categories.length ? "bg-base-100 text-ink hover:bg-ink hover:text-white" : "bg-ink text-white"
            }`}
          >
            Todo
          </button>
        </li>
        {categories.map(({ name, productCount }) => {
          const active = filters.categories.includes(name);

          return (
            <li key={name} style={categoryStyle(name)} className="shrink-0">
              <button
                type="button"
                onClick={() => onChange({ categories: active && filters.categories.length === 1 ? [] : [name] })}
                className={`flex h-10 items-center gap-2 rounded-full px-4 text-sm font-bold transition-colors ${
                  active ? "bg-(--cat) text-white" : "bg-base-100 text-ink hover:text-(--cat)"
                }`}
              >
                <span className={`h-2.5 w-2.5 rounded-full ${active ? "bg-white" : "bg-(--cat)"}`} />
                {name}
                <span className={`text-xs ${active ? "text-white/75" : "text-ink-muted"}`}>{productCount}</span>
              </button>
            </li>
          );
        })}
      </ul>

      <div aria-hidden className="absolute inset-x-0 bottom-0 flex h-1.5">
        <span className="flex-[4] bg-brand" />
        {categories.map(({ name }) => (
          <span key={name} className="flex-1" style={{ backgroundColor: categoryColor(name).strong }} />
        ))}
      </div>
    </section>
  );
}
