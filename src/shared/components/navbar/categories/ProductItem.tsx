import { ProductTypes } from "../../../../products/types/product"

type ProductItemProps = {
  product: ProductTypes
}

export default function ProductItem({ product }: ProductItemProps) {
  return (
    <li key={product.id} className="flex flex-col group bg-white gap-4">
      <div className="w-[150px] h-40 overflow-hidden">
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
  )
}
