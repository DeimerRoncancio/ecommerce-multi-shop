import useProducts from "../../../../products/hooks/api/useProducts";

type CategoriesModalProps = {
  showModal: boolean,
  changeVisibility: (isVisible: boolean) => void
}

export default function CategoriesModal({ showModal, changeVisibility }: CategoriesModalProps) {
  const { products } = useProducts();

  return (
    <div className={`${!showModal && 'hidden'} bg-white ajust-width m-auto p-6 rounded-lg
      shadow-[0_7px_15px_0px_rgba(154,154,154,0.67)]`}
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
              products.map(product => (
                <li key={product.id} className="flex flex-col group bg-white gap-4">
                  <div className="w-[223px] h-40 overflow-hidden">
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
