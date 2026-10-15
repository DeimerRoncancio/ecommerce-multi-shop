import { Link } from "react-router";
import { categoryStyle } from "../../../shared/utilities/category-color";

type CatalogEmptyProps = {
  text: string;
  categories: string[];
  onClear: () => void;
};

export default function CatalogEmpty({ text, categories, onClear }: CatalogEmptyProps) {
  return (
    <div className="flex flex-col items-center gap-4 rounded-2xl border border-dashed border-line px-6 py-14 text-center">
      <img src="/images/box-empty.png" alt="" width={130} />
      <p className="text-xl font-extrabold text-ink">
        {text ? `No encontramos nada para "${text}"` : "No hay productos con estos filtros"}
      </p>
      <p className="max-w-md text-sm text-ink-muted">
        Prueba con otra palabra, quita algún filtro o explora una de nuestras categorías.
      </p>
      <button
        type="button"
        onClick={onClear}
        className="h-11 rounded-full bg-brand px-6 font-bold text-white transition-colors hover:bg-ink"
      >
        Limpiar filtros
      </button>
      {categories.length > 0 && (
        <ul className="mt-2 flex flex-wrap justify-center gap-2">
          {categories.map(name => (
            <li key={name} style={categoryStyle(name)}>
              <Link
                to={`/catalog?categoria=${encodeURIComponent(name)}`}
                className="inline-flex rounded-full bg-(--cat-soft) px-3 py-1.5 text-xs font-bold text-(--cat)
                  transition-colors hover:bg-(--cat) hover:text-white"
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
