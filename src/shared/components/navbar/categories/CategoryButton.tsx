import { CategoriesType } from "../../../../products/types/categories"

type CategoryButtonProps = {
  category: CategoriesType,
  handleMouseEnter: (categoryName: string) => void,
  handleMouseLeave: (isVisible: boolean) => void
}

export default function CategoryButton({ category, handleMouseEnter, handleMouseLeave }: CategoryButtonProps) {
  return (
    <li key={category.id}>
      <button className="hover:text-black cursor-pointer py-4 hover:underline decoration-1 px-5"
        onMouseEnter={() => handleMouseEnter(category.name)}
        onMouseLeave={() => handleMouseLeave(false)}
      >
        <p>{category.name}</p>
      </button>
    </li>
  )
}
