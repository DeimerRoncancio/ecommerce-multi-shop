import { useState } from "react"
import { CategoriesType } from "../../../../products/types/categories";
import { ProductItemType } from "../../../../products/types/product";
import CategoryButton from "./CategoryButton";
import CategoriesModal from "./CategoriesModal";

type CategoriesProps = {
  categories: CategoriesType[];
}

export default function Categories({ categories }: CategoriesProps) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [ categoryProducts, setCategoryProducts ] = useState<ProductItemType[]>([]);

  const handleModalProducts = (cat: string) => {
    const productsFilter = categories.filter(category =>  category.name == cat)[0];
    console.log(productsFilter.products)
    setCategoryProducts(productsFilter.products);
    setModalVisible(true);
  }

  const handleModalVisibility = (isVisible: boolean) => setModalVisible(isVisible);
  
  return (
    <div className="text-[#343e49] text-sm">
      <ul className="flex bg-white justify-center items-center border-b-[1px] border-[#f1e1dc]">
        {
          categories.map(cat => (
            <CategoryButton
              key={cat.id}
              category={cat}
              handleMouseEnter={handleModalProducts}
              handleMouseLeave={handleModalVisibility}
            />
          ))
        }
      </ul>
      <CategoriesModal
        products={categoryProducts}
        showModal={isModalVisible}
        changeVisibility={handleModalVisibility}
      />
    </div>
  )
}
