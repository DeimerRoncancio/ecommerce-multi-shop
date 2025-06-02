import { useEffect, useState } from "react"
import { CategoriesType } from "../../../../products/types/categories";
import { mapApiToCategories } from "../../../../products/mappers/categories.mapper";
import { getCategories } from "../../../../products/services/categories.api";
import CategoriesModal from "./CategoriesModal";
import useProducts from "../../../../products/hooks/api/useProducts";
import { ProductTypes } from "../../../../products/types/product";
import CategoryButton from "./CategoryButton";

export default function Categories() {
  const [categories, setCategories] = useState<CategoriesType[]>([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const [ categoryProducts, setCategoryProducts ] = useState<ProductTypes[]>([]);
  const { products } = useProducts();

  const handleModalProducts = (cat: string) => {
    const productsFilter = products.filter(product => {
      const cats = product.categories.map(cat => cat.categoryName);
      return cats.some(productCat => productCat === cat);
    })

    setCategoryProducts(productsFilter);
    setModalVisible(true);
  }

  const handleModalVisibility = (isVisible: boolean) => setModalVisible(isVisible);
  
  useEffect(() => {
    getCategories()
      .then(res => res.map(mapApiToCategories))
      .then(setCategories);
  }, [])

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
