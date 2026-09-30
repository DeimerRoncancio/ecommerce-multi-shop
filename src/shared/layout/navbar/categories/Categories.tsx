import { useState } from "react";
import { CategoriesType } from "../../../../products/types/categories";
import { ProductItemType } from "../../../../products/types/product";
import CategoryButton from "./CategoryButton";
import CategoriesModal from "./CategoriesModal";

type CategoriesProps = {
  categories: CategoriesType[];
};

export default function Categories({ categories }: CategoriesProps) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [categoryProducts, setCategoryProducts] = useState<ProductItemType[]>([]);
  const [categoryName, setCategoryName] = useState("");

  const handleModalProducts = (cat: string) => {
    const productsFilter = categories.filter(category => category.name == cat)[0];
    setCategoryProducts(productsFilter.products);
    setCategoryName(cat);
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

      <CategoriesModal
        categoryName={categoryName}
        products={categoryProducts}
        showModal={isModalVisible}
        changeVisibility={handleModalVisibility}
      />
    </>
  );
}
