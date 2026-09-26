import { Link, useLocation } from "react-router";
import { FiChevronRight } from "react-icons/fi";
import Container from "../../shared/ui/Container";

export default function Breadcrumb({
  namePage,
  isProduct,
}: {
  namePage: string;
  isProduct?: boolean;
}) {
  const location = useLocation();
  const segments = location.pathname.split("/").filter(Boolean);

  const crumbs = [
    { label: "Inicio", to: "/" },
    ...segments.map((segment, index) => ({
      label: index === segments.length - 1 && isProduct ? namePage : segment,
      to: `/${segments.slice(0, index + 1).join("/")}`,
    })),
  ];

  return (
    <div className="border-b border-line bg-brand-soft">
      <Container className="flex flex-wrap items-center justify-between gap-2 py-5">
        <h1 className="font-display text-2xl font-semibold text-ink">{namePage}</h1>

        <nav aria-label="Ruta de navegación">
          <ol className="flex flex-wrap items-center gap-1 text-sm text-ink-muted">
            {crumbs.map((crumb, index) => {
              const isLast = index === crumbs.length - 1;

              return (
                <li key={crumb.to} className="flex items-center gap-1">
                  {index > 0 && <FiChevronRight size={14} className="opacity-60" />}
                  {isLast ? (
                    <span className="max-w-[220px] truncate font-medium capitalize text-ink">
                      {crumb.label}
                    </span>
                  ) : (
                    <Link to={crumb.to} className="capitalize transition-colors hover:text-brand">
                      {crumb.label}
                    </Link>
                  )}
                </li>
              );
            })}
          </ol>
        </nav>
      </Container>
    </div>
  );
}
