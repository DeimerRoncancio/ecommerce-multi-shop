import { useEffect, useState } from "react"
import { CategoriesType } from "../../../../products/types/categories";
import { mapApiToCategories } from "../../../../products/mappers/categories-mapper";
import { getCategories } from "../../../../products/services/api/categories";
import useProducts from "../../../../products/hooks/api/useProducts";

export default function Categories() {
  const [categories, setCategories] = useState<CategoriesType[]>([]);
  const [isModalVisible, setModalVisible] = useState(false);
  const { products } = useProducts();

  useEffect(() => {
    getCategories()
      .then(res => res.map(mapApiToCategories))
      .then(setCategories);
  }, [])

  return (
    <div className="text-[#343e49] text-sm">
      <ul className="flex justify-center items-center border-b-[1px] border-[#f1e1dc]">
        {
          categories.map(cat => (
            <li key={cat.id}>
              <button className="hover:text-black cursor-pointer py-4 hover:underline decoration-1 px-5"
                onMouseEnter={() => setModalVisible(true)}
                onMouseLeave={() => setModalVisible(false)}
              >
                <p>{cat.name}</p>
              </button>
            </li>
          ))
        }
      </ul>
      <div className={`${!isModalVisible && 'hidden'} ajust-width`}
        onMouseEnter={() => setModalVisible(true)}
        onMouseLeave={() => setModalVisible(false)}
      >
        <ul>
          {
            products.map(product => (
              <li key={product.id}>{product.name}</li>
            ))
          }
        </ul>
      </div>
    </div>
  )
}
