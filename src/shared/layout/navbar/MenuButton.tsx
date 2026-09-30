import { useState } from "react";
import { Link } from "react-router";
import { FiChevronDown, FiChevronRight, FiGrid } from "react-icons/fi";
import { CategoriesType } from "../../../products/types/categories";
import { slugify } from "../../utilities/slugify";
import { categoryStyle } from "../../utilities/category-color";
import ProductImage from "../../ui/ProductImage";

type MenuButtonProps = {
  categories: CategoriesType[];
};

export default function MenuButton({ categories }: MenuButtonProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleBlur = (event: React.FocusEvent<HTMLDivElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setIsOpen(false);
  };

  return (
    <div className="relative shrink-0" onBlur={handleBlur}>
      <button
        type="button"
        aria-expanded={isOpen}
        onClick={() => setIsOpen(!isOpen)}
        className={`flex h-8 items-center gap-1.5 whitespace-nowrap rounded-full px-4 text-sm font-bold
          transition-colors ${isOpen ? "bg-brand text-white" : "bg-brand-soft text-brand hover:bg-brand hover:text-white"}`}
      >
        <FiGrid size={16} />
        Todas
        <FiChevronDown size={15} className={`transition-transform ${isOpen ? "rotate-180" : ""}`} />
      </button>

      <div
        className={`absolute left-0 top-full z-40 mt-2 w-80 overflow-hidden border border-line
          bg-base-100 text-ink shadow-card-hover transition-opacity duration-100 ${
            isOpen ? "visible opacity-100" : "invisible opacity-0"
          }`}
      >
        <p className="border-b border-line px-4 py-3 text-base font-extrabold">
          Comprar por categoría
        </p>
        <ul className="py-1">
          {categories.map(category => (
            <li key={category.id} style={categoryStyle(category.name)}>
              <Link
                to={`/#${slugify(category.name)}`}
                onClick={() => setIsOpen(false)}
                className="flex items-center gap-3 border-l-4 border-transparent px-4 py-2 transition-colors hover:border-(--cat) hover:bg-(--cat-soft)"
              >
                <span className="h-11 w-11 shrink-0 overflow-hidden rounded-full bg-(--cat-soft) p-1.5 ring-2 ring-(--cat)">
                  <ProductImage src={category.products[0]?.mainImage.imageUrl} width={100} alt="" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-medium">{category.name}</span>
                  <span className="block text-xs text-ink-muted">
                    {category.products.length}{" "}
                    {category.products.length === 1 ? "producto" : "productos"}
                  </span>
                </span>
                <FiChevronRight size={16} className="text-ink-muted" />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
