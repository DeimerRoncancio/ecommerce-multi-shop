import { useState } from "react";
import { CategoriesType } from "../../../../products/types/categories";
import CategoryButton from "./CategoryButton";
import CategoriesModal from "./CategoriesModal";

type CategoriesProps = {
  categories: CategoriesType[];
};

export default function Categories({ categories }: CategoriesProps) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [category, setCategory] = useState<CategoriesType>();

  const handleModalProducts = (cat: string) => {
    setCategory(categories.find(category => category.name === cat));
    setModalVisible(true);
  };

  const handleModalVisibility = (isVisible: boolean) => setModalVisible(isVisible);

  return (
    <>
      <ul className="no-scrollbar flex h-full min-w-0 flex-1 items-center gap-6 overflow-x-auto">
        {categories.map(cat => (
          <CategoryButton
            key={cat.id}
            category={cat}
            handleMouseEnter={handleModalProducts}
            handleMouseLeave={handleModalVisibility}
          />
        ))}
      </ul>

      <CategoriesModal category={category} showModal={isModalVisible} changeVisibility={handleModalVisibility} />
    </>
  );
}
