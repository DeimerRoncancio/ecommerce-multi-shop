import { Link } from "react-router";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { CatalogFilters } from "../../types/catalog";
import { toSearchParams } from "../../utilities/catalog-filters";

type CatalogPaginationProps = {
  filters: CatalogFilters;
  pages: number;
};

const arrowClass =
  "grid h-10 w-10 place-items-center rounded-full border border-line text-ink transition-colors hover:border-ink";

const visiblePages = (current: number, pages: number) => {
  const wanted = [1, current - 1, current, current + 1, pages].filter(page => page >= 1 && page <= pages);
  return [...new Set(wanted)].sort((a, b) => a - b);
};

export default function CatalogPagination({ filters, pages }: CatalogPaginationProps) {
  if (pages <= 1) return null;

  const current = filters.page;
  const linkTo = (page: number) => toSearchParams({ ...filters, page });

  return (
    <nav aria-label="Páginas" className="flex items-center justify-center gap-1.5">
      {current > 1 ? (
        <Link to={linkTo(current - 1)} aria-label="Página anterior" className={arrowClass}>
          <FiChevronLeft size={18} />
        </Link>
      ) : (
        <span className={`${arrowClass} pointer-events-none opacity-40`}>
          <FiChevronLeft size={18} />
        </span>
      )}

      {visiblePages(current, pages).map((page, index, list) => (
        <span key={page} className="flex items-center gap-1.5">
          {index > 0 && page - list[index - 1] > 1 && <span className="px-1 text-ink-muted">…</span>}
          <Link
            to={linkTo(page)}
            aria-current={page === current ? "page" : undefined}
            className={`grid h-10 min-w-10 place-items-center rounded-full px-2 text-sm font-bold transition-colors ${
              page === current ? "bg-brand text-white" : "text-ink hover:bg-cream"
            }`}
          >
            {page}
          </Link>
        </span>
      ))}

      {current < pages ? (
        <Link to={linkTo(current + 1)} aria-label="Página siguiente" className={arrowClass}>
          <FiChevronRight size={18} />
        </Link>
      ) : (
        <span className={`${arrowClass} pointer-events-none opacity-40`}>
          <FiChevronRight size={18} />
        </span>
      )}
    </nav>
  );
}
