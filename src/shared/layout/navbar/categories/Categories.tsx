import { useState } from "react"
import { CategoriesType } from "../../../../products/types/categories";
import { ProductTypes } from "../../../../products/types/product";
import CategoryButton from "./CategoryButton";
import CategoriesModal from "./CategoriesModal";

type CategoriesProps = {
  categories: CategoriesType[];
  products: ProductTypes[];
}

export default function Categories({ categories, products }: CategoriesProps) {
  const [isModalVisible, setModalVisible] = useState(false);
  const [ categoryProducts, setCategoryProducts ] = useState<ProductTypes[]>([]);

  const handleModalProducts = (cat: string) => {
    const productsFilter = products.filter(product => {
      const cats = product.categories.map(cat => cat.categoryName);
      return cats.some(productCat => productCat === cat);
    })

    setCategoryProducts(productsFilter);
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
