import { ReactNode } from "react";
import { Link } from "react-router";
import { FiArrowRight } from "react-icons/fi";
import Container from "../../shared/ui/Container";
import { categoryStyle } from "../../shared/utilities/category-color";
import { catalogLink } from "../../products/utilities/catalog-filters";

type CatalogSectionProps = {
  id: string;
  title: string;
  subtitle?: string;
  category?: string;
  children: ReactNode;
};

export default function CatalogSection({ id, title, subtitle, category, children }: CatalogSectionProps) {
  return (
    <Container as="section">
      <div id={id} className="scroll-mt-nav" />
      <div style={categoryStyle(category)} className="mb-5 flex flex-wrap items-end justify-between gap-x-6 gap-y-1">
        <div>
          <h2
            className="border-l-[6px] border-(--cat,var(--color-brand)) pl-3 text-2xl font-extrabold text-ink
            sm:text-3xl"
          >
            {title}
          </h2>
          {subtitle && <p className="mt-1 pl-4.5 font-semibold text-(--cat,var(--color-ink-soft))">{subtitle}</p>}
        </div>
        <Link
          to={catalogLink({ category })}
          className="inline-flex items-center gap-1.5 text-sm font-bold text-brand hover:underline"
        >
          {category ? `Ver todo en ${category}` : "Ver catálogo"}
          <FiArrowRight size={16} />
        </Link>
      </div>
      {children}
    </Container>
  );
}
