import { FiSliders, FiX } from "react-icons/fi";
import { CATALOG_PAGE_SIZE, catalogSorts } from "../../constants/catalog.helper";
import { CatalogFilters } from "../../types/catalog";
import { categoryStyle } from "../../../shared/utilities/category-color";
import { formatPrice } from "../../../shared/utilities/format-price";
import { countActiveFilters, emptyFilters } from "../../utilities/catalog-filters";

type CatalogToolbarProps = {
  filters: CatalogFilters;
  total: number;
  shown: number;
  onChange: (changes: Partial<CatalogFilters>) => void;
  onOpenFilters: () => void;
};

const priceLabel = (min: number | null, max: number | null) => {
  if (min !== null && max !== null) return `${formatPrice(min)} a ${formatPrice(max)}`;
  if (min !== null) return `Desde ${formatPrice(min)}`;
  return `Hasta ${formatPrice(max ?? 0)}`;
};

const chipClass = "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-bold transition-colors";

export default function CatalogToolbar({ filters, total, shown, onChange, onOpenFilters }: CatalogToolbarProps) {
  const active = countActiveFilters(filters);
  const first = (filters.page - 1) * CATALOG_PAGE_SIZE + 1;

  return (
    <div className="flex flex-col gap-3">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm text-ink-muted">
          {total ? (
            <>
              Mostrando{" "}
              <b className="text-ink">
                {first}–{first + shown - 1}
              </b>{" "}
              de <b className="text-ink">{total}</b> {total === 1 ? "producto" : "productos"}
            </>
          ) : (
            "Sin resultados"
          )}
        </p>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={onOpenFilters}
            className="flex h-10 items-center gap-2 rounded-full border border-line px-4 text-sm font-bold text-ink
              transition-colors hover:border-ink lg:hidden"
          >
            <FiSliders size={15} />
            Filtros
            {active > 0 && (
              <span className="grid h-5 min-w-5 place-items-center rounded-full bg-brand px-1 text-xs text-white">
                {active}
              </span>
            )}
          </button>

          <label className="flex h-10 items-center gap-2 rounded-full border border-line pl-4 pr-2 text-sm">
            <span className="hidden text-ink-muted sm:inline">Ordenar:</span>
            <select
              value={filters.sort}
              onChange={event => onChange({ sort: event.target.value })}
              className="h-full cursor-pointer bg-transparent font-bold text-ink outline-none"
            >
              {catalogSorts.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      {active > 0 && (
        <ul className="flex flex-wrap items-center gap-2">
          {filters.text && (
            <li>
              <button
                type="button"
                onClick={() => onChange({ text: "" })}
                className={`${chipClass} border-ink bg-ink text-white hover:bg-ink-soft`}
              >
                "{filters.text}" <FiX size={13} />
              </button>
            </li>
          )}
          {filters.categories.map(name => (
            <li key={name} style={categoryStyle(name)}>
              <button
                type="button"
                onClick={() => onChange({ categories: filters.categories.filter(category => category !== name) })}
                className={`${chipClass} border-(--cat) bg-(--cat-soft) text-(--cat) hover:bg-(--cat) hover:text-white`}
              >
                {name} <FiX size={13} />
              </button>
            </li>
          ))}
          {(filters.min !== null || filters.max !== null) && (
            <li>
              <button
                type="button"
                onClick={() => onChange({ min: null, max: null })}
                className={`${chipClass} border-brand bg-brand-soft text-brand hover:bg-brand hover:text-white`}
              >
                {priceLabel(filters.min, filters.max)} <FiX size={13} />
              </button>
            </li>
          )}
          <li>
            <button
              type="button"
              onClick={() => onChange(emptyFilters(filters))}
              className="px-1 text-xs font-bold text-ink-muted underline underline-offset-4 hover:text-brand"
            >
              Limpiar todo
            </button>
          </li>
        </ul>
      )}
    </div>
  );
}
