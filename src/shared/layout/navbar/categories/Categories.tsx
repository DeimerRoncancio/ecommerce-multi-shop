import { useEffect, useRef, useState } from "react";
import { CategoriesType } from "../../../../products/types/categories";
import CategoryButton from "./CategoryButton";
import CategoriesModal from "./CategoriesModal";

const OPEN_DELAY = 150;
const CLOSE_DELAY = 150;

type CategoriesProps = {
  categories: CategoriesType[];
};

export default function Categories({ categories }: CategoriesProps) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [category, setCategory] = useState<CategoriesType>();
  const timer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(timer.current), []);

  const schedule = (action: () => void, delay: number) => {
    clearTimeout(timer.current);
    timer.current = setTimeout(action, delay);
  };

  const handleModalProducts = (cat: string) => {
    const show = () => {
      setCategory(categories.find(category => category.name === cat));
      setModalVisible(true);
    };
    schedule(show, isModalVisible ? 0 : OPEN_DELAY);
  };

  const handleModalVisibility = (isVisible: boolean) =>
    isVisible ? schedule(() => setModalVisible(true), 0) : schedule(() => setModalVisible(false), CLOSE_DELAY);

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
