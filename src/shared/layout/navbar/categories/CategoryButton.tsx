import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router";
import { CategoriesType } from "../../../../products/types/categories";
import { slugify } from "../../../utilities/slugify";
import { categoryStyle } from "../../../utilities/category-color";

type CategoryButtonProps = {
  category: CategoriesType;
  handleMouseEnter: (categoryName: string) => void;
  handleMouseLeave: (isVisible: boolean) => void;
};

export default function CategoryButton({
  category,
  handleMouseEnter,
  handleMouseLeave,
}: CategoryButtonProps) {
  const { hash } = useLocation();
  const slug = slugify(category.name);
  const [isActive, setIsActive] = useState(false);
  useEffect(() => setIsActive(hash === `#${slug}`), [hash, slug]);

  return (
    <li className="shrink-0" style={categoryStyle(category.name)}>
      <Link
        to={`/#${slug}`}
        aria-current={isActive ? "true" : undefined}
        className={`flex h-12 items-center gap-2 whitespace-nowrap border-b-[3px] text-sm font-bold transition-colors
          hover:border-(--cat) hover:text-(--cat) ${isActive ? "border-(--cat) text-(--cat)" : "border-transparent text-ink"}`}
        onMouseEnter={() => handleMouseEnter(category.name)}
        onMouseLeave={() => handleMouseLeave(false)}
        onClick={() => handleMouseLeave(false)}
      >
        <span aria-hidden className="h-2.5 w-2.5 rounded-full bg-(--cat)" />
        {category.name}
      </Link>
    </li>
  );
}
