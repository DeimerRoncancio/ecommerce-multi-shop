import { ProductTypes } from "../../../../products/types/product";
import ProductItem from "./ProductItem";

type CategoriesModalProps = {
  products: ProductTypes[]
  showModal: boolean,
  changeVisibility: (isVisible: boolean) => void
}

export default function CategoriesModal({ products, showModal, changeVisibility }: CategoriesModalProps) {
  return (
    <div className={`${!showModal ? 'invisible opacity-0 translate-y-10' : 'visible opacity-100'} absolute right-0 
      left-0 bg-white ajust-width !w-[78%] m-auto p-6 rounded-lg shadow-[0_7px_15px_0px_rgba(154,154,154,0.67)] 
      transition-all duration-[0.1s,0.1s]`}
      onMouseEnter={() => changeVisibility(true)}
      onMouseLeave={() => changeVisibility(false)}
    >
      <div className="tabs tabs-border">
        <input
          type="radio" name="my_tabs_2"
          className="tab px-10 before:!left-0 before:!w-full"
          aria-label="Todos" defaultChecked
        />
        <div className="tab-content p-2 pt-5 bg-white border-x-0 border-b-0 border-t-1 border-[#e8e9e9]
        mt-[-1px] min-h-[300px] h-fit">
          <ul className="flex flex-wrap gap-7 xl:max-h-[310px] 2xl:h-fit overflow-auto">
            {
              !products.length
              ? (
                <div className="flex flex-col w-full h-full mt-7 justify-center items-center gap-5">
                  <p className="text-[#676767] text-xl">No hay productos en esta categoría</p>
                  <img src="/images/list-empty.png" alt="" width={150} />
                </div>
              ) : products.map(product => (
                <ProductItem key={product.id} product={product} />
              ))
            }
          </ul>
        </div>

        <input
          type="radio" name="my_tabs_2"
          className="tab px-10 before:!left-0 before:!w-full"
          aria-label="En ofera"
        />
        <div className="tab-content p-6 bg-white border-x-0 border-b-0 border-t-1 border-[#e8e9e9] mt-[-1px]
          min-h-[300px]">
          Tab content 2
        </div>

        <input
          type="radio" name="my_tabs_2"
          className="tab px-10 before:!left-0 before:!w-full"
          aria-label="Recientes"
        />
        <div className="tab-content p-6 bg-white border-x-0 border-b-0 border-t-1 border-[#e8e9e9] mt-[-1px]
          min-h-[300px]">
          Tab content 3
        </div>
      </div>
    </div>
  )
}
