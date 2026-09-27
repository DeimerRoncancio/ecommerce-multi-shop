import { CategoriesType } from "../../../../products/types/categories";

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
  return (
    <li className="shrink-0">
      <button
        type="button"
        className="relative rounded-lg px-4 py-2 text-sm font-medium text-white/90
          transition-colors hover:bg-white hover:text-brand"
        onMouseEnter={() => handleMouseEnter(category.name)}
        onMouseLeave={() => handleMouseLeave(false)}
      >
        {category.name}
      </button>
    </li>
  );
}
