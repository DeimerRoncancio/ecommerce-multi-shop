import { FiArrowRight } from "react-icons/fi";
import ProductImage from "../../shared/ui/ProductImage";
import { categoryStyle } from "../../shared/utilities/category-color";
import { CatalogSection, countLabel } from "../utilities/catalog";

type CategoryGridProps = {
  sections: CatalogSection[];
  covers: Map<string, string | undefined>;
};

export default function CategoryGrid({ sections, covers }: CategoryGridProps) {
  return (
    <ul className="grid grid-cols-2 border-l border-t border-line sm:grid-cols-3 lg:grid-cols-6">
      {sections.map(({ name, slug, items }) => (
        <li key={slug} style={categoryStyle(name)} className="border-b border-r border-line">
          <a
            href={`#${slug}`}
            className="group flex h-full flex-col gap-3 border-b-4 border-(--cat) p-4 transition-colors
              hover:bg-(--cat-soft)"
          >
            <span className="block aspect-square w-full bg-(--cat-soft) p-3 group-hover:bg-base-100">
              <ProductImage src={covers.get(slug)} width={250} alt="" className="mix-blend-darken" />
            </span>
            <span className="flex items-center justify-between gap-2">
              <span>
                <span className="block font-extrabold text-(--cat)">{name}</span>
                <span className="block text-xs text-ink-muted">{countLabel(items.length)}</span>
              </span>
              <FiArrowRight size={16} className="shrink-0 text-(--cat) transition-transform group-hover:translate-x-1" />
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
