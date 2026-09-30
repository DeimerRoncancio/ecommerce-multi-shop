import { useState } from "react";
import { Link, useLoaderData, useNavigate } from "react-router";
import { FiArrowRight, FiSearch, FiX } from "react-icons/fi";
import { ProductTypes } from "../../../products/types/product";
import ProductImage from "../../ui/ProductImage";
import { categoryStyle } from "../../utilities/category-color";
import { formatPrice } from "../../utilities/format-price";
import { slugify } from "../../utilities/slugify";

const MAX_RESULTS = 6;

const normalize = (value: string) => value.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();

export default function Search() {
  const products = ((useLoaderData() as { products?: ProductTypes[] } | undefined)?.products ?? []);
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState(0);

  const term = normalize(query.trim());
  const categories = [...new Set(products.flatMap(product => product.categories.map(c => c.categoryName)))];
  const matchedCategories = term ? categories.filter(name => normalize(name).includes(term)) : categories;
  const results = term
    ? products
        .filter(product =>
          normalize(product.name).includes(term) ||
          product.categories.some(({ categoryName }) => normalize(categoryName).includes(term)),
        )
        .slice(0, MAX_RESULTS)
    : [];

  const close = () => {
    setOpen(false);
    setActive(0);
  };

  const goTo = (path: string) => {
    navigate(path);
    setQuery("");
    close();
  };

  const onKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") return close();
    if (!results.length) return;
    if (event.key === "ArrowDown") {
      event.preventDefault();
      setOpen(true);
      setActive((active + 1) % results.length);
    }
    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActive((active - 1 + results.length) % results.length);
    }
  };

  const onSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (results[active]) goTo(`/product/${results[active].id}`);
    else if (matchedCategories.length && term) goTo(`/#${slugify(matchedCategories[0])}`);
  };

  const showPanel = open && (term ? true : categories.length > 0);

  return (
    <div
      className="relative w-full"
      onBlur={event => !event.currentTarget.contains(event.relatedTarget) && close()}
    >
      <form
        role="search"
        onSubmit={onSubmit}
        className="flex h-11 w-full items-center gap-2 rounded-full bg-base-100 pe-1 ps-4 text-ink ring-white/40
          transition-shadow focus-within:ring-4 lg:h-12"
      >
        <FiSearch size={18} className="shrink-0 text-ink-muted" aria-hidden />
        <input
          type="search"
          value={query}
          onChange={event => {
            setQuery(event.target.value);
            setActive(0);
            setOpen(true);
          }}
          onFocus={() => setOpen(true)}
          onKeyDown={onKeyDown}
          role="combobox"
          aria-expanded={showPanel}
          aria-controls="resultados-busqueda"
          aria-label="Buscar productos"
          placeholder="Busca productos, marcas y más"
          autoComplete="off"
          className="h-full min-w-0 flex-1 bg-transparent text-sm text-ink outline-none placeholder:text-ink-muted
            lg:text-[15px] [&::-webkit-search-cancel-button]:hidden"
        />
        {query && (
          <button
            type="button"
            aria-label="Borrar búsqueda"
            onClick={() => {
              setQuery("");
              setActive(0);
            }}
            className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-ink-muted transition-colors
              hover:bg-cream hover:text-ink"
          >
            <FiX size={16} />
          </button>
        )}
        <button
          type="submit"
          className="flex h-9 shrink-0 items-center gap-1.5 rounded-full bg-ink px-3 text-sm font-bold text-white
            transition-colors hover:bg-brand-dark sm:px-5 lg:h-10"
        >
          <FiSearch size={16} className="sm:hidden" />
          <span className="hidden sm:inline">Buscar</span>
        </button>
      </form>

      {showPanel && (
        <div
          id="resultados-busqueda"
          className="absolute inset-x-0 top-full z-40 mt-2 overflow-hidden rounded-2xl border border-line bg-base-100
            text-ink shadow-card-hover"
        >
          {term && results.length > 0 && (
            <ul role="listbox" className="p-1.5">
              {results.map((product, index) => {
                const category = product.categories[0]?.categoryName;
                return (
                  <li key={product.id} role="option" aria-selected={index === active} style={categoryStyle(category)}>
                    <Link
                      to={`/product/${product.id}`}
                      onClick={() => goTo(`/product/${product.id}`)}
                      onMouseEnter={() => setActive(index)}
                      className={`flex items-center gap-3 rounded-xl px-2.5 py-2 transition-colors ${
                        index === active ? "bg-(--cat-soft,var(--color-cream))" : ""
                      }`}
                    >
                      <span className="h-11 w-11 shrink-0 overflow-hidden rounded-lg bg-(--cat-soft,var(--color-cream)) p-1">
                        <ProductImage
                          src={product.images[0]?.imageUrl}
                          width={100}
                          alt=""
                          cutoutClassName="mix-blend-darken"
                        />
                      </span>
                      <span className="min-w-0 flex-1 leading-tight">
                        <span className="block truncate text-sm font-bold">{product.name}</span>
                        {category && <span className="text-xs font-semibold text-(--cat)">{category}</span>}
                      </span>
                      <span className="shrink-0 text-sm font-extrabold">{formatPrice(product.price)}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}

          {term && !results.length && (
            <p className="px-4 py-5 text-sm text-ink-soft">
              No encontramos productos para <b className="text-ink">"{query.trim()}"</b>. Prueba con otra palabra
              o mira las categorías.
            </p>
          )}

          {matchedCategories.length > 0 && (
            <div className={`flex flex-wrap items-center gap-2 px-3.5 py-3 ${term ? "border-t border-line" : ""}`}>
              <span className="mr-1 text-xs font-bold uppercase tracking-wide text-ink-muted">
                {term ? "Categorías" : "Explora"}
              </span>
              {matchedCategories.map(name => (
                <Link
                  key={name}
                  to={`/#${slugify(name)}`}
                  onClick={() => goTo(`/#${slugify(name)}`)}
                  style={categoryStyle(name)}
                  className="flex items-center gap-1.5 rounded-full border border-line px-3 py-1 text-sm font-semibold
                    transition-colors hover:border-(--cat) hover:text-(--cat)"
                >
                  <span className="h-2 w-2 rounded-full bg-(--cat)" />
                  {name}
                  <FiArrowRight size={13} />
                </Link>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
