import { useState } from "react";
import { CategoriesType } from "../../../../products/types/categories";
import { ProductItemType } from "../../../../products/types/product";
import CategoryButton from "./CategoryButton";
import CategoriesModal from "./CategoriesModal";
import Container from "../../../ui/Container";

type CategoriesProps = {
  categories: CategoriesType[];
};

export default function Categories({ categories }: CategoriesProps) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [categoryProducts, setCategoryProducts] = useState<ProductItemType[]>([]);

  const handleModalProducts = (cat: string) => {
    const productsFilter = categories.filter(category => category.name == cat)[0];
    setCategoryProducts(productsFilter.products);
    setModalVisible(true);
  };

  const handleModalVisibility = (isVisible: boolean) => setModalVisible(isVisible);

  return (
    <div className="border-t border-line bg-base-100/60">
      <Container>
        <ul className="no-scrollbar flex h-11 items-center gap-1 overflow-x-auto lg:h-12 lg:justify-center">
          {categories.map(cat => (
            <CategoryButton
              key={cat.id}
              category={cat}
              handleMouseEnter={handleModalProducts}
              handleMouseLeave={handleModalVisibility}
            />
          ))}
        </ul>
      </Container>

      <CategoriesModal
        products={categoryProducts}
        showModal={isModalVisible}
        changeVisibility={handleModalVisibility}
      />
    </div>
  );
}
