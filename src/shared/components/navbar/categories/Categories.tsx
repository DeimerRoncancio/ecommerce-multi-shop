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
      <ul className="flex bg-white justify-center items-center border-b-[1px] border-[#f1e1dc]">
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
      <div className={`${!isModalVisible && 'hidden'} bg-white ajust-width m-auto p-6 
        shadow-[0_7px_15px_0px_rgba(154,154,154,0.34)] rounded-lg`}
        onMouseEnter={() => setModalVisible(true)}
        onMouseLeave={() => setModalVisible(false)}
      >
        <div className="tabs tabs-border">
          <input 
            type="radio" name="my_tabs_2"
            className="tab px-6 before:!left-0 before:!w-full"
            aria-label="Todos" defaultChecked
          />
          <div className="tab-content p-6 bg-white border-x-0 border-b-0 border-t-1 border-[#e8e9e9] mt-[-2px]">
            <ul className="flex flex-wrap gap-7">
              {
                products.slice(0, 4).map(product => (
                  <li key={product.id} className="flex flex-col group bg-white gap-4">
                    <div className="w-[223px] h-44 overflow-hidden">
                      <img
                        src={`${product.images[0].imageUrl}`}
                        className="w-full h-full object-contain transition-all duration-300 group-hover:scale-105"
                        alt=""
                      />
                    </div>
                    <div className="flex flex-col bg-white z-10 gap-2">
                      <p className="">{product.name}</p>
                      <p className="font-semibold text-[#b6401f]">
                        ${new Intl.NumberFormat("es-ES").format(product.price)}
                      </p>
                      <button className="btn font-normal p-3 py-1 rounded-sm w-fit h-auto border-0">
                        Ver Producto
                      </button>
                    </div>
                  </li>
                ))
              }
            </ul>
          </div>

          <input 
            type="radio" name="my_tabs_2"
            className="tab px-6 before:!left-0 before:!w-full"
            aria-label="En ofera"
          />
          <div className="tab-content p-6 bg-white border-x-0 border-b-0 border-t-1 border-[#e8e9e9] mt-[-2px]">
            Tab content 2
          </div>

          <input 
            type="radio" name="my_tabs_2"
            className="tab px-6 before:!left-0 before:!w-full"
            aria-label="Recientes"
          />
          <div className="tab-content p-6 bg-white border-x-0 border-b-0 border-t-1 border-[#e8e9e9] mt-[-2px]">
            Tab content 3
          </div>
        </div>
      </div>
    </div>
  )
}
