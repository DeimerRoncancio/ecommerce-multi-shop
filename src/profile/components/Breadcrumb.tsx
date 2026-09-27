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
    <div className="brand-block relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-20 h-56 w-56 rounded-full bg-white/10"
      />
      <Container className="relative flex flex-wrap items-center justify-between gap-2 py-6">
        <h1 className="font-display text-2xl font-bold text-white lg:text-3xl">{namePage}</h1>

        <nav aria-label="Ruta de navegación">
          <ol className="flex flex-wrap items-center gap-1 text-sm text-white/70">
            {crumbs.map((crumb, index) => {
              const isLast = index === crumbs.length - 1;

              return (
                <li key={crumb.to} className="flex items-center gap-1">
                  {index > 0 && <FiChevronRight size={14} className="opacity-60" />}
                  {isLast ? (
                    <span className="max-w-55 truncate font-semibold capitalize text-white">
                      {crumb.label}
                    </span>
                  ) : (
                    <Link to={crumb.to} className="capitalize transition-colors hover:text-white">
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
