import { FiCheck } from "react-icons/fi";
import PriceFilter from "./PriceFilter";
import { CatalogFilters as Filters, SearchFacets } from "../../types/catalog";
import { categoryStyle } from "../../../shared/utilities/category-color";

type CatalogFiltersProps = {
  filters: Filters;
  facets: SearchFacets;
  onChange: (changes: Partial<Filters>) => void;
};

export default function CatalogFilters({ filters, facets, onChange }: CatalogFiltersProps) {
  const missing = filters.categories
    .filter(name => !facets.categories.some(({ categoryName }) => categoryName === name))
    .map(categoryName => ({ categoryName, productCount: 0 }));
  const categories = [...facets.categories, ...missing];

  const toggleCategory = (name: string) => {
    const selected = filters.categories.includes(name);
    onChange({
      categories: selected ? filters.categories.filter(category => category !== name) : [...filters.categories, name],
    });
  };

  return (
    <div className="flex flex-col gap-7">
      {categories.length > 0 && (
        <section>
          <h2 className="mb-3 text-xs font-extrabold uppercase tracking-wider text-ink">Categorías</h2>
          <ul className="flex flex-col gap-1">
            {categories.map(({ categoryName, productCount }) => {
              const checked = filters.categories.includes(categoryName);

              return (
                <li key={categoryName} style={categoryStyle(categoryName)}>
                  <label
                    className={`flex cursor-pointer items-center gap-2.5 rounded-lg px-2 py-1.5 text-sm transition-colors ${
                      checked ? "bg-(--cat-soft)" : "hover:bg-cream"
                    }`}
                  >
                    <input
                      type="checkbox"
                      checked={checked}
                      onChange={() => toggleCategory(categoryName)}
                      className="peer sr-only"
                    />
                    <span
                      className={`grid h-4.5 w-4.5 shrink-0 place-items-center rounded border-2 transition-colors
                      peer-focus-visible:ring-2 peer-focus-visible:ring-(--cat)/40 ${
                        checked ? "border-(--cat) bg-(--cat) text-white" : "border-line bg-base-100"
                      }`}
                    >
                      {checked && <FiCheck size={12} strokeWidth={4} />}
                    </span>
                    <span className={`flex-1 ${checked ? "font-bold text-(--cat)" : "text-ink-soft"}`}>
                      {categoryName}
                    </span>
                    <span className="rounded-full bg-cream px-1.5 text-xs font-bold text-ink-muted">
                      {productCount}
                    </span>
                  </label>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      <section>
        <h2 className="mb-3 text-xs font-extrabold uppercase tracking-wider text-ink">Precio</h2>
        <PriceFilter
          key={`${filters.min}-${filters.max}`}
          min={filters.min}
          max={filters.max}
          bounds={{ min: facets.minPrice, max: facets.maxPrice }}
          onChange={range => onChange(range)}
        />
      </section>
    </div>
  );
}
