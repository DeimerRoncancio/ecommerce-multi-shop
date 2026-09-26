import { ProductItemType, } from "../../../../products/types/product";
import ProductItem from "./ProductItem";

type CategoriesModalProps = {
  products: ProductItemType[],
  showModal: boolean,
  changeVisibility: (isVisible: boolean) => void
}

export default function CategoriesModal({ products, showModal, changeVisibility }: CategoriesModalProps) {
  return (
    <div className={`${!showModal ? 'invisible translate-y-4 opacity-0' : 'visible opacity-100'} absolute
      inset-x-0 mx-auto hidden w-full max-w-7xl rounded-2xl border border-line bg-base-100 p-6
      shadow-card-hover transition-all duration-150 lg:block`}
      onMouseEnter={() => changeVisibility(true)}
      onMouseLeave={() => changeVisibility(false)}
    >
      <div className="tabs tabs-border">
        <input
          type="radio" name="my_tabs_2"
          className="tab px-10 before:!left-0 before:!w-full"
          aria-label="Todos" defaultChecked
        />
        <div className="tab-content p-2 pt-5 bg-base-100 border-x-0 border-b-0 border-t-1 border-line
        mt-[-1px] min-h-[300px] h-fit">
          <ul className="flex flex-wrap gap-7 xl:max-h-[310px] 2xl:h-fit overflow-auto">
            {
              !products.length
              ? (
                <div className="flex flex-col w-full h-full mt-7 justify-center items-center gap-5">
                  <p className="text-ink-muted text-xl">No hay productos en esta categoría</p>
                  <img src="/images/list-empty.png" alt="" width={150} />
                </div>
              ) : products.map(product => (
                <ProductItem key={product.id} product={product} closeModal={changeVisibility} />
              ))
            }
          </ul>
        </div>

        <input
          type="radio" name="my_tabs_2"
          className="tab px-10 before:!left-0 before:!w-full"
          aria-label="En oferta"
        />
        <div className="tab-content p-6 bg-base-100 border-x-0 border-b-0 border-t-1 border-line mt-[-1px]
          min-h-[300px]">
          Tab content 2
        </div>

        <input
          type="radio" name="my_tabs_2"
          className="tab px-10 before:!left-0 before:!w-full"
          aria-label="Recientes"
        />
        <div className="tab-content p-6 bg-base-100 border-x-0 border-b-0 border-t-1 border-line mt-[-1px]
          min-h-[300px]">
          Tab content 3
        </div>
      </div>
    </div>
  )
}
