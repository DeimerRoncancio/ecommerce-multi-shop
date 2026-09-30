import { Link, useLocation } from "react-router";
import { FiChevronRight } from "react-icons/fi";
import Container from "../../shared/ui/Container";
import { breadcrumbLabels } from "../constants/profile.helper";

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
      label: index === segments.length - 1 && isProduct
        ? namePage
        : breadcrumbLabels[segment]?.label ?? segment,
      to: breadcrumbLabels[segment]?.to ?? `/${segments.slice(0, index + 1).join("/")}`,
    })),
  ];

  return (
    <div className="border-b border-line bg-base-100">
      <Container className="flex flex-wrap items-center justify-between gap-2 py-4">
        <h1 className="text-xl font-bold text-ink lg:text-2xl">{namePage}</h1>

        <nav aria-label="Ruta de navegación">
          <ol className="flex flex-wrap items-center gap-1 text-sm text-ink-muted">
            {crumbs.map((crumb, index) => {
              const isLast = index === crumbs.length - 1;

              return (
                <li key={`${index}-${crumb.to}`} className="flex items-center gap-1">
                  {index > 0 && <FiChevronRight size={14} className="opacity-60" />}
                  {isLast ? (
                    <span className="max-w-55 truncate font-semibold text-ink first-letter:uppercase">
                      {crumb.label}
                    </span>
                  ) : (
                    <Link to={crumb.to} className="transition-colors first-letter:uppercase hover:text-brand">
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
