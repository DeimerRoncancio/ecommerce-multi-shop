import axios from "axios";
import { useEffect, useState } from "react"
import { CategoriesFromApiType, CategoriesType } from "../../../../products/types/categories";

export default function Categories() {
  const [categories, setCategories] = useState<CategoriesType[]>([]);
  
  useEffect(() => {
    const fetchCategories = (): Promise<CategoriesFromApiType[]> => {
      return axios.get('https://multi-shop-api-76abbcfe5b70.herokuapp.com/app/categories')
        .then(res => res.data);
    }

    const mapApiToCategories = (apiResponse: CategoriesFromApiType): CategoriesType => {
      return {
        id: apiResponse.id,
        name: apiResponse.categoryName,
        products: apiResponse.products
      }
    }

    fetchCategories()
      .then(res => res.map(mapApiToCategories))
      .then(setCategories);
  }, [])

  return (
    <div className="text-[#343e49] text-sm">
      <ul className="flex justify-center items-center border-b-[1px] border-[#f1e1dc] gap-10">
        {
          categories.map(cat => (
            <li key={cat.id}>
              <button className="hover:text-black cursor-pointer py-4 hover:underline decoration-1">
                <p>{cat.name}</p>
              </button>
            </li>
          ))
        }
      </ul>
    </div>
  )
}
